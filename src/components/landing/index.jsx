import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

class Home extends React.Component {
  render() {
    return (
      <div className="Main">
        <div className="firstHalf">
          <img src="/images/computer.svg" alt="Woman" className="logo" />
        </div>
        <div className="secondHalf">
          <span className="title">Ergonomics</span>
          <br></br>
          <span className="tagline">Made Simple</span>
          <br></br>
          <Link to="onboarding" className="button firstButton">
            Let's Go
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
