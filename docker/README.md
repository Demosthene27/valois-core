# Using docker-compose

## Copy sample .env file

Choose one of the sample `.env.*` file and copy it to `.env`.
You should set `ENV_VALOIS_VERSION` to the version of Valois and can change the database configuration.
Note: to configure Valois Core itself, see below.

## Run docker-compose

You can run docker-compose directly

```
docker-compose up -d
docker-compose ps
docker-compose logs
```

(see https://docs.docker.com/compose/reference/overview/)

or use the `Makefile` (you will need to install `make`) for convenience:

```
make            # will run `docker-compose up` for you
make coldstart  # will download and restore a blockchain snapshot for you
```

# Configure Valois Core

Edit the `docker-compose.override.yml` (not `docker-compose.yml`) file to customize your setup.
Some command examples can be found below. All supported environment variables can be found in the [top-level README](../README.md#command-line-options)

(see https://docs.docker.com/compose/extends/#multiple-compose-files)

## Examples

Do not expose ports:

(see https://docs.docker.com/compose/compose-file/#ports)

```
version: "3"
services:

  valois:
    ports:
      - ${ENV_VALOIS_PORT}
      - ${ENV_VALOIS_API_WS_PORT}
      - ${ENV_VALOIS_HTTP_PORT}
```

Increase log level to debug, enable public API:

(see https://docs.docker.com/compose/compose-file/#environment)

```
version: "3"
services:

  valois:
    environment:
      - VALOIS_CONSOLE_LOG_LEVEL=debug
      - VALOIS_API_PUBLIC=true
```

Add forging delegates and whitelist IPs:

(see https://docs.docker.com/compose/compose-file/#environment)

```
version: "3"
services:

  valois:
    environment:
      - VALOIS_FORGING_DELEGATES=publicKey1|encryptedPassphrase1,publicKey2|encryptedPassphrase2
      - VALOIS_API_WHITELIST=127.0.0.1,172.17.0.1
      - VALOIS_FORGING_WHITELIST=127.0.0.1,172.17.0.1
```
