# **Mod Sign Mnemonic**

## **Overview**

`ModSignMnemonic` is a module in the Veive protocol designed to validate signatures derived from a mnemonic-based key pair using the ECDSA (Elliptic Curve Digital Signature Algorithm) P-256 (ES256) standard. This module enables authentication and transaction signing for accounts created using a 12-word mnemonic phrase, ensuring secure and verifiable ownership of the associated cryptographic key pair.

Full documentation: https://docs.veive.io/veive-docs/framework/core-modules/mod-sign-mnemonic

## **Usage**

### **Installation**

To install the `ModSignMnemonic` module, first ensure that the Veive protocol is set up on your Koinos blockchain environment. Install the module using yarn:

```bash
yarn add @veive-io/mod-sign-mnemonic-as
```

Deploy the module contract on the Koinos blockchain and install it on the desired account using the `install_module` method provided by the Veive account interface.

### **Scripts**

#### Build

To compile the package, run:

```bash
yarn build
```

#### Dist

To create a distribution, run:

```bash
yarn dist
```

#### Test

To test the package, use:

```bash
yarn jest
```

## **Contributing**

Contributions are welcome! Please open an issue or submit a pull request on the [GitHub repository](https://github.com/veiveprotocol/mod-sign-mnemonic).

## **License**

This project is licensed under the MIT License. See the LICENSE file for details.

