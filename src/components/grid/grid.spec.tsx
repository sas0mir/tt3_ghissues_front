import { render, screen } from "@testing-library/react";
import Grid from "./index";

//todo tests
describe("Grid", () => {
  test("renders grid", async () => {
    render(<Grid data={[]} getData={() => {return []}} />);
    expect(screen.getByRole("grid", { name: "Grid" })).toBeInTheDocument();
  });

  test("renders a list of issues", async () => {
    render(<Grid data={[{
        id: 1,
        title: 'test title',
        body: 'test text',
        updated_at: new Date(),
    }]} getData={() => {return []}} />);
    const issues = await screen.findAllByRole("listitem");
    expect(issues).toHaveLength(1);
  });
});