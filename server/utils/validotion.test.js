const expect = require("expect");

let { isRealString } = require("./validation");

describe("isRealString", () => {
  it("should reject non-string values", () => {
    let test = 5;

    let res = isRealString(test);

    expect(res).toBe(false);
  });

  it("should reject string with only spaces", () => {
    let test = "    ";

    let res = isRealString(test);

    expect(res).toBe(false);
  });

  it("should allow string with non-space characters", () => {
    let test = "shnhthn";

    let res = isRealString(test);

    expect(res).toBe(true);
  });
});
