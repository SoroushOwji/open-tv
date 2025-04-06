import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Rating from "../../src/components/Rating.vue";

describe("Rating.vue", () => {
  it("renders the correct value", () => {
    const wrapper = mount(Rating, {
      props: { value: 4 },
    });
    expect(wrapper.text()).toBe("4");
  });

  it("applies the correct size class for 'small'", () => {
    const wrapper = mount(Rating, {
      props: { value: 3, size: "small" },
    });
    expect(wrapper.classes()).toContain("h-8");
    expect(wrapper.classes()).toContain("w-8");
    expect(wrapper.classes()).toContain("text-xs");
  });

  it("applies the correct size class for 'large'", () => {
    const wrapper = mount(Rating, {
      props: { value: 5, size: "large" },
    });
    expect(wrapper.classes()).toContain("h-12");
    expect(wrapper.classes()).toContain("w-12");
    expect(wrapper.classes()).toContain("text-sm");
  });

  it("defaults to 'small' size when size prop is not provided", () => {
    const wrapper = mount(Rating, {
      props: { value: 2 },
    });
    expect(wrapper.classes()).toContain("h-8");
    expect(wrapper.classes()).toContain("w-8");
    expect(wrapper.classes()).toContain("text-xs");
  });
});
