import React from "react";
import "./mainApp.css";

import Card from "../card"
import InfoCard from "../infoCard"

class MainApp extends React.Component {
  render() {
    return (
      <div class="MainApp">
        <Card></Card>
        <InfoCard></InfoCard>
      </div>
    );
  }
}

export default MainApp;
