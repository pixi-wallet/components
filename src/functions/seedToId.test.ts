import { seedToId } from "./seedToId";

const seed = "seed from password"

it("seed from password", async () => {
  const contentUrn: any = await seedToId(Buffer.from(seed, "hex"));
  expect(contentUrn).toBe(
    "urn:digest:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  );
});
