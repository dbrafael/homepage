import { LocalStorage } from "../common";
import type { Updater, Writable } from "svelte/store";
import { objToStore, storeToObj, type Store } from "./store.common";

const cookieName = "---6312-dbr-saved-user-data";

export interface SessionData {
  hue: number;
}

export const DEFAULT_SESSION_DATA: SessionData = {
  hue: 0,
};

export default class SessionManager {
  private data: Store<SessionData>;

  get session() {
    return this.data;
  }

  private constructor(session: SessionData) {
    this.data = objToStore(session);
  }

  public static init(): SessionManager {
    const session = LocalStorage.get_parsed<SessionData>(
      cookieName,
      DEFAULT_SESSION_DATA,
    );

    return new SessionManager(session);
  }

  set(key: keyof SessionData, value: SessionData[keyof SessionData]) {
    this.data[key].set(value);
  }

  update(
    key: keyof SessionData,
    updater: Updater<SessionData[keyof SessionData]>,
  ) {
    this.data[key].update(updater);
  }

  get(key: keyof SessionData): Writable<SessionData[keyof SessionData]> {
    return this.data[key];
  }

  save() {
    LocalStorage.set(cookieName, storeToObj(this.data));
  }
}
