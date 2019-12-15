import React from "react";
import "./card.css";

class Card extends React.Component {
  state = {
      postureState: "good",
      buttonText: "Stop",
  }

  //To be called by the webcam module
  setPostureAsBad = () => {
    this.setState({
        postureState: "bad",
    });
  }

  //To be called by the webcam module
  setPostureAsGood = () => {
    this.setState({
        postureState: "good",
    });
  }

  buttonEvent = () => {
    var elem = document.getElementById("initiator");
    elem.style.backgroundColor = "#4CAF50";
    this.setState({
        buttonText: "Start",
    });
    // insert function to exit the app?}
  }

  render() {
    return (
      <div class="Card">
          { /* Insert webcam feed alone here instead of img*/}
          <img src={require("./temp.png")} alt="Webcam placeholder"></img>

          <h2>Some title</h2>
          <p>Posture is {this.state.postureState}!</p>
          <button 
            id="initiator" 
            onClick={this.buttonEvent}>
                {this.state.buttonText} Monitoring
          </button>
      </div>
    );
  }
}

export default Card;
