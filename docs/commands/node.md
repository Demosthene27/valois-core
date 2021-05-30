# `valois-core node`

Commands relating to Valois Core node.

- [`valois-core node:info`](#valois-core-nodeinfo)

## `valois-core node:info`

Get node information from a running application.

```
USAGE
  $ valois-core node:info

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "VALOIS_DATA_PATH"
                             can also be used.

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLES
  node:info
  node:info --data-path ./valois
```

_See code: [dist/commands/node/info.ts](https://github.com/ValoisHQ/valois-core/blob/v3.0.0-beta.2.5/dist/commands/node/info.ts)_
