import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText("Title");
  const authorInput = screen.getByPlaceholderText("Author");
  const urlInput = screen.getByPlaceholderText("Url");
  const createButton = screen.getByText("create");

  await userEvent.type(titleInput, "Testing Title");
  await userEvent.type(authorInput, "Test Author");
  await userEvent.type(urlInput, "https://testurl.com");

  userEvent.click(createButton);

  await new Promise((resolve) => setTimeout(resolve, 500));

  expect(createBlog).toHaveBeenCalled();

  expect(createBlog).toHaveBeenCalledWith({
    title: "Testing Title",
    author: "Test Author",
    url: "https://testurl.com",
  });

  expect(titleInput).toHaveValue("");
  expect(authorInput).toHaveValue("");
  expect(urlInput).toHaveValue("");
});
