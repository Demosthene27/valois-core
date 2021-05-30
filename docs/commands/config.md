# `valois-core config`

Commands relating to Valois Core node configuration.

- [`valois-core config:show`](#valois-core-configshow)

## `valois-core config:show`

Show application config.

```
USAGE
  $ valois-core config:show

OPTIONS
  -c, --config=config        File path to a custom config. Environment variable "VALOIS_CONFIG_FILE" can also be used.

  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable "VALOIS_DATA_PATH"
                             can also be used.

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLES
  config:show
  config:show --config ./custom-config.json --data-path ./data
```

_See code: [dist/commands/config/show.ts](https://github.com/ValoisHQ/valois-core/blob/v3.0.0-beta.2.5/dist/commands/config/show.ts)_
