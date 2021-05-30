# `valois-core forger-info`

Commands relating to Valois Core forger-info data.

- [`valois-core forger-info:export`](#valois-core-forger-infoexport)
- [`valois-core forger-info:import SOURCEPATH`](#valois-core-forger-infoimport-sourcepath)

## `valois-core forger-info:export`

Export to <FILE>.

```
USAGE
  $ valois-core forger-info:export

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "VALOIS_DATA_PATH"
                             can also be used.

  -o, --output=output        The output directory. Default will set to current working directory.

EXAMPLES
  forger-info:export
  forger-info:export --data-path ./data --output ./my/path/
```

_See code: [dist/commands/forger-info/export.ts](https://github.com/ValoisHQ/valois-core/blob/v3.0.0-beta.2.5/dist/commands/forger-info/export.ts)_

## `valois-core forger-info:import SOURCEPATH`

Import from <FILE>.

```
USAGE
  $ valois-core forger-info:import SOURCEPATH

ARGUMENTS
  SOURCEPATH  Path to the forger-info zip file that you want to import.

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "VALOIS_DATA_PATH"
                             can also be used.

  -f, --force                To overwrite the existing data if present.

EXAMPLES
  forger-info:import ./my/path
  forger-info:import --data-path ./data --force
```

_See code: [dist/commands/forger-info/import.ts](https://github.com/ValoisHQ/valois-core/blob/v3.0.0-beta.2.5/dist/commands/forger-info/import.ts)_
