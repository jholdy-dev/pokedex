import { mount } from "@vue/test-utils";
import { it, expect, describe } from "vitest";
import App from "./App.vue";

describe("App", () => {
  it("renders the correct title", () => {
    const wrapper = mount(App);
    expect(wrapper.find("h1").exists()).toBe(true);
  });
});
