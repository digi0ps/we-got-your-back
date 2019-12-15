import React from "react";
import "./card.css";

import Webcam from "../webcam";

class WebcamCard extends React.Component {
  buttonEvent = () => {};

  render() {
    return (
      <div class="Card">
        {/* Insert webcam feed alone here instead of img*/}
        <Webcam />

        <h2></h2>
        <p>Posture is Good!</p>
        <button id="initiator" onClick={this.buttonEvent}>
          Set Posture
        </button>
      </div>
    );
  }
}

export default WebcamCard;
