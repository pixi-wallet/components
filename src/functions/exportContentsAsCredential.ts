import { passwordToKey } from "./passwordToKey";
import { lockContent } from "./lockContents";

import { X25519KeyPair } from "@transmute/x25519-key-pair";

export const exportContentsAsCredential = async (
  password: string,
  content: any
): Promise<any> => {
  const derivedKey = await passwordToKey(password);

  const kp = await X25519KeyPair.generate({
    secureRandom: () => {
      return derivedKey;
    }
  });
  kp.id = kp.controller + kp.id;

  // we don't want to leak number of wallet contents...
  // so we push them into a single object before encrypting.
  const lockedContent = await lockContent(password, content);
  const encryptedWallet = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "http://w3id.org/wallet/v1"
    ],
    // consider using content id of ciphertext here...
    id: kp.controller + "#encrypted-wallet",
    type: ["VerifiableCredential", "EncryptedWallet"],
    issuer: kp.controller,
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: kp.controller,
      encryptedWalletContents: lockedContent
    }
  };
  return encryptedWallet;
};
