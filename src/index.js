/**
 * @flow
 */

import { Component, PureComponent } from "./packages/react";
import Child1 from "./Components/Child1";

class App extends Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      foo: "bar",
    };
  }

  render() {
    // this.setState({ foo: "zom" });
    this.setState((state) => ({ foo: "zom" }));
    console.log(this.state);
    return new Child1({ props: {} });
  }
}

new App().render();
