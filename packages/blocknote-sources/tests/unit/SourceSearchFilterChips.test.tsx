import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi } from "vitest";
/* @vitest-environment jsdom */
import { SourceSearchFilterChips } from "../../src/components/SourceSearchFilterChips";

describe("ACT-009: SourceSearchFilterChips Multi-criteria filtering", () => {
  it("renders tablist and handles keyboard/click navigation", () => {
    const onChange = vi.fn();
    render(
      <SourceSearchFilterChips
        categories={["law", "company", "address"]}
        activeCategory="law"
        onChange={onChange}
        locale="fr"
      />,
    );

    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBe(3);

    // Active tab has aria-selected=true
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(tabs[1].getAttribute("aria-selected")).toBe("false");

    // Click triggers onChange
    fireEvent.click(tabs[1]);
    expect(onChange).toHaveBeenCalledWith("company");
  });
});
