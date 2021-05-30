# `valois-core passphrase`

Commands relating to Valois Core passphrases.

- [`valois-core passphrase:decrypt ENCRYPTEDPASSPHRASE`](#valois-core-passphrasedecrypt-encryptedpassphrase)
- [`valois-core passphrase:encrypt`](#valois-core-passphraseencrypt)

## `valois-core passphrase:decrypt ENCRYPTEDPASSPHRASE`

Decrypt secret passphrase using the password provided at the time of encryption.

```
USAGE
  $ valois-core passphrase:decrypt ENCRYPTEDPASSPHRASE

ARGUMENTS
  ENCRYPTEDPASSPHRASE  Encrypted passphrase to decrypt.

OPTIONS
  -w, --password=password  Specifies a source for your secret password. Command will prompt you for input if this option
                           is not set.
                           Examples:
                           - --password=pass:password123 (should only be used where security is not important)

EXAMPLE
  passphrase:decrypt
  "iterations=1000000&cipherText=9b1c60&iv=5c8843f52ed3c0f2aa0086b0&salt=2240b7f1aa9c899894e528cf5b600e9c&tag=23c0111213
  4317a63bcf3d41ea74e83b&version=1"
```

_See code: [dist/commands/passphrase/decrypt.ts](https://github.com/ValoisHQ/valois-core/blob/v3.0.0-beta.2.5/dist/commands/passphrase/decrypt.ts)_

## `valois-core passphrase:encrypt`

Encrypt secret passphrase using password.

```
USAGE
  $ valois-core passphrase:encrypt

OPTIONS
  -p, --passphrase=passphrase  Specifies a source for your secret passphrase. Command will prompt you for input if this
                               option is not set.
                               Examples:
                               - --passphrase='my secret passphrase' (should only be used where security is not
                               important)

  -w, --password=password      Specifies a source for your secret password. Command will prompt you for input if this
                               option is not set.
                               Examples:
                               - --password=pass:password123 (should only be used where security is not important)

  --outputPublicKey            Includes the public key in the output. This option is provided for the convenience of
                               node operators.

EXAMPLE
  passphrase:encrypt
```

_See code: [dist/commands/passphrase/encrypt.ts](https://github.com/ValoisHQ/valois-core/blob/v3.0.0-beta.2.5/dist/commands/passphrase/encrypt.ts)_
