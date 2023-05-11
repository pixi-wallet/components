
import { exportContentsAsCredential } from "./exportContentsAsCredential";
import { contentsFromEncryptedWalletCredential } from "./contentsFromEncryptedWalletCredential";

const password = "uber sercure password"

it("contentsFromEncryptedWalletCredential", async () => {
  const contents = { foo: 1 };
  const encryptedWalletCredential = await exportContentsAsCredential(
    password,
    contents
  );
  const recoveredContents: any = await contentsFromEncryptedWalletCredential(
    password,
    encryptedWalletCredential
  );
  expect(recoveredContents).toEqual(contents);
});
