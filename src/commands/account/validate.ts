/*
 * ValoisHQ/valois-commander
 * Copyright © 2019 Valois Foundation
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
import { Command } from '@oclif/command';
import { cryptography } from 'valois-sdk';

interface Args {
	readonly address: string;
}

export default class ValidateCommand extends Command {
	static description = 'Validate base32 address.';

	static examples = ['account:validate lskoaknq582o6fw7sp82bm2hnj7pzp47mpmbmux2g'];

	static args = [
		{
			name: 'address',
			required: true,
			description: 'Address in base32 format to validate.',
		},
	];

	// eslint-disable-next-line @typescript-eslint/require-await
	async run(): Promise<void> {
		const { args } = this.parse(ValidateCommand);
		try {
			const { address } = args as Args;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			cryptography.validateBase32Address(address, this.config.pjson.valois.addressPrefix);
			const binaryAddress = cryptography.getAddressFromBase32Address(address).toString('hex');

			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			this.log(
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				`Address ${address} is a valid base32 address and the corresponding binary address is ${binaryAddress}.`,
			);
		} catch (error) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			this.error(error.message);
		}
	}
}
