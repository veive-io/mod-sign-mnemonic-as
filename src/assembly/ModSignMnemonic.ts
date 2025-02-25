import { System, Crypto, Arrays } from "@koinos/sdk-as";
import { ModSign, modsign, MODULE_SIGN_TYPE_ID } from "@veive-io/mod-sign-as";

export class ModSignMnemonic extends ModSign {
  callArgs: System.getArgumentsReturn | null;

  contractId: Uint8Array = System.getContractId();

  /**
   * Validates an ECDSA signature to ensure the authenticity of a transaction.
   * 
   * This method checks the length of the provided signature, recovers the public key from the signature
   * and transaction ID, and verifies that the recovered address matches the expected sender.
   * 
   * @external
   */
  is_valid_signature(args: modsign.is_valid_signature_args): modsign.is_valid_signature_result {
    const result = new modsign.is_valid_signature_result(false);

    // Check if the signature length is valid (65 bytes for ECDSA)
    if (args.signature!.length == 65) {
      // Recover the public key from the signature and transaction ID
      const publicKey = System.recoverPublicKey(args.signature!, args.tx_id!);
      const signer = Crypto.addressFromPublicKey(publicKey!);

      // Verify that the recovered address matches the expected sender
      if (Arrays.equal(signer, args.sender)) {
        System.log(`[mod-sign-mnemonic] valid signature found`);
        result.value = true;
      } else {
        System.log(`[mod-sign-mnemonic] no valid signature found`);
      }
    }

    return result;
  }

  /**
   * @external
   * @readonly
   */
  manifest(): modsign.manifest {
    const result = new modsign.manifest();
    result.name = "Mnemonic signature";
    result.description = "Verify of mnemonic (12 words) signatures";
    result.type_id = MODULE_SIGN_TYPE_ID;
    result.version = "2.0.0";
    return result;
  }
}