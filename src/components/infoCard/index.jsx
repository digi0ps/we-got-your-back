import React from "react";
import "./infoCard.css";
import { Link } from "react-router-dom";

class InfoCard extends React.Component {
  render() {
    return (
      <div class="InfoCard">
        <div class="Alignment">
          {this.props.children}
          <div classNamee="InfoNav">
            {this.props.previous ? (
              <Link to={this.props.previous} className="left">
                Previous
              </Link>
            ) : null}
            {this.props.next ? (
              <Link to={this.props.next} className="right">
                Next
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoCard;
