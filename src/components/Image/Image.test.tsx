import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildResponsiveSrc, buildSrcSet } from "./buildSrcSet";
import { Image } from "./Image";

describe("buildSrcSet", () => {
  it("builds suffix pattern srcset", () => {
    expect(buildSrcSet("/images/hero.jpg", [400, 800])).toBe(
      "/images/hero-400w.jpg 400w, /images/hero-800w.jpg 800w",
    );
  });

  it("builds query pattern urls", () => {
    expect(buildResponsiveSrc("/cdn/photo.png", 640, "query")).toBe("/cdn/photo.png?w=640");
  });
});

describe("Image", () => {
  it("renders lazy img with srcset", () => {
    render(<Image src="/photo.jpg" alt="Product" widths={[320, 640]} />);
    const img = screen.getByRole("img", { name: "Product" });
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("srcset", "/photo-320w.jpg 320w, /photo-640w.jpg 640w");
  });
});
