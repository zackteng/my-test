import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Container from "./Container";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

const scrollToSpy = jest.fn();
global.scrollTo = scrollToSpy;

test("renders search input", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Container />
    </QueryClientProvider>
  );
  const inputElement = screen.getByPlaceholderText("请输入关键字");

  expect(inputElement).toBeInTheDocument();
});

test("renders search button", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Container />
    </QueryClientProvider>
  );
  const buttonElement = screen.getByText("搜索");

  expect(buttonElement).toBeInTheDocument();
});

