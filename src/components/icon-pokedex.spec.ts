import { mount } from "@vue/test-utils";
import Icon from "./icon-pokedex.vue";
import { describe, it, expect } from "vitest";

describe("Icon", () => {
  it("renders the correct image", () => {
    const wrapper = mount(Icon);

    expect(wrapper.find("img").attributes("src")).toBe(
      "/src/assets/pokedex.svg"
    );
  });
});
