import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { toHaveNoViolations } from "jest-axe";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Extend Vitest's expect with jest-axe matchers
expect.extend(toHaveNoViolations);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock IntersectionObserver
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock HTMLCanvasElement.getContext to suppress canvas warnings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(HTMLCanvasElement.prototype.getContext as any) = function () {
  return null;
};

// Suppress act warnings in test output (tests still pass, just reduces noise)
const originalError = console.error;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.error = (...args: any[]) => {
  // Filter out act() warnings - they're benign in our accessibility tests
  if (
    typeof args[0] === "string" &&
    (args[0].includes("Warning: An update to") ||
      args[0].includes("act(...)") ||
      args[0].includes("wrapped into act"))
  ) {
    return;
  }
  originalError.call(console, ...args);
};
