import React, { Component } from "react";
import "./App.css";
import { observer } from "mobx-react";
import SlotMachine from "./components/slotMachine/SlotMachine";

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <SlotMachine />
      </div>
    );
  }
}

export default App;
