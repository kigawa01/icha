export function getDefault<T>(value: T | undefined, defaultValue: T): T {
  if (value == undefined) {
    return defaultValue;
  }
  return value;
}

export function getValue<T>(value: T | (() => T)) {
  return value instanceof Function ? value() : value;
}