import { lockContent } from "./lockContents";
import { unlockContents } from "./unlockContents";

const password = "uber sercure password"

it("unlockContents", async () => {
  const contents = { foo: 1 }
  const lockedContents = await lockContent(password, contents);
  const unlockedContents = await unlockContents(
    password,
    lockedContents
  );
  expect(unlockedContents).toEqual(contents);
});
