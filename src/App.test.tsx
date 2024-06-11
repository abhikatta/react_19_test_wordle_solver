import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
describe("group", () => {
  it("should", () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
