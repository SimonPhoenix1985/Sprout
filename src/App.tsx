import React, { Component } from "react";
import "./App.css";
import CalculateService from "./calculate.service";

interface IChecks {
  a: boolean;
  b: boolean;
  c: boolean;
}

interface INumbers {
  d: number;
  e: number;
  f: number;
}

interface ICustom {
  custom1: boolean;
  custom2: boolean;
}

type TState = IChecks & INumbers & ICustom;

class App extends Component<{}, TState> {
  state: TState = {
    a: false,
    b: false,
    c: false,
    d: 10.0,
    e: 5,
    f: 2,
    custom1: false,
    custom2: false,
  };

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = { ...this.state };
    newState[event.target.name as keyof IChecks] = event.target.checked;
    this.setState(newState);
  };

  handleCustomCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = { ...this.state };
    newState[event.target.name as keyof ICustom] = event.target.checked;
    this.setState(newState);
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = { ...this.state };
    newState[event.target.name as keyof INumbers] = +event.target.value;
    this.setState(newState);
  };

  getOutput = () => {
    const { a, b, c, d, e, f, custom1, custom2 } = this.state;
    const option = [a, b, c].map((value) => +value).join("");
    const res = CalculateService.calculate(option, custom1, custom2, d, e, f);
    return res !== null ? res : " error";
  };

  render() {
    const { a, b, c, d, e, f, custom1, custom2 } = this.state;

    return (
      <div className="App">
        <p>
          custom1{" "}
          <input
            type="checkbox"
            name="custom1"
            checked={custom1}
            onChange={this.handleCustomCheckboxChange}
          />
        </p>
        <p>
          custom2{" "}
          <input
            type="checkbox"
            name="custom2"
            checked={custom2}
            onChange={this.handleCustomCheckboxChange}
          />
        </p>
        <p>
          A{" "}
          <input
            type="checkbox"
            name="a"
            checked={a}
            onChange={this.handleCheckboxChange}
          />
        </p>
        <p>
          B{" "}
          <input
            type="checkbox"
            name="b"
            checked={b}
            onChange={this.handleCheckboxChange}
          />
        </p>
        <p>
          C{" "}
          <input
            type="checkbox"
            name="c"
            checked={c}
            onChange={this.handleCheckboxChange}
          />
        </p>
        <p>
          D{" "}
          <input
            name="d"
            type="number"
            step="0.01"
            value={d}
            onChange={this.handleInputChange}
          />
        </p>
        <p>
          E{" "}
          <input
            name="e"
            type="number"
            step="1"
            value={e}
            onChange={this.handleInputChange}
          />
        </p>
        <p>
          F{" "}
          <input
            name="f"
            type="number"
            step="1"
            value={f}
            onChange={this.handleInputChange}
          />
        </p>
        Output:
        {this.getOutput()}
      </div>
    );
  }
}

export default App;
