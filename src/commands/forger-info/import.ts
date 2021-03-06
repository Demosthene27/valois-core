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
import { Command, flags as flagParser } from '@oclif/command';
import * as path from 'path';
import * as fs from 'fs-extra';
import { getDefaultPath, getFullPath, getForgerDBPath } from '../../utils/path';
import * as downloadUtils from '../../utils/download';

interface Args {
	readonly sourcePath: string;
}

export default class ImportCommand extends Command {
	static description = 'Import from <FILE>.';

	static args = [
		{
			name: 'sourcePath',
			required: true,
			description: 'Path to the forger-info zip file that you want to import.',
		},
	];

	static examples = [
		'forger-info:import ./my/path',
		'forger-info:import --data-path ./data --force',
	];

	static flags = {
		'data-path': flagParser.string({
			char: 'd',
			description:
				'Directory path to specify where node data is stored. Environment variable "VALOIS_DATA_PATH" can also be used.',
			env: 'VALOIS_DATA_PATH',
		}),
		force: flagParser.boolean({
			char: 'f',
			description: 'To overwrite the existing data if present.',
		}),
	};

	async run(): Promise<void> {
		const { args, flags } = this.parse(ImportCommand);
		const { sourcePath } = args as Args;
		const dataPath = flags['data-path'] ? flags['data-path'] : getDefaultPath();
		const forgerDBPath = getForgerDBPath(dataPath);

		if (path.extname(sourcePath) !== '.gz') {
			this.error('Forger data should be provided in gzip format.');
		}

		if (fs.existsSync(forgerDBPath)) {
			if (!flags.force) {
				this.error(`Forger data already exists at ${dataPath}. Use --force flag to overwrite`);
			}
			fs.removeSync(forgerDBPath);
		}

		fs.ensureDirSync(forgerDBPath);
		this.log(`Importing forger data from ${getFullPath(sourcePath)}`);

		await downloadUtils.extract(path.dirname(sourcePath), path.basename(sourcePath), forgerDBPath);

		this.log('Import completed.');
		this.log(`   ${getFullPath(dataPath)}`);
	}
}
