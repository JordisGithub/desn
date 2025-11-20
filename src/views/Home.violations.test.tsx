import { describe, it, expect } from "vitest";
import { renderWithProviders, testAccessibility } from "../test/test-utils";
import Home from "./Home";

describe("Home Page Accessibility", () => {
  it("should meet accessibility standards", async () => {
    const { container } = renderWithProviders(<Home />);
    const results = await testAccessibility(container);

    expect(results.violations).toEqual([]);
  });
});
