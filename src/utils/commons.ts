/*
 * ValoisHQ/valois-commander
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
import { cryptography } from 'valois-sdk';
import { NETWORK, SNAPSHOT_URL, DOWNLOAD_URL } from '../constants';

export const valoisGenesisBlockUrl = (url: string, network: NETWORK): string => {
	if (!['testnet', 'mainnet', 'betanet'].includes(network.toLowerCase())) {
		return '';
	}
	if (url && url.search(DOWNLOAD_URL) >= 0) {
		return `${DOWNLOAD_URL}/${network}/genesis_block.json.tar.gz`;
	}
	return url;
};

export const valoisSnapshotUrl = (url: string, network: NETWORK): string => {
	if (!['testnet', 'mainnet', 'betanet'].includes(network.toLowerCase())) {
		return '';
	}
	if (url && url.search(SNAPSHOT_URL) >= 0) {
		return `${SNAPSHOT_URL}/${network}/blockchain.db.tar.gz`;
	}
	return url;
};

export const encryptPassphrase = (
	passphrase: string,
	password: string,
	outputPublicKey: boolean,
): Record<string, unknown> => {
	const encryptedPassphraseObject = cryptography.encryptPassphraseWithPassword(
		passphrase,
		password,
	);
	const encryptedPassphrase = cryptography.stringifyEncryptedPassphrase(encryptedPassphraseObject);

	return outputPublicKey
		? {
				encryptedPassphrase,
				publicKey: cryptography.getKeys(passphrase).publicKey.toString('hex'),
		  }
		: { encryptedPassphrase };
};
