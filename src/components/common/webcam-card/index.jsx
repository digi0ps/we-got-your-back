import React from "react";
import "./card.css";
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

  onPoseHandler = pose => {
    this.setState({ posture: pose });

    // If the parent has passed a onPose prop, call it.
    this.props.onPose && this.props.onPose(pose);
  };

  render() {
    return (
      <div class="Card">
        <Webcam onPose={this.onPoseHandler} />

        {this.renderText()}

        {/* Render the button element with the current state*/}
        {this.props.renderButton(this.state.posture)}
      </div>
    );
  }
}

export default WebcamCard;
