"use client";

export class LocalStorageManager {
  private readonly storage = window.localStorage;

  get(key: string) {
    return this.storage.getItem(key);
  }

  set(key: string, value: string | undefined) {
    if (value == undefined) this.storage.removeItem(key);
    else this.storage[key] = value;
  }

}

export const localStorageManager = new LocalStorageManager();
