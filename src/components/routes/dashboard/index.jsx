import React from "react";

import InfoCard from "../../common/info-card";
import WebcamCard from "../../common/webcam-card";

import ms from "pretty-ms";
import { throttle, isUserCrouched } from "../../../helpers/utils";

export default class Dashboard extends React.Component {
  state = {
    diff: null,

    truePose: 0,
    falsePose: 0,

    trackingStopped: false,
  };

  startTime = new Date();
  elapsedTimer = null;

  tenSecArray = [];

  componentDidMount() {
    this.elapsedTimer = setInterval(() => {
      const diff = new Date() - this.startTime;
      this.setState({
        diff,
      });
    }, 1000);
  }

  pushToArray = newPose => {
    const isCrouched = isUserCrouched(this.tenSecArray);

    if (isCrouched === "crouched") {
      alert("You are crouched, please fix your position");
    } else if (isCrouched === "not_crouched") {
      this.tenSecArray = [];
    } else if (isCrouched === "not_enough_data") {
      this.tenSecArray.push(newPose);
    }
  };

  onPoseChange = newPose => {
    const { truePose, falsePose, trackingStopped } = this.state;
    if (trackingStopped) {
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
    clearInterval(this.elapsedTimer);
    this.setState({
      trackingStopped: true,
    });

    if (window["endnotify"]) {
      window["endnotify"]();
    }
  };

  render() {
    const { diff, truePose, falsePose, trackingStopped } = this.state;

    const posePerc = (truePose / (truePose + falsePose)) * 100;

    return (
      <div
        style={{
          display: "flex",
          margin: "40px",
          justifyContent: "space-evenly",
        }}
      >
        {!trackingStopped ? (
          <WebcamCard
            onPose={this.throttledPoseChange}
            renderButton={() => (
              <button id="initiator" onClick={this.onStopTrack}>
                Stop Tracking
              </button>
            )}
          />
        ) : null}

        <InfoCard class="infoinfo">
          <h2 className="reportTitle">Reports</h2>
          {this.state.diff ? <h3>Time since start: {ms(diff)}</h3> : null}
          <h3 className="ppp">
            Posture Perfection Percentage: {Math.round(posePerc)}%
          </h3>
        </InfoCard>
      </div>
    );
  }
}
