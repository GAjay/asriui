import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VirtualList } from "./VirtualList";

describe("VirtualList", () => {
  const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  it("renders visible items", () => {
    render(
      <VirtualList
        items={items}
        itemHeight={40}
        height={200}
        renderItem={(item) => item}
      />,
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.queryByText("Item 99")).not.toBeInTheDocument();
  });

  it("shows empty state", () => {
    render(
      <VirtualList items={[]} itemHeight={40} height={200} renderItem={(item) => item} />,
    );
    expect(screen.getByText("No items")).toBeInTheDocument();
  });
});
