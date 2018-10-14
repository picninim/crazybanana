import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import SlotComponent from "../Slot/SlotComponent";
import { randomBtw } from "./../../utils/randomBtw";
import "./SlotMachine.css";

@observer
class SlotMachine extends Component {
  @observable
  slots = [
    { position: 1, spinning: false, value: randomBtw(1, 4) },
    { position: 2, spinning: false, value: randomBtw(1, 4) },
    { position: 3, spinning: false, value: randomBtw(1, 4) }
  ];

  @observable
  spinning = false;

  @observable
  prize = null;

  @observable
  waitingResult = false;

  stopInterval = null;
  startInterval = null;
  awaitTime = 10000;

  results = [];

  start = () => {
    this.startInterval && clearInterval(this.startInterval);
    if (!this.spinning && !this.waitingResult) {
      this.prize = null;
      this.spinning = true;
      this.waitingResult = true;
      this.toogleSpinSlots();
      this.stopInterval = setInterval(() => {
        this.stop();
      }, this.awaitTime);
    }
  };

  stop = () => {
    if (this.spinning) {
      this.spinning = false;
      this.stopInterval && clearInterval(this.stopInterval);
      this.toogleSpinSlots();
    }
  };

  toogleSpinSlots = () => {
    this.slots = this.slots.map(slot =>
      Object.assign(slot, { spinning: !slot.spinning })
    );
  };

  registerResult(slot) {
    this.results.push(slot);
    if (this.results.length === this.slots.length) {
      const sameResults = this.getSameResults(this.results);
      this.getPrize(sameResults);
      this.waitingResult = false;
      this.reset();
    }
  }

  getSameResults(results) {
    results.sort((a, b) => a.value - b.value);
    const sameResults = new Set();
    for (var i = 0; i < results.length - 1; i++) {
      if (results[i + 1].value === results[i].value) {
        sameResults.add(results[i]);
        sameResults.add(results[i + 1]);
      }
    }
    return Array.from(sameResults);
  }

  getPrize(sameResults) {
    const numberOfResults = sameResults.sort((a, b) => a.position - b.position)
      .length;
    const prize = {
      money: null,
      message: null
    };
    switch (numberOfResults) {
      case 3:
        prize.money = 100;
        prize.message = "You got Rich!";
        break;
      case 2:
        const isConsecutive =
          sameResults[0].position + 1 === sameResults[1].position;
        prize.money = isConsecutive ? 20 : 10;
        prize.message = isConsecutive ? "Yeah! Nice!" : "You can try again ;)";
        break;
      default:
        prize.money = 0;
        prize.message = "Uh :(";
        break;
    }
    this.prize = prize;
    return prize;
  }

  reset() {
    this.spinning = false;
    this.results = [];
  }

  componentDidMount() {
    this.startInterval = setInterval(this.start, 5000);
  }

  render() {
    return (
      <div className="SlotMachine">
        <div className="Panel">
          <div className="View">
            {this.prize ? `${this.prize.message} $${this.prize.money}` : null}
          </div>
        </div>
        <div className="Side" />
        <div className="SlotMain">
          {this.slots.map((slot, i) => {
            return (
              <SlotComponent
                key={slot.position}
                slot={slot}
                onStopSpin={slot => this.registerResult(slot)}
              />
            );
          })}
        </div>
        <div className="Side">
          <div
            onClick={this.start}
            className={`Handle ${this.waitingResult ? "down" : null}`}
          />
        </div>
        <div className="Button">
          <div
            className={`StopBtn ${this.spinning ? "visible" : null}`}
            onClick={this.stop}
          >
            stop
          </div>
        </div>
      </div>
    );
  }
}

export default SlotMachine;
