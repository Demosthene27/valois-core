/*
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
 */
import {
	Application,
	HTTPAPIPlugin,
	ForgerPlugin,
	MonitorPlugin,
	PartialApplicationConfig,
	ReportMisbehaviorPlugin,
} from 'valois-sdk';
import { LegacyAccountModule } from './modules';

export interface Options {
	enableHTTPAPIPlugin: boolean;
	enableForgerPlugin: boolean;
	enableMonitorPlugin: boolean;
	enableReportMisbehaviorPlugin: boolean;
}

// Temporally disable eslint
/* eslint-disable */
export const getApplication = (
	genesisBlock: Record<string, unknown>,
	config: PartialApplicationConfig,
	options: Options,
): Application => {
	const app = Application.defaultApplication(genesisBlock, config);
	app.registerModule(LegacyAccountModule);

	if (options.enableHTTPAPIPlugin) {
		app.registerPlugin(HTTPAPIPlugin, { loadAsChildProcess: true });
	}
	if (options.enableForgerPlugin) {
		app.registerPlugin(ForgerPlugin, { loadAsChildProcess: true });
	}
	if (options.enableMonitorPlugin) {
		app.registerPlugin(MonitorPlugin, { loadAsChildProcess: true });
	}
	if (options.enableReportMisbehaviorPlugin) {
		app.registerPlugin(ReportMisbehaviorPlugin, { loadAsChildProcess: true });
	}

	return app;
};
