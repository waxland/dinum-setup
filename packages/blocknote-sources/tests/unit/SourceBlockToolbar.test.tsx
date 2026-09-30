/* @vitest-environment jsdom */
import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { SourceBlockToolbar } from "../../src/formats/SourceBlockToolbar";

describe("ACT-007: SourceBlockToolbar Shortcuts", () => {
  it("should trigger mode change via keyboard shortcuts", () => {
    const onModeChange = vi.fn();
    render(
      <SourceBlockToolbar
        currentMode="callout"
        onModeChange={onModeChange}
        sourceTypeLabel="TEST"
      />,
    );

    // Simulate Ctrl+Alt+2 (Card format)
    fireEvent.keyDown(document, { key: "2", ctrlKey: true, altKey: true });
    expect(onModeChange).toHaveBeenCalledWith("card");

    // Simulate Ctrl+Alt+3 (Link format)
    fireEvent.keyDown(document, { key: "3", ctrlKey: true, altKey: true });
    expect(onModeChange).toHaveBeenCalledWith("link");

    // Simulate Ctrl+Alt+1 (Callout format)
    fireEvent.keyDown(document, { key: "1", ctrlKey: true, altKey: true });
    expect(onModeChange).toHaveBeenCalledWith("callout");
  });

  it("should have aria-keyshortcuts on buttons", () => {
    render(
      <SourceBlockToolbar currentMode="callout" onModeChange={vi.fn()} sourceTypeLabel="TEST" />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[0].getAttribute("aria-keyshortcuts")).toBe("Ctrl+Alt+1");
    expect(buttons[1].getAttribute("aria-keyshortcuts")).toBe("Ctrl+Alt+2");
    expect(buttons[2].getAttribute("aria-keyshortcuts")).toBe("Ctrl+Alt+3");
  });
});
