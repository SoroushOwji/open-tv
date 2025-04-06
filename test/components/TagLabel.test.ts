import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TagLabel from "../../src/components/TagLabel.vue";

describe("TagLabel.vue", () => {
  it("renders the provided text", () => {
    const wrapper = mount(TagLabel, {
      props: {
        text: "Action",
      },
    });
    expect(wrapper.text()).toBe("Action");
  });
});
