/*
 * Copyright © 2020 Valois Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Valois Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */

import { cryptography, validator } from 'valois-sdk';
import Command, { flags as flagParser } from '@oclif/command';
import * as fs from 'fs-extra';
import * as path from 'path';

export default class HashOnionCommand extends Command {
	static description = 'Create hash onions to be used by the forger.';

	static examples = [
		'hash-onion --count=1000000 --distance=2000 --pretty',
		'hash-onion --count=1000000 --distance=2000 --output ~/my_onion.json',
	];

	static flags = {
		output: flagParser.string({
			char: 'o',
			description: 'Output file path',
		}),
		count: flagParser.integer({
			char: 'c',
			description: 'Total number of hashes to produce',
			default: 2000000,
		}),
		distance: flagParser.integer({
			char: 'd',
			description: 'Distance between each hashes',
			default: 2000,
		}),
		pretty: flagParser.boolean({
			description: 'Prints JSON in pretty format rather than condensed.',
		}),
	};

	// eslint-disable-next-line @typescript-eslint/require-await
	async run(): Promise<void> {
		const {
			flags: { output, count, distance, pretty },
		} = this.parse(HashOnionCommand);

		if (distance <= 0 || !validator.isValidInteger(distance)) {
			throw new Error('Distance flag must be an integer and greater than 0.');
		}

		if (count <= 0 || !validator.isValidInteger(count)) {
			throw new Error('Count flag must be an integer and greater than 0.');
		}

		if (output) {
			const { dir } = path.parse(output);
			fs.ensureDirSync(dir);
		}

		const seed = cryptography.generateHashOnionSeed();

		const hashBuffers = cryptography.hashOnion(seed, count, distance);
		const hashes = hashBuffers.map(buf => buf.toString('hex'));

		const result = { count, distance, hashes };

		if (output) {
			if (pretty) {
				fs.writeJSONSync(output, result, { spaces: ' ' });
			} else {
				fs.writeJSONSync(output, result);
			}
		} else {
			this.printJSON(result, pretty);
		}
	}

	public printJSON(message?: Record<string, unknown>, pretty = false): void {
		if (pretty) {
			this.log(JSON.stringify(message, undefined, '  '));
		} else {
			this.log(JSON.stringify(message));
		}
	}
}
