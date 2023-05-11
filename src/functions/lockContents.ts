import { passwordToKey } from "./passwordToKey";

import { X25519KeyPair } from "@transmute/x25519-key-pair";
import { JWE } from "@transmute/jose-ld";

export const lockContent = async (
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
  // console.log("keyid",kp.id)
  const recipient = {
    header: {
      kid: kp.id,
      alg: "ECDH-ES+A256KW"
    }
  };
  const recipients = [recipient];

  const keyResolver = (id: string) => {
    if (kp.id === id) {
      return kp.export({
        type: "JsonWebKey2020",
        privateKey: false
      });
    }
    throw new Error(`Key ${id} not found`);
  };

  const cipher = new JWE.Cipher();

  const encryptedContent =  await cipher.encryptObject({
        obj: content,
        recipients: [...recipients],
        publicKeyResolver: keyResolver
      });

  return encryptedContent;
};
