import {useEffect, useState} from "react";

export class LocalStorageManager {
  private readonly storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  get(key: string) {
    return this.storage.getItem(key);
  }

  set(key: string, value: string | undefined) {
    if (value == undefined) this.storage.removeItem(key);
    else this.storage[key] = value;
  }

}


let localStorageManager: LocalStorageManager | undefined = undefined;

export function useLocalStorageManager(): LocalStorageManager | undefined {
  const [storage, setStorage] =
    useState<LocalStorageManager | undefined>(localStorageManager);
  useEffect(() => {
    if (storage != undefined) return;
    if (localStorageManager != undefined) return;
    localStorageManager = new LocalStorageManager(window.localStorage);
    setStorage(localStorageManager);
  }, []);
  return storage;
}
