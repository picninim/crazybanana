import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable, reaction, action } from "mobx";
import { randomBtw } from "./../../utils/randomBtw";
import "./SlotComponent.css";

@observer
class SlotComponent extends Component {
  @observable
  value;

  @observable
  spinning;

  @observable
  spinningDelay = null;
  position = null;
  onStopSpin = null;

  time = 100;
  totalItens = 4;
  interval = null;

  constructor(props) {
    super(props);
    const { value, spinning, position } = props.slot;
    const { onStopSpin } = props;
    this.value = value;
    this.spinning = spinning;
    this.position = position;
    this.onStopSpin = onStopSpin;

    reaction(
      () => this.spinning,
      spinning => {
        spinning ? this.spin() : this.stopSpin(onStopSpin);
      }
    );
  }

  spin() {
    this.interval && clearInterval(this.interval);
    this.spinningDelay = true;
    this.interval = setInterval(() => {
      this.value = (this.value % this.totalItens) + 1;
    }, this.time);
  }

  async stopSpin() {
    const result = await new Promise(resolve =>
      setTimeout(() => {
        this.interval && clearInterval(this.interval);
        resolve(this);
      }, (this.position - 1) * 1000 + randomBtw(1, this.totalItens) * this.time)
    );
    this.spinningDelay = false;
    this.onStopSpin && this.onStopSpin(this);
    return result;
  }

  componentWillReceiveProps(newProps) {
    this.spinning = newProps.slot.spinning;
  }

  render() {
    return (
      <div className="SlotComponent">
        <div
          className={`SlotView ${this.spinningDelay && "spin"}`}
          style={{ animationDuration: `${this.time / 1000}s` }}
        >
          <div
            style={{
              backgroundImage: `url(/assets/v${(this.value % this.totalItens) +
                1}.svg)`
            }}
          />
          <div
            style={{
              backgroundImage: `url(/assets/v${this.value}.svg)`
            }}
          />
        </div>
      </div>
    );
  }
}

export default SlotComponent;
