
import { exportContentsAsCredential } from "./exportContentsAsCredential";
import {inspect} from 'util'
const password = "uber sercure password"

function log(obj:any){
  console.log(inspect(obj, {showHidden: false, depth: null, colors: true}))
}


it("exportContentsAsCredential", async () => {
  const content = { foo: 1 };
  const encryptedWalletCredential = await exportContentsAsCredential(
    password,
    content
  );
  // log(encryptedWalletCredential)
  expect(encryptedWalletCredential.type).toEqual([
    "VerifiableCredential",
    "EncryptedWallet"
  ]);
});
