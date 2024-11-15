import { render, screen } from "@testing-library/react";
import SearchInput from "./index";

//todo tests
describe("SearchInput", () => {
  test("renders input", async () => {
    render(<SearchInput data={[]} title="test" onChange={() => {}} onSelect={() => {}} />);
    expect(screen.getByRole("Input", { name: "SelectInput" })).toBeInTheDocument();
  });

  test("renders a droplist", async () => {
    render(<SearchInput data={[{
        id: 1,
        title: 'test title',
        body: 'test text',
        updated_at: new Date(),
    }]} title="test" onChange={() => {}} onSelect={() => {}} />);
    const select = await screen.findAllByRole("select");
    expect(select).toBe(<div></div>)//todo
  });
});