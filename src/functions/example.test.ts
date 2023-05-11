import { example } from "./example";


test("example func", () => {
    let res = example()
    expect(res).toBe("example how to register functions")
})
