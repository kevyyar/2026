/**
 * Parses display metrics such as "+340%", "#1", "4.8x" or "1,000+" into a
 * numeric core plus its decoration, so the number can be animated (count-up)
 * while the surrounding characters stay fixed.
 */
export type ParsedMetric = {
  prefix: string;
  number: number;
  decimals: number;
  suffix: string;
  useGrouping: boolean;
  /** Keeps zero-padded values such as "04" padded while counting. */
  minIntegerDigits: number;
};

const METRIC_PATTERN = /^(\D*?)(\d{1,3}(?:,\d{3})+|\d+)(?:\.(\d+))?(\D*)$/;

export function parseMetric(value: string): ParsedMetric | null {
  const match = METRIC_PATTERN.exec(value);
  if (!match) return null;

  const [, prefix, integerPart, fractionPart = "", suffix] = match;
  const useGrouping = integerPart.includes(",");
  const digits = integerPart.replaceAll(",", "");
  const number = Number(fractionPart ? `${digits}.${fractionPart}` : digits);
  if (!Number.isFinite(number)) return null;

  const hasLeadingZero = !useGrouping && digits.length > 1 && digits.startsWith("0");

  return {
    prefix,
    number,
    decimals: fractionPart.length,
    suffix,
    useGrouping,
    minIntegerDigits: hasLeadingZero ? digits.length : 1,
  };
}

const formatters = new Map<string, Intl.NumberFormat>();

function formatterFor(metric: ParsedMetric) {
  const key = `${metric.decimals}|${metric.useGrouping}|${metric.minIntegerDigits}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: metric.decimals,
      maximumFractionDigits: metric.decimals,
      minimumIntegerDigits: metric.minIntegerDigits,
      useGrouping: metric.useGrouping,
    });
    formatters.set(key, formatter);
  }
  return formatter;
}

/** Renders `current` with the same prefix, precision and suffix as the parsed metric. */
export function formatMetric(metric: ParsedMetric, current: number): string {
  return `${metric.prefix}${formatterFor(metric).format(current)}${metric.suffix}`;
}
