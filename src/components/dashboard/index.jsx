import React from "react";

import StopWebcamCard from "../card/stopCard";
import InfoCard from "../infoCard";

import ms from "pretty-ms";

export default class Dashboard extends React.Component {
  state = {
    start: new Date(),
    diff: null,
    blinks: 0,
  };

  componentDidMount() {
    setInterval(() => {
      const diff = new Date() - this.state.start;
      this.setState({
        diff,
      });
    }, 1000);
  }

  incrementBlink = () => {
    const { blinks } = this.state;
    console.log(blinks);
    this.setState({
      blinks: blinks + 1,
    });
  };

  render() {
    const { blinks, diff } = this.state;

    const bpm = blinks / (diff / 1000 / 60);

    return (
      <div className="MainApp">
        <StopWebcamCard onBlink={this.incrementBlink} />
        <InfoCard>
          <h2>Reports</h2>
          {this.state.diff ? <h3>Time since start: {ms(diff)}</h3> : null}
          <h3>Blinks per minute: {bpm}</h3>
        </InfoCard>
      </div>
    );
  }
}
