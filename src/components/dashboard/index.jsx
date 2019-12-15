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
    kill: false,
  };

  timer = null;
  stopMatchTimer = null;
  blinkTimer = null;

  componentDidMount() {
    this.stopMatchTimer = setInterval(() => {
      const diff = new Date() - this.state.start;
      this.setState({
        diff,
      });
    }, 1000);
  }

  incrementBlink = () => {
    const { blinks, kill } = this.state;
    if (kill) {
      return;
    }

    console.log("BLINK", blinks);
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
        if (window["correctpos"]) {
          window["correctpos"]();
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
    const { truePose, falsePose, kill } = this.state;
    if (kill) {
      return;
    }
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

  throttledPoseChange = throttle(this.onPoseChange, 1000);

  onStopTrack = e => {
    e.preventDefault();
    clearInterval(this.stopMatchTimer);
    this.setState({
      kill: true,
    });

    if (window["endnotify"]) {
      window["endnotify"]();
    }
  };

  render() {
    const { blinks, diff, truePose, falsePose, kill } = this.state;

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
        {!kill && (
          <StopWebcamCard
            onPose={this.throttledPoseChange}
            onBlink={this.incrementBlink}
            onStop={this.onStopTrack}
          />
        )}
        <InfoCard class="infoinfo">
          <h2 className="reportTitle">Reports</h2>
          {this.state.diff ? <h3>Time since start: {ms(diff)}</h3> : null}
          <h3 className="blinksPM">Blinks per minute: {bpm}</h3>
          <h3 className="ppp">
            Posture Perfection Percentage: {Math.round(posePerc)}%
          </h3>
        </InfoCard>
      </div>
    );
  }
}
