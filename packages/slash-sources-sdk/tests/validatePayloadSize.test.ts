import { describe, expect, it } from "vitest";
import { validatePayloadSize } from "../src/validatePayloadSize";

describe("validatePayloadSize", () => {
  it("should allow a normal payload", () => {
    const payload = { test: "data", id: 123 };
    expect(validatePayloadSize(payload)).toEqual(payload);
  });

  it("should allow null or undefined", () => {
    expect(validatePayloadSize(null)).toBeNull();
    expect(validatePayloadSize(undefined)).toBeUndefined();
  });

  it("should truncate/reject an oversized payload", () => {
    // Generate a payload that is exactly ~100 bytes, max allowed is 50
    const largeString = "a".repeat(100);
    const payload = { data: largeString };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = validatePayloadSize(payload, 50) as any;

    expect(result).toHaveProperty("_error", "PAYLOAD_TOO_LARGE");
    expect(result._message).toMatch(/exceeds the maximum allowed size of 50 bytes/);
  });

  it("should reject an unserializable payload (circular reference)", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const circularObj: any = {};
    circularObj.self = circularObj;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = validatePayloadSize(circularObj) as any;

    expect(result).toHaveProperty("_error", "PAYLOAD_UNSERIALIZABLE");
  });

  it("should correctly calculate utf-8 string sizes", () => {
    // The string "é" is 2 bytes in UTF-8
    const payload = { a: "é" }; // '{"a":"é"}' is 9 bytes

    expect(validatePayloadSize(payload, 10)).toEqual(payload);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = validatePayloadSize(payload, 8) as any;
    expect(result).toHaveProperty("_error", "PAYLOAD_TOO_LARGE");
  });
});
