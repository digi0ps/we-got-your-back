import React from "react";
import "./webcam.css";

import { getWebcamStream } from "../../helpers/webcam";
import PoseNet from "../../helpers/poser";

class App extends React.Component {
  state = {
    stream: null,
  };

  videoRef = null;
  canvasRef = null;
  blinkRef = null;

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
    console.log("hello");
    const poser = new PoseNet(this.videoRef, this.canvasRef);

    poser.setupListener(isPoseGood => {
      const { onPose } = this.props;
      onPose && onPose(isPoseGood);
    });
  };

  blinkHandler = () => {
    const eyeMan = new window["eyePlayer"]();
    console.log(this.blinkRef);
    eyeMan.init(this.blinkRef, document.createElement("canvas"));
    eyeMan.start();

    document.addEventListener("blinkEvent", () => {
      console.log("BLINKKK");
      this.props.onBlink();
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
    if (this.props.onBlink) {
      console.log("blink on");
      this.blinkHandler();
    }
  };

  setBlinkRef = video => {
    this.blinkRef = video;
    if (video) {
      video.srcObject = this.state.stream;
    }
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
            <video autoPlay ref={this.setBlinkRef} id="notwanted" />
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
