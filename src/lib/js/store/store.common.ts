import { type Writable, get, writable } from "svelte/store";

export type Store<O> = { [K in keyof O]: Writable<O[K]> };

export function objToStore<T>(data: T): Store<T> {
  const ret: Partial<Store<T>> = {};
  for (let key in data) {
    ret[key] = writable(data[key]);
  }
  return ret as Store<T>;
}

export function storeToObj<T>(store: Store<T>): T {
  const ret = {} as T;
  for (let key in store) {
    ret[key] = get(store[key]);
  }
  return ret;
}

