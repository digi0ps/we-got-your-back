import React from "react";
import "./webcam.css";

import { getWebcamStream } from "../../../helpers/webcam";
import PoseNet from "../../../helpers/poser";

class App extends React.Component {
  state = {
    stream: null,
  };

  videoRef = null;
  canvasRef = null;

  async componentDidMount() {
    const stream = await getWebcamStream();

    this.setState({
      stream,
    });
  }

  setVideoRef = video => {
    this.videoRef = video;

    if (video) {
      video.srcObject = this.state.stream;
    }
  };

  setCanvasRef = canvas => {
    this.canvasRef = canvas;
  };

  startPosture = () => {
    const poser = new PoseNet(this.videoRef, this.canvasRef);

    poser.setupListener(isPoseGood => {
      const { onPose } = this.props;
      onPose && onPose(isPoseGood);
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

  startAll = () => {
    if (window["startnotify"]) {
      window["startnotify"]();
    }

    this.startPosture();
  };

  render() {
    const { stream } = this.state;
    return (
      <div className="App">
        {stream && (
          <div className="videoContainer">
            <video
              width="400px"
              height="550px"
              autoPlay
              className="video"
              onPlay={this.startAll}
              ref={this.setVideoRef}
            />
            <canvas
              className="overlay"
              ref={this.setCanvasRef}
              id="drawCanvas"
            ></canvas>
          </div>
        )}
      </div>
    );
  }
}

export default App;
