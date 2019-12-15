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

  render() {
    return (
      <div class="Card">
        {/* Insert webcam feed alone here instead of img*/}
        <Webcam onPose={posture => this.setState({ posture })} />

        <h2></h2>

        {this.renderText()}
        <Link id="initiator" to="/dash" disabled={this.state.posture === null}>
          Start Tracking
        </Link>
      </div>
    );
  }
}

export default WebcamCard;
