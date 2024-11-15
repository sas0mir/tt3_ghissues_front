import { render, screen } from "@testing-library/react";
import Modal from "./index";

//todo tests
describe("Modal", () => {
  test("renders modal", async () => {
    render(<Modal data={[]} isOpen onClose={() => {}} />);
    expect(screen.getByRole("Modal", { name: "Modal" })).toBeInTheDocument();
  });

  test("renders a issue", async () => {
    render(<Modal data={[{
        id: 1,
        title: 'test title',
        body: 'test text',
        updated_at: new Date(),
    }]} isOpen onClose={() => {}} />);
    const issue = await screen.findAllByRole("div");
    expect(issue).toContain(expect(<div></div>))
  });
});