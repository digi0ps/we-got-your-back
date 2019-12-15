import React from "react";
import "./infoCard.css";
import { Link } from "react-router-dom";

class InfoCard extends React.Component {
  render() {
    return (
      <div class="InfoCard">
        <div class="Alignment">
          <h2>Info</h2>
          <p>
            Improper ergonomics while using PC can lead to back and neck pain
            over the long run. You can avoid that from happening by following
            these recommendations:
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
          <div classNamee="InfoNav">
            {this.props.previous ? (
              <Link to={this.props.previous} className="left">
                Previous
              </Link>
            ) : null}
            <Link to={this.props.next} className="right">
              Next
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoCard;
