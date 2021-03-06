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
import { cryptography } from 'valois-sdk';
import * as Config from '@oclif/config';
import HashOnionCommand from '../../src/commands/hash-onion';
import { getConfig } from '../utils/config';

jest.mock('valois-sdk', () => {
	const actualSdk = jest.requireActual('valois-sdk');
	return { ...actualSdk, cryptography: { ...actualSdk.cryptography } };
});

describe('hash-onion command', () => {
	let stdout: string[];
	let stderr: string[];
	let config: Config.IConfig;

	beforeEach(async () => {
		stdout = [];
		stderr = [];
		config = await getConfig();
		jest.spyOn(process.stdout, 'write').mockImplementation(val => stdout.push(val as string) > -1);
		jest.spyOn(process.stderr, 'write').mockImplementation(val => stderr.push(val as string) > -1);
		jest.spyOn(HashOnionCommand.prototype, 'printJSON').mockReturnValue();
		jest.spyOn(fs, 'ensureDirSync').mockReturnValue();
		jest.spyOn(fs, 'writeJSONSync').mockReturnValue();
	});

	describe('hash-onion --count=1000 --distance=200', () => {
		it('should generate valid hash onion', async () => {
			await HashOnionCommand.run(['--count=1000', '--distance=200'], config);
			const { length } = (HashOnionCommand.prototype.printJSON as jest.Mock).mock.calls;
			const result = (HashOnionCommand.prototype.printJSON as jest.Mock).mock.calls[length - 1][0];
			for (let i = 0; i < result.hashes.length - 1; i += 1) {
				let nextHash = Buffer.from(result.hashes[i + 1], 'hex');
				for (let j = 0; j < result.distance; j += 1) {
					nextHash = cryptography.hash(nextHash).slice(0, 16);
				}
				expect(result.hashes[i]).toBe(nextHash.toString('hex'));
			}
		});
	});

	describe('hash-onion --count=1000 --distance=200 --output=./test/sample.json', () => {
		it('should write to file', async () => {
			await HashOnionCommand.run(
				['--count=1000', '--distance=200', '--output=./test/sample.json'],
				config,
			);
			expect(fs.ensureDirSync).toHaveBeenCalledWith('./test');
			expect(fs.writeJSONSync).toHaveBeenCalledWith('./test/sample.json', expect.anything());
		});

		it('should write to file in pretty format', async () => {
			await HashOnionCommand.run(
				['--count=1000', '--distance=200', '--pretty', '--output=./test/sample.json'],
				config,
			);
			expect(fs.ensureDirSync).toHaveBeenCalledWith('./test');
			expect(fs.writeJSONSync).toHaveBeenCalledWith('./test/sample.json', expect.anything(), {
				spaces: ' ',
			});
		});
	});

	describe('hash-onion --count=777 --distance=200', () => {
		it('should throw an error', async () => {
			await expect(HashOnionCommand.run(['--count=777', '--distance=200'], config)).rejects.toThrow(
				'Invalid count. Count must be multiple of distance',
			);
		});
	});

	describe('hash-onion --count=100 --distance=200', () => {
		it('should throw an error', async () => {
			await expect(HashOnionCommand.run(['--count=100', '--distance=200'], config)).rejects.toThrow(
				'Invalid count or distance. Count must be greater than distance',
			);
		});
	});

	describe('hash-onion --count=-1 --distance=200', () => {
		it('should throw an error', async () => {
			await expect(HashOnionCommand.run(['--count=-1', '--distance=200'], config)).rejects.toThrow(
				'Count flag must be an integer and greater than 0.',
			);
		});
	});

	describe('hash-onion --count=1000 --distance=-1', () => {
		it('should throw an error', async () => {
			await expect(HashOnionCommand.run(['--count=1000', '--distance=-1'], config)).rejects.toThrow(
				'Distance flag must be an integer and greater than 0.',
			);
		});
	});
});
