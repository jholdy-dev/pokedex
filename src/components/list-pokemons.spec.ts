import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Pokemons from "./list-pokemons.vue";

describe("Pokemons", () => {
  it("renders the correct name and types", () => {
    const wrapper = mount(Pokemons, {
      props: {
        imageUrl: "https://example.com/pokemon.png",
        name: "Pikachu",
        types: ["Electric"],
      },
    });

    expect(wrapper.find("h1").text()).toBe("Pikachu");
    expect(wrapper.findAll(".bg-electric")).toHaveLength(1);
  });

  it("displays the correct image", () => {
    const wrapper = mount(Pokemons, {
      props: {
        imageUrl: "https://example.com/charmander.png",
        name: "Charmander",
        types: ["Fire"],
      },
    });

    expect(wrapper.find("img").attributes("src")).toBe(
      "https://example.com/charmander.png"
    );
    expect(wrapper.find("img").attributes("alt")).toBe("Charmander");
  });

  it("displays multiple types correctly", () => {
    const wrapper = mount(Pokemons, {
      props: {
        imageUrl: "https://example.com/pokemon.png",
        name: "Bulbasaur",
        types: ["Grass", "Poison"],
      },
    });

    expect(wrapper.findAll(".bg-grass")).toHaveLength(1);
    expect(wrapper.findAll(".bg-poison")).toHaveLength(1);
  });

  it("does not display any types if types prop is not provided", () => {
    const wrapper = mount(Pokemons, {
      props: {
        imageUrl: "https://example.com/pokemon.png",
        name: "Squirtle",
      },
    });

    expect(wrapper.findAll(".bg")).toHaveLength(0);
  });
});
