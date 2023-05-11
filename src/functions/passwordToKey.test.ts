import { passwordToKey } from "./passwordToKey";

const password = "uber sercure password"
const seed = "e802b1b26826b929f7a2c4621ebc09e161d2e34c43b2ec3bc321046aec235877"

it("seed from password", async () => {
  const derivedKey: any = await passwordToKey(password);
  expect(Buffer.from(derivedKey).toString("hex")).toBe(seed);
});
