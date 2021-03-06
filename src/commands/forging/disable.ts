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

import { BaseForgingCommand } from '../../base_forging';

export default class DisableForgingCommand extends BaseForgingCommand {
	static description = 'Disable forging for given delegate address.';

	static examples = [
		'forging:disable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815',
		'forging:disable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 --data-path ./data',
		'forging:disable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 --data-path ./data --password your_password',
	];

	static flags = {
		...BaseForgingCommand.flags,
	};

	static args = [...BaseForgingCommand.args];

	async init(): Promise<void> {
		await super.init();
		this.forging = false;
	}
}
