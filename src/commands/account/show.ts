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
import { Command, flags as flagParser } from '@oclif/command';
import { cryptography } from 'valois-sdk';

import { flags as commonFlags } from '../../utils/flags';
import { getPassphraseFromPrompt } from '../../utils/reader';

const processInput = (
	passphrase: string,
	prefix: string,
): {
	privateKey: string;
	publicKey: string;
	address: string;
	binaryAddress: string;
} => {
	const { privateKey, publicKey } = cryptography.getKeys(passphrase);
	const binaryAddress = cryptography.getAddressFromPublicKey(publicKey);
	const address = cryptography.getBase32AddressFromPublicKey(publicKey, prefix);

	return {
		privateKey: privateKey.toString('hex'),
		publicKey: publicKey.toString('hex'),
		address,
		binaryAddress: binaryAddress.toString('hex'),
	};
};

export default class ShowCommand extends Command {
	static description = 'Show account information for a given passphrase.';

	static examples = ['account:show'];

	static flags = {
		passphrase: flagParser.string(commonFlags.passphrase),
	};

	async run(): Promise<void> {
		const {
			flags: { passphrase: passphraseSource },
		} = this.parse(ShowCommand);
		const passphrase = passphraseSource ?? (await getPassphraseFromPrompt('passphrase', true));

		this.log(
			JSON.stringify(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				processInput(passphrase, this.config.pjson.valois.addressPrefix),
				undefined,
				' ',
			),
		);
	}
}
