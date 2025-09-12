import { expect, test, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Page from "./page";

// TODO Delete this file
describe("Home Page", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders Next.js logo", () => {
    render(<Page />);

    const logo = screen.getByAltText("Next.js logo");
    expect(logo).toBeDefined();
  });

  test("renders getting started text", () => {
    render(<Page />);

    const gettingStartedText = screen.getByText(/Get started by editing/);
    expect(gettingStartedText).toBeDefined();
  });

  test("renders Deploy now link", () => {
    render(<Page />);

    const deployLink = screen.getByRole("link", { name: /deploy now/i });
    expect(deployLink).toBeDefined();
    expect(deployLink.getAttribute("href")).toBe(
      "https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    );
  });

  test("renders Read our docs link", () => {
    render(<Page />);

    const docsLink = screen.getByRole("link", { name: /read our docs/i });
    expect(docsLink).toBeDefined();
    expect(docsLink.getAttribute("href")).toBe(
      "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    );
  });

  test("renders file path with correct styling", () => {
    render(<Page />);

    const filePath = screen.getByText("src/app/page.tsx");
    expect(filePath).toBeDefined();
    expect(filePath.tagName).toBe("CODE");
  });
});
