import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import About from "./About";

describe("About Page Accessibility", () => {
  it("should meet accessibility standards", async () => {
    const { container } = renderWithProviders(<About />);
    const results = await testAccessibility(container);

    expect(results.violations).toEqual([]);
  });
});
