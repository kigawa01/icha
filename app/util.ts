import {useMemo, useState} from "react";

export const DEBUG = process.env.NEXT_PUBLIC_DEBUG != undefined
  && process.env.NEXT_PUBLIC_DEBUG.toLowerCase() === "true";

export function getDefault<T>(value: T | undefined, defaultValue: T): T {
  if (value == undefined) {
    return defaultValue;
  }
  return value;
}

export function getValue<T>(value: T | (() => T)) {
  return value instanceof Function ? value() : value;
}

export function useStateObjectDef<T>(defaultValue: T | (() => T)): StateObject<T> {
  const [value, setValue] = useState<T>(defaultValue);
  return useMemo(() => {
    return {
      value: value,
      setValue: setValue,
    };
  }, [value]);
}

export function useStateObject<T>(): StateObject<T | undefined> {
  return useStateObjectDef<T | undefined>(undefined);
}

export interface StateObject<T> {
  value: T,

  setValue(value: T): void
}