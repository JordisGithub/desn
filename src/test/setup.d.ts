/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import type { AxeMatchers } from "jest-axe";

declare module "vitest" {
  // Add phantom properties to satisfy no-empty-object-type while preserving augmentation
  interface Assertion<T = unknown>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> {
    /** Phantom type to avoid empty interface lint error */
    __assertionType?: T;
  }
  interface AsymmetricMatchersContaining
    extends TestingLibraryMatchers<typeof expect.stringContaining, unknown> {
    /** Phantom marker */
    __asymmetricMatcherType?: unknown;
  }
}

declare global {
  namespace Vi {
    interface Assertion extends AxeMatchers {
      /** Phantom to avoid empty interface */
      __axeAssertionMarker?: unknown;
    }
    interface AsymmetricMatchersContaining extends AxeMatchers {
      /** Phantom to avoid empty interface */
      __axeAsymmetricMarker?: unknown;
    }
  }
}
