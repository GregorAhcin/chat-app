const expect = require("expect");

let { generateMessage } = require("./messages");

describe("generate Message", () => {
  it("should generate correct message object", () => {
    let from = "gregor";
    let text = "test";

    let res = generateMessage(from, text);

    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(typeof res.createdAt).toBe("number");
    expect(res).toMatchObject({
      from: from,
      text: text
    });
  });
});
