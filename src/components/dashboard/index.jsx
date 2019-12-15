import React from "react";

import StopWebcamCard from "../card/stopCard";
import InfoCard from "../infoCard";

import ms from "pretty-ms";
import { throttle } from "../../helpers/utils";

export default class Dashboard extends React.Component {
  state = {
    start: new Date(),
    diff: null,
    blinks: 0,
    truePose: 0,
    falsePose: 0,
    tenSecArray: [],
  };

  timer = null;

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

  pushToArray = newPose => {
    const { tenSecArray } = this.state;

    if (tenSecArray.length === 10) {
      let tpsum = 0;

      tenSecArray.forEach(pose => {
        if (pose) {
          tpsum++;
        }
      });

      if (tpsum < 5) {
        if (window["startNotify"]) {
          // notify
        } else {
          alert("You are crouching, fix your pose!");
        }
      }

      this.setState({
        tenSecArray: [],
      });
    } else {
      tenSecArray.push(newPose);
    }
  };

  onPoseChange = newPose => {
    const { truePose, falsePose } = this.state;
    console.log(truePose, falsePose);
    this.pushToArray(newPose);
    if (newPose) {
      this.setState({
        truePose: truePose + 1,
      });
    } else {
      this.setState({
        falsePose: falsePose + 1,
      });
    }
  };

  throttlePoseChange = newPose => {
    if (this.timer) {
      return;
    }

    this.timer = setTimeout(() => {
      this.onPoseChange(newPose);
      this.timer = null;
    }, 1000);
  };

  render() {
    const { blinks, diff, truePose, falsePose } = this.state;

    const bpm = blinks / (diff / 1000 / 60);

    const posePerc = (truePose / (truePose + falsePose)) * 100;

    return (
      <div
        style={{
          display: "flex",
          margin: "40px",
          justifyContent: "space-evenly",
        }}
      >
        <StopWebcamCard
          onPose={this.throttlePoseChange}
          onBlink={this.incrementBlink}
        />
        <InfoCard>
          <h2>Reports</h2>
          {this.state.diff ? <h3>Time since start: {ms(diff)}</h3> : null}
          <h3>Blinks per minute: {bpm}</h3>
          <h3>Posture Perfection Percentage: {Math.round(posePerc)}%</h3>
        </InfoCard>
      </div>
    );
  }
}
