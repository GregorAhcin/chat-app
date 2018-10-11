const expect = require("expect");

let { generateMessage, generateLocationMessage } = require("./messages");

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

describe("generate Location Message", () => {
  it("should create correct location object", () => {
    let from = "gregor";

    let res = generateLocationMessage(from, 5, 2);

    expect(res.from).toBe(from);
    expect(typeof res.createdAt).toBe("number");
    expect(res.url).toBe("https://www.google.com/maps?q=5,2");
  });
});
