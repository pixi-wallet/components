import { passwordToKey } from "./passwordToKey";

import { X25519KeyPair } from "@transmute/x25519-key-pair";
import { JWE } from "@transmute/jose-ld";

export const unlockContents = async (
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

  const cipher = new JWE.Cipher();


  const decryptedContent = await cipher.decryptObject({
    jwe: content,
    keyAgreementKey: kp
  });

  return decryptedContent;
};
