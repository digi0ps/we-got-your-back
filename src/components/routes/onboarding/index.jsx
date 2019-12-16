import React from "react";
import "./mainApp.css";

import InfoCard from "../../common/info-card";

class MainApp extends React.Component {
  render() {
    return (
      <div class="MainApp">
        <InfoCard next="setup">
          <h2>HOW IT WORKS</h2>
          <p>
            Keep a good and straight posture before you start the posture
            monitor. Any major deviation from the intial posture will alert you
            to get back to the proper posture.
          </p>
          <ul>
            <li>
              Laptop should be placed such that top of the screen is at eye
              level.
            </li>
            <li>Elbows should rest at 90 degree angle by your side.</li>
            <li>
              Every 10 minutes, take a short (10-20 second) break. Take your
              hands off the keyboard and move!
            </li>
            <li>
              The distance between the eye and the screen should be at least of
              20-25 inches (approximately 50-63 cm). The place of the screen
              should be as far away as possible and, optimally, it is
              recommended to increase the font size.
            </li>
          </ul>
        </InfoCard>
      </div>
    );
  }
}

export default MainApp;
