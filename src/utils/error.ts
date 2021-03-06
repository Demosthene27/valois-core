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
// eslint-disable-next-line max-classes-per-file
export class FileSystemError extends Error {
	public constructor(message: string) {
		super(message);
		this.message = message;
		this.name = 'FileSystemError';
	}
}

export class ValidationError extends Error {
	public constructor(message: string) {
		super(message);
		this.message = message;
		this.name = 'ValidationError';
	}
}
