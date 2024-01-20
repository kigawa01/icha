import {useMemo, useState} from "react";


export class State<T> {
  readonly value: T
  readonly set: (isOpen: T) => void

  constructor(
    value: T,
    setter: (isOpen: T) => void,
  ) {
    this.value = value
    this.set = setter
  }
}

export function useStateObj<T>(initialState: T | (() => T)) {
  const [value, setValue] = useState<T>(initialState)
  return useMemo(() => {
    return new State(value, setValue)
  }, [value])
}
