import {GlobalState} from "../_hook/globalState";
import {useEffect} from "react";

const localStorageState = new GlobalState<Storage | undefined>(undefined);
export default function LocalStorageProvider(
  {}: {},
) {
  useEffect(() => {
    if (localStorageState.currentValue() != undefined) return;
    localStorageState.set(window.localStorage);
  }, []);

  return undefined;
}

export function useLocalStorage() {
  return localStorageState.use();
}