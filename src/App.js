import React from "react";
import "./App.css";
import { getWebcamStream } from "./helpers/webcam";

class App extends React.Component {
  state = {
    video: null,
    stream: null,
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

  render() {
    const { stream } = this.state;
    return (
      <div className="App">
        {stream && (
          <video width="800px" height="600px" autoPlay ref={this.setRef} />
        )}
      </div>
    );
  }
}

export default App;
