import { goto } from "$app/navigation";
import { getContext } from "svelte";
import type SessionManager from "./store/session";
import type { Writable } from "svelte/store";
import type { CVData } from "./store/cv";

export const navigateTo = (url: string, session: SessionManager) => {
  session.save();
  goto(url);
};

export class LocalStorage {
  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static get(key: string) {
    return localStorage.getItem(key);
  }
  static get_parsed<T>(key: string, defaultData: Partial<T>): T {
    return { ...defaultData, ...JSON.parse(localStorage.getItem(key) || "{}") };
  }
}

export class Clock {
  private lastTick = 0;
  private interval = 0;
  constructor(
    private tickLength: number,
    private callback: (dt: number) => void,
  ) {
    this.lastTick = Date.now();
  }
  private update() {
    const now = Date.now();
    const dt = now - this.lastTick;
    if (dt > this.tickLength) {
      this.lastTick = now;
      this.callback(dt);
    }
  }
  start() {
    this.interval = setInterval(() => { this.update() }, this.tickLength);
  }
  stop() {
    clearInterval(this.interval);
  }
}

export class Position {
  constructor(
    public x: number,
    public y: number,
  ) {}
  static default(): Position {
    return {
      x: 0,
      y: 0,
    };
  }
}

export class Size {
  offsetX: number = 0;
  offsetY: number = 0;
  constructor(
    public width: number,
    public height: number,
  ) {}
  static default(): Size {
    return {
      width: 0,
      height: 0,
      offsetX: 0,
      offsetY: 0,
    };
  }
}

export function withCVData(callback: (cv: CVData) => void) {
  const cvCtx: Writable<CVData> = getContext("cv");
  cvCtx.subscribe(callback);
}
