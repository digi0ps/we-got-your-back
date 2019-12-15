import React from "react";
import "./webcam.css";

import { getWebcamStream } from "../../helpers/webcam";
import PoseNet from "../../helpers/poser";

class App extends React.Component {
  state = {
    stream: null,

    /* Pose Analysis */
    results: null,
    isPoseGood: null,

    /* Blinks */
    blinks: 0,
    isBlinkAnalysing: false,
  };

  videoRef = null;
  canvasRef = null;

  async componentDidMount() {
    const stream = await getWebcamStream();
    const isBlinkAnalysing = this.props.blinkAnalyser;

    this.setState({
      stream,
      isBlinkAnalysing,
    });
  }

  setVideoRef = video => {
    this.videoRef = video;
    video.srcObject = this.state.stream;
  };

  setCanvasRef = canvas => {
    this.canvasRef = canvas;
  };

  startPosture = () => {
    console.log("hello");
    const poser = new PoseNet(this.videoRef, this.canvasRef);

    poser.setupListener(isPoseGood => {
      this.setState({
        isPoseGood,
      });

      const { onPose } = this.props;
      onPose && onPose(isPoseGood);
    });
  };

  blinkHandler = e => {
    e.preventDefault();

    this.setState({
      isBlinkAnalysing: true,
    });

    const eyeMan = new window["eyePlayer"]();
    eyeMan.init(this.videoRef, document.createElement("canvas"));
    eyeMan.start();

    document.addEventListener("blinkEvent", () => {
      console.log("BLINKKK");
      const { blinks } = this.state;

      this.setState({
        blinks: blinks + 1,
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
    const { stream, isAnalysing, isBlinkAnalysing, blinks } = this.state;
    return (
      <div className="App">
        {stream && (
          <div className="videoContainer">
            <video
              width="400px"
              height="550px"
              autoPlay
              className="video"
              onPlay={this.startPosture}
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
