import { describe, expect, it } from "vitest";
import { formatMetric, parseMetric } from "./metric";

describe("parseMetric", () => {
  it.each([
    ["+340%", { prefix: "+", number: 340, decimals: 0, suffix: "%", useGrouping: false, minIntegerDigits: 1 }],
    ["+45%", { prefix: "+", number: 45, decimals: 0, suffix: "%", useGrouping: false, minIntegerDigits: 1 }],
    ["#1", { prefix: "#", number: 1, decimals: 0, suffix: "", useGrouping: false, minIntegerDigits: 1 }],
    ["92%", { prefix: "", number: 92, decimals: 0, suffix: "%", useGrouping: false, minIntegerDigits: 1 }],
    ["98%", { prefix: "", number: 98, decimals: 0, suffix: "%", useGrouping: false, minIntegerDigits: 1 }],
    ["4.8x", { prefix: "", number: 4.8, decimals: 1, suffix: "x", useGrouping: false, minIntegerDigits: 1 }],
    ["1,000+", { prefix: "", number: 1000, decimals: 0, suffix: "+", useGrouping: true, minIntegerDigits: 1 }],
    ["2 min", { prefix: "", number: 2, decimals: 0, suffix: " min", useGrouping: false, minIntegerDigits: 1 }],
    ["< 24h", { prefix: "< ", number: 24, decimals: 0, suffix: "h", useGrouping: false, minIntegerDigits: 1 }],
    ["2019", { prefix: "", number: 2019, decimals: 0, suffix: "", useGrouping: false, minIntegerDigits: 1 }],
    ["04", { prefix: "", number: 4, decimals: 0, suffix: "", useGrouping: false, minIntegerDigits: 2 }],
  ])("parses %s", (input, expected) => {
    expect(parseMetric(input)).toEqual(expected);
  });

  it.each(["EN / ES", "", "   ", "Available", "24/7", "1-2 weeks"])(
    "returns null for non-countable value %j",
    (input) => {
      expect(parseMetric(input)).toBeNull();
    },
  );
});

describe("formatMetric", () => {
  it.each(["+340%", "+45%", "#1", "92%", "98%", "4.8x", "1,000+", "2 min", "< 24h", "2019", "04"])(
    "round-trips %s at its final value",
    (input) => {
      const parsed = parseMetric(input);
      expect(parsed).not.toBeNull();
      expect(formatMetric(parsed!, parsed!.number)).toBe(input);
    },
  );

  it("formats intermediate count-up values with the same shape", () => {
    expect(formatMetric(parseMetric("1,000+")!, 512.4)).toBe("512+");
    expect(formatMetric(parseMetric("4.8x")!, 2.04)).toBe("2.0x");
    expect(formatMetric(parseMetric("04")!, 1)).toBe("01");
    expect(formatMetric(parseMetric("+340%")!, 0)).toBe("+0%");
  });
});
