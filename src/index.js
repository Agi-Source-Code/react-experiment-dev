/**
 * @flow
 */

import { Component, PureComponent } from "./packages/react";
import Child1 from "./Components/Child1";

class App extends Component {
  render() {
    console.log(this);
    return new Child1({ props: {} });
  }
}

new App().render();
