import React from "react";
import "./App.css";
import { getWebcamStream } from "./helpers/webcam";
import PoseNet from "./helpers/poser";

class App extends React.Component {
  state = {
    stream: null,
    results: null,
    isAnalysing: false,
    isPoseGood: null,
  };

  videoRef = null;

  async componentDidMount() {
    const stream = await getWebcamStream();

    this.setState({
      stream,
    });
  }

  setRef = video => {
    this.videoRef = video;
    video.srcObject = this.state.stream;
  };

  buttonHandler = e => {
    e.preventDefault();

    this.setState({
      isAnalysing: true,
    });

    const poser = new PoseNet(this.videoRef);
    poser.setupListener(isPoseGood => {
      this.setState({
        isPoseGood,
      });
    });
  };

  renderResult() {
    const { isAnalysing, isPoseGood } = this.state;

    if (isAnalysing) {
      if (isPoseGood === null) {
        return "Calculating...";
      }

      return isPoseGood ? "Correct Pose" : "Wrong Pose";
    }

    return null;
  }

  render() {
    const { stream, isAnalysing } = this.state;
    return (
      <div className="App">
        {stream && (
          <video width="800px" height="600px" autoPlay ref={this.setRef} />
        )}
        {!isAnalysing ? (
          <button onClick={this.buttonHandler}>Start Analysing You</button>
        ) : (
          <p>Analysing your pose</p>
        )}

        {this.renderResult()}
      </div>
    );
  }
}

export default App;
