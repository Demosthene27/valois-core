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

import * as fs from 'fs-extra';
import * as path from 'path';
import { Command, flags as flagParser } from '@oclif/command';
import { getBlockchainDBPath, getDefaultPath, getFullPath } from '../../utils/path';
import { extract } from '../../utils/download';

export default class ImportCommand extends Command {
	static description = 'Import from <FILE>.';

	static args = [
		{
			name: 'filepath',
			required: true,
			description: 'Path to the gzipped blockchain data.',
		},
	];

	static examples = [
		'blockchain:import ./path/to/blockchain.db.tar.gz',
		'blockchain:import ./path/to/blockchain.db.tar.gz --data-path ./valois/',
		'blockchain:import ./path/to/blockchain.db.tar.gz --data-path ./valois/ --force',
	];

	static flags = {
		'data-path': flagParser.string({
			char: 'd',
			description:
				'Specifies which data path the application should use. Environment variable "VALOIS_DATA_PATH" can also be used.',
			env: 'VALOIS_DATA_PATH',
		}),
		force: flagParser.boolean({
			char: 'f',
			description: 'Delete and overwrite existing blockchain data',
			default: false,
		}),
	};

	async run(): Promise<void> {
		const { args, flags } = this.parse(ImportCommand);
		const { filepath } = args;
		const dataPath = flags['data-path'] ? flags['data-path'] : getDefaultPath();
		const blockchainDBPath = getBlockchainDBPath(dataPath);

		if (path.extname(filepath) !== '.gz') {
			this.error('The blockchain data file must be a gzip file.');
		}

		if (fs.existsSync(blockchainDBPath)) {
			if (!flags.force) {
				this.error(
					`There is already a blockchain data file found at ${dataPath}. Use --force to override.`,
				);
			}
			fs.removeSync(blockchainDBPath);
		}

		fs.ensureDirSync(blockchainDBPath);
		this.log(`Importing blockchain from ${getFullPath(filepath)}`);

		await extract(path.dirname(filepath), path.basename(filepath), blockchainDBPath);

		this.log('Import completed.');
		this.log(`   ${getFullPath(dataPath)}`);
	}
}
