import * as React from "react";
import { render } from "@testing-library/react";
import PageNotFound from "./PageNotFound";

describe("Page not found page", () => {
  it("matches the snapshot when a name is passed", () => {
    var component = render(<PageNotFound />);
    expect(component).toMatchSnapshot();
  });
});
