import React from "react";
import "./mainApp.css";

import InfoCard from "../infoCard";

class MainApp extends React.Component {
  render() {
    return (
      <div class="MainApp">
        <InfoCard next="setup"></InfoCard>
      </div>
    );
  }
}

export default MainApp;