import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import Events from "./Events";

describe("Events Page Accessibility", () => {
  it("should meet accessibility standards", async () => {
    const { container } = renderWithProviders(<Events />);
    const results = await testAccessibility(container);

    expect(results.violations).toEqual([]);
  });
});
