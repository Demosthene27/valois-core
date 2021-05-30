# `valois-core blockchain`

Commands relating to Valois Core blockchain data.

- [`valois-core blockchain:download`](#valois-core-blockchaindownload)
- [`valois-core blockchain:export`](#valois-core-blockchainexport)
- [`valois-core blockchain:hash`](#valois-core-blockchainhash)
- [`valois-core blockchain:import FILEPATH`](#valois-core-blockchainimport-filepath)
- [`valois-core blockchain:reset`](#valois-core-blockchainreset)

## `valois-core blockchain:download`

Download snapshot from <URL>.

```
USAGE
  $ valois-core blockchain:download

OPTIONS
  -n, --network=network  [default: mainnet] Default network config to use. Environment variable "VALOIS_NETWORK" can also
                         be used.

  -o, --output=output    Directory path to specify where snapshot is downloaded. By default outputs the files to current
                         working directory.

  -u, --url=url          The url to the snapshot.

EXAMPLES
  download
  download --network betanet
  download --url https://snapshots.valois.io/mainnet/blockchain.db.gz --output ./downloads
```

_See code: [dist/commands/blockchain/download.ts](https://github.com/ValoisHQ/valois-core/blob/v3.0.0-beta.2.5/dist/commands/blockchain/download.ts)_

## `valois-core blockchain:export`

Export to <FILE>.

```
USAGE
  $ valois-core blockchain:export

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "VALOIS_DATA_PATH"
                             can also be used.

  -o, --output=output        The output directory. Default will set to current working directory.

EXAMPLES
  blockchain:export
  blockchain:export --data-path ./data --output ./my/path/
```

_See code: [dist/commands/blockchain/export.ts](https://github.com/ValoisHQ/valois-core/blob/v3.0.0-beta.2.5/dist/commands/blockchain/export.ts)_

## `valois-core blockchain:hash`

Generate SHA256 hash from <PATH>.

```
USAGE
  $ valois-core blockchain:hash

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "VALOIS_DATA_PATH"
                             can also be used.

EXAMPLES
  blockchain:hash
  blockchain:hash --data-path ./data
```

_See code: [dist/commands/blockchain/hash.ts](https://github.com/ValoisHQ/valois-core/blob/v3.0.0-beta.2.5/dist/commands/blockchain/hash.ts)_

## `valois-core blockchain:import FILEPATH`

Import from <FILE>.

```
USAGE
  $ valois-core blockchain:import FILEPATH

ARGUMENTS
  FILEPATH  Path to the gzipped blockchain data.

OPTIONS
  -d, --data-path=data-path  Specifies which data path the application should use. Environment variable "VALOIS_DATA_PATH"
                             can also be used.

  -f, --force                Delete and overwrite existing blockchain data

EXAMPLES
  blockchain:import ./path/to/blockchain.db.gz
  blockchain:import ./path/to/blockchain.db.gz --data-path ./valois/
```

_See code: [dist/commands/blockchain/import.ts](https://github.com/ValoisHQ/valois-core/blob/v3.0.0-beta.2.5/dist/commands/blockchain/import.ts)_

## `valois-core blockchain:reset`

Reset the blockchain data.

```
USAGE
  $ valois-core blockchain:reset

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "VALOIS_DATA_PATH"
                             can also be used.

  -y, --yes                  Skip confirmation prompt.

EXAMPLES
  blockchain:reset
  blockchain:reset --data-path ./valois
  blockchain:reset --yes
```

_See code: [dist/commands/blockchain/reset.ts](https://github.com/ValoisHQ/valois-core/blob/v3.0.0-beta.2.5/dist/commands/blockchain/reset.ts)_
