# **Mod Sign Mnemonic**

## **Overview**

`ModSignMnemonic` is a module in the Veive protocol designed to validate signatures derived from a mnemonic-based key pair using the ECDSA (Elliptic Curve Digital Signature Algorithm) P-256 (ES256) standard. This module enables authentication and transaction signing for accounts created using a 12-word mnemonic phrase, ensuring secure and verifiable ownership of the associated cryptographic key pair.

## **Purpose**

Mnemonic phrases (also known as seed phrases) are widely used in blockchain applications to derive cryptographic key pairs. A private key generated from a mnemonic phrase allows users to sign transactions, while the corresponding public key is used to verify signatures.

**Key Components in Mnemonic-Based Signature Validation:**

1. **Mnemonic Phrase**: A 12-word recovery phrase that deterministically generates a private key.
2. **Private Key**: A cryptographic key derived from the mnemonic, used to sign messages.
3. **Public Key**: The corresponding public portion of the key pair, used to verify the signature.
4. **Signature**: A digital signature created using the private key to validate transactions or authentication requests.

### **How `ModSignMnemonic` Works**

The `ModSignMnemonic` module is responsible for validating that a transaction or authentication request is signed by the rightful account owner. This process involves:

1. **Mnemonic-Based Key Derivation**:
   - The private key is derived from the 12-word mnemonic phrase following the standard derivation path for ECDSA P-256 (ES256).

2. **Signature Verification**:
   - Using the provided signature, the module checks whether the signature is valid and corresponds to the expected public key.

3. **Address Verification**:
   - The derived public key is used to verify the provided signature and validate that the transaction or authentication request originates from the rightful account.

This module plays a crucial role in ensuring secure authentication and transaction verification within the Veive protocol.

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

