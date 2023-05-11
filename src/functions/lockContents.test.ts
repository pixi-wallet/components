import { lockContent } from "./lockContents";

const password = "uber sercure password"

it("lockContents", async () => {
  const content = { foo: 1 };
  const lockedContent = await lockContent(password, content);
  expect(lockedContent.protected).not.toBeUndefined();
});
