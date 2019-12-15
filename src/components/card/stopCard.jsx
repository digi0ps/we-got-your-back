import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
import Webcam from "../webcam";

class WebcamCard extends React.Component {
  state = {
    posture: null,
  };

  renderText = () => {
    const { posture } = this.state;
    let text = "Bad";

    if (posture === null) {
      text = "Loading";
    } else if (posture) {
      text = "Good";
    }

    return <p className={text}>Posture is {text}!</p>;
  };

  onPoseHandleer = pose => {
    this.setState({ posture: pose });
    this.props.onPose && this.props.onPose(pose);
  };

  render() {
    return (
      <div class="Card">
        {/* Insert webcam feed alone here instead of img*/}
        <Webcam onBlink={this.props.onBlink} onPose={this.onPoseHandleer} />

        <h2></h2>

        {this.renderText()}
        <button id="initiator" onClick={this.props.onStop}>
          Stop Tracking
        </button>
      </div>
    );
  }
}

export default WebcamCard;
