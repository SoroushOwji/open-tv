import { describe, it, vi, expect } from "vitest";
import { debounce } from "./debounce";

describe("debounce", () => {
  it("should call the function after the specified delay", async () => {
    vi.useFakeTimers();
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(mockFn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("should call the function with the correct arguments", async () => {
    vi.useFakeTimers();
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn("arg1", "arg2");
    vi.advanceTimersByTime(200);

    expect(mockFn).toHaveBeenCalledWith("arg1", "arg2");

    vi.useRealTimers();
  });

  it("should reset the timer if called again before the delay", async () => {
    vi.useFakeTimers();
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn();
    vi.advanceTimersByTime(100);
    debouncedFn();
    vi.advanceTimersByTime(100);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("should handle multiple calls correctly", async () => {
    vi.useFakeTimers();
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn();
    debouncedFn();
    debouncedFn();
    vi.advanceTimersByTime(200);

    expect(mockFn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
