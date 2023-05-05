import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Pokemon from "./pokemon-detail.vue";

describe("Pokemon component", () => {
  it("should render correctly when loading is true", () => {
    const wrapper = mount(Pokemon, {
      props: {
        loading: true,
        name: "",
        imageUrl: "",
        types: [],
        height: "",
        weight: "",
      },
    });

    expect(wrapper.find("img").exists()).toBe(true);
    expect(wrapper.find("h1").exists()).toBe(false);
    expect(wrapper.find("table").exists()).toBe(false);
    expect(wrapper.find("span").exists()).toBe(false);
    expect(wrapper.find("img").attributes("alt")).toBe("???");
  });

  it("should render correctly when loading is false", () => {
    const wrapper = mount(Pokemon, {
      props: {
        loading: false,
        name: "Pikachu",
        imageUrl: "https://pokeres.bastionbot.org/images/pokemon/25.png",
        types: ["electric"],
        height: "4",
        weight: "60",
      },
    });

    expect(wrapper.find("img").exists()).toBe(true);
    expect(wrapper.find("h1").exists()).toBe(true);
    expect(wrapper.find("table").exists()).toBe(true);
    expect(wrapper.find("span").exists()).toBe(true);
    expect(wrapper.find("img").attributes("alt")).toBe("Pikachu");
    expect(wrapper.find("h1").text()).toBe("Pikachu");
    expect(wrapper.find("table").text()).toBe("Height:4Weight:60");
    expect(wrapper.find("span").text()).toBe("electric");
  });
});
