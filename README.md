![Logo](./docs/assets/banner_core.png)

# Valois Core

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/valoisHQ/valois-core)
![GitHub repo size](https://img.shields.io/github/repo-size/valoishq/valois-core)
[![DeepScan grade](https://deepscan.io/api/teams/6759/projects/8870/branches/113510/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&tid=6759&pid=8870&bid=113510)
![GitHub issues](https://img.shields.io/github/issues-raw/valoishq/valois-core)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/valoishq/valois-core)

Valois is a next-generation crypto-currency and decentralized application platform, written entirely in JavaScript. The official documentation about the whole ecosystem can be found in https://valois.io/documentation.

[Valois Core](https://valois.io/documentation/valois-core) is the program that implements the [Valois Protocol](https://valois.io/documentation/valois-protocol). In other words, Valois Core is what every machine needs to set-up to run a node that allows for participation in the network.

This document details how to install Valois Core from source and from npm registry, but there are two other ways to participate in the network: [binaries](https://valois.io/documentation/valois-core/setup/pre-install/binary) and [Docker images](https://valois.io/documentation/valois-core/setup/pre-install/docker).
If you have satisfied the requirements from the Pre-Installation section, you can jump directly to the next section [Installation Steps](#installation).

## Index

- [Installation](#installation)
- [Managing Valois Node](#managing-valois-node)
- [Configuring Valois Node](#configuring-valois-node)
- [Tests](#tests)
- [License](#license)

## Installation

### Dependencies

The following dependencies need to be installed in order to run applications created with the Valois SDK:

| Dependencies | Version |
| ------------ | ------- |
| NodeJS       | 12.22.1 |

You can find further details on installing these dependencies in our [pre-installation setup guide](https://valois.io/documentation/valois-core/setup/source#pre-install).
Clone the Valois Core repository using Git and initialize the modules.

## From Source

```bash
git clone https://github.com/ValoisHQ/valois-core.git
cd valois-core
git checkout master
npm ci
npm run build
./bin/run --help
```

## From NPM

<!-- usage -->

```sh-session
$ npm install -g valois-core
$ valois-core COMMAND
running command...
$ valois-core (-v|--version|version)
valois-core/3.0.0-beta.2.5 darwin-x64 node-v12.20.0
$ valois-core --help [COMMAND]
USAGE
  $ valois-core COMMAND
...
```

<!-- usagestop -->

<!-- commands -->

## Command Topics

- [`valois-core account`](docs/commands/account.md) - Commands relating to Valois Core accounts.
- [`valois-core block`](docs/commands/block.md) - Commands relating to Valois Core blocks.
- [`valois-core blockchain`](docs/commands/blockchain.md) - Commands relating to Valois Core blockchain data.
- [`valois-core config`](docs/commands/config.md) - Commands relating to Valois Core node configuration.
- [`valois-core forger-info`](docs/commands/forger-info.md) - Commands relating to Valois Core forger-info data.
- [`valois-core forging`](docs/commands/forging.md) - Commands relating to Valois Core forging.
- [`valois-core hash-onion`](docs/commands/hash-onion.md) - Create hash onions to be used by the forger.
- [`valois-core help`](docs/commands/help.md) - display help for valois-core
- [`valois-core node`](docs/commands/node.md) - Commands relating to Valois Core node.
- [`valois-core passphrase`](docs/commands/passphrase.md) - Commands relating to Valois Core passphrases.
- [`valois-core sdk`](docs/commands/sdk.md) - Commands relating to Valois SDK development.
- [`valois-core start`](docs/commands/start.md) - Start Valois Core Node.
- [`valois-core transaction`](docs/commands/transaction.md) - Commands relating to Valois Core transactions.

## Autocomplete

To use autocomplete feature for commands & flags follow the instructions after running

```sh
$ valois-core autocomplete
```

<!-- commandsstop -->

## Managing Valois Node

To start a Valois Core node as a background process, we recommend using a process management tool, such as [PM2](https://pm2.keymetrics.io/).

### Example using PM2

```
npm i -g pm2
pm2 start "valois-core start" --name valois-mainnet
pm2 status
pm2 logs valois-mainnet
```

For a more advanced options refer to [PM2 documentation](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/).

## Configuring Valois Node

[`valois-core start`](docs/commands/start.md) supports flag and environment variable options to configure a node.

Also, custom configuration through JSON file is available through the `--config, -c` flag.

### Example

With custom config file `./custom-config.json` below

```
{
  "network": {
    "port": 5000,
  },
  "transactionPool": {
    "maxTransactions": 8096,
    "maxTransactionsPerAccount": 1024,
  },
  "forging": {
    "delegates": [{
      "encryptedPassphrase": "iterations=10&cipherText=0dbd21ac5c154dbb72ce90a4e252a64b692203a4f8e25f8bfa1b1993e2ba7a9bd9e1ef1896d8d584a62daf17a8ccf12b99f29521b92cc98b74434ff501374f7e1c6d8371a6ce4e2d083489&iv=98a89678d1ccd054b85e3b3c&salt=c9cb4e7783cacca6c0e1c210cb9252e1&tag=5c66c5e75a6241538695fb16d8f0cdc9&version=1",
      "hashOnion": {
        "count": 10000,
        "distance": 1000,
        "hashes": [
          "aaf012545a584890a169cf57d8f7e688",
          "f7a3fb976e50d882c709edb63bde4d9c",
          "1bd121882cb1dee1107699001c2676fb",
          "c4ad7d98da02c94ef8bda2f80d35290a",
          "096f0e77f963face5e99b9db460ce45f",
          "de3d0c34bdcbdcfa2b7b1871c99d4948",
          "5deb5e369a98510932835d74768cf86c",
          "c0cd6ce3f75256149c8fe5d0bffdc99a",
          "1a32706893f1523db0c7bb81be5e55ac",
          "7e8f1ea4aa317993152e1a6b55b16f25",
          "5e5100bbd2c2d5e00197d4ec19102dd6"
        ]
      },
      "address": "9cabee3d27426676b852ce6b804cb2fdff7cd0b5"
    }],
  },
  "plugins": {
    "httpApi": {
      "port": 7000,
    },
  },
}
```

Running a command will overwrite the default config and use the specified options.

```bash
valois-core start -n devnet -c ./custom-config.json
```

For a more detailed understanding of configuration read this [online documentation](https://valois.io/documentation/valois-core/user-guide/configuration).

## Tests

### Automated tests

All automated tests will run with the below command.

```
npm test
```

### Running a local development node

In order to run a node for a local test, in a root folder of valois-core, run below command.

```
./bin/run start -n devnet --data-path ./devnet-data --port 3333 --api-ws --enable-http-api-plugin --http-api-plugin-port 3334 --enable-forger-plugin
```

This command will start a valois-core node using data path `./devent-data` with HTTPAPI and Forger Plugins.
Data on the node can be obtained by commands like

```
./bin/run node:info --data-path ./devnet-data
./bin/run block:get 3 --data-path ./devnet-data
```

## Contributors

https://github.com/ValoisHQ/valois-core/graphs/contributors

## License

Copyright 2016-2020 Valois Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[valois documentation site]: https://valois.io/documentation
[valois sdk github]: https://github.com/ValoisHQ/valois-sdk
