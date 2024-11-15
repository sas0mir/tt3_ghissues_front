import { render, screen } from "@testing-library/react";
import InfoPanel from "./index";

//todo tests
describe("InfoPanel", () => {
  test("renders div", async () => {
    render(<InfoPanel />);
    expect(screen.getByRole("div", { name: "InfoPanel" })).toBeInTheDocument();
  });

  test("renders a user/repo info", async () => {
    render(<InfoPanel />);
    const el = await screen.findAllByRole("div");
    expect(el).toBeDefined();
  });
});