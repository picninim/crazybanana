import React from "react";
import ReactDOM from "react-dom";
import SlotMachine from "./SlotMachine";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SlotMachine />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("should won 100", () => {
  const wrapper = shallow(<SlotMachine />);
  const results = [
    {
      position: 1,
      value: 1
    },
    {
      position: 2,
      value: 1
    },
    {
      position: 3,
      value: 1
    }
  ];
  const instance = wrapper.instance();
  const prize = instance.getPrize(results);
  expect(prize.money).toBe(100);
});

it("should won 20", () => {
  const wrapper = shallow(<SlotMachine />);
  const results = [
    {
      position: 1,
      value: 1
    },
    {
      position: 2,
      value: 1
    }
  ];
  const instance = wrapper.instance();
  const prize = instance.getPrize(results);
  expect(prize.money).toBe(20);
});

it("should won 10", () => {
  const wrapper = shallow(<SlotMachine />);
  const results = [
    {
      position: 1,
      value: 2
    },
    {
      position: 3,
      value: 2
    }
  ];
  const instance = wrapper.instance();
  const prize = instance.getPrize(results);
  expect(prize.money).toBe(10);
});

it("should won 0", () => {
  const wrapper = shallow(<SlotMachine />);
  const results = [];
  const instance = wrapper.instance();
  const prize = instance.getPrize(results);
  expect(prize.money).toBe(0);
});

it("should get 0 same results", () => {
  const wrapper = shallow(<SlotMachine />);
  const results = [
    {
      position: 1,
      value: 1
    },
    {
      position: 2,
      value: 3
    },
    {
      position: 3,
      value: 2
    }
  ];
  const instance = wrapper.instance();
  const _results = instance.getSameResults(results);
  expect(_results.length).toBe(0);
});

it("should get 2 same results", () => {
  const wrapper = shallow(<SlotMachine />);
  const results = [
    {
      position: 1,
      value: 1
    },
    {
      position: 2,
      value: 1
    },
    {
      position: 3,
      value: 2
    }
  ];
  const instance = wrapper.instance();
  const _results = instance.getSameResults(results);
  expect(_results.length).toBe(2);
});

it("should get 3 same results", () => {
  const wrapper = shallow(<SlotMachine />);
  const results = [
    {
      position: 1,
      value: 1
    },
    {
      position: 2,
      value: 1
    },
    {
      position: 3,
      value: 1
    }
  ];
  const instance = wrapper.instance();
  const _results = instance.getSameResults(results);
  expect(_results.length).toBe(3);
});

it("should start after 5", () => {
  //
});

it("should stop after 10", () => {
  //
});
