/**
 * React Navigation Web Polyfills
 *
 * Provides missing functions for React Navigation on web platform
 */

// Polyfill for useLocale that may be missing on web
if (typeof global !== "undefined") {
  (global as any).useLocale =
    (global as any).useLocale ||
    (() => ({
      direction: "ltr",
      locale: "en-US",
    }));
}

// Ensure Intl.Locale is available
if (typeof Intl !== "undefined" && !Intl.Locale) {
  (Intl as any).Locale = class Locale {
    constructor(public tag: string) {}
    toString() {
      return this.tag;
    }
  };
}

export {};
