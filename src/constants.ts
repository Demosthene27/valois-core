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

export enum NETWORK {
	MAINNET = 'mainnet',
	TESTNET = 'testnet',
	BETANET = 'betanet',
	ALPHANET = 'alphanet',
	DEVNET = 'devnet',
}
export const DEFAULT_NETWORK = NETWORK.MAINNET;
export const SNAPSHOT_URL = 'https://snapshots.valois.io';
export const DOWNLOAD_URL = 'https://downloads.valois.io/valois';
