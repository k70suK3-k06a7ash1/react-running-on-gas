import { describe, expect, test } from "vitest";
import { FeedbackForm } from "@/components/FeedbackForm";
import { render, screen } from "@testing-library/react";
describe(FeedbackForm, () => {
  test("init rendering", async () => {
    render(<FeedbackForm />);
    expect(screen.getByText("FeedbackForm")).toBeInTheDocument();
  });
});
