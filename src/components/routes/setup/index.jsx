import React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import WebcamCard from "../../common/webcam-card";

class Setup extends React.Component {
  render() {
    return (
      <div class="MainApp">
        <WebcamCard
          renderButton={posture => (
            <Link
              id="initiator"
              className={cx({
                disabled: posture,
              })}
              to="/dash"
            >
              Start Tracking
            </Link>
          )}
        />
      </div>
    );
  }
}

export default Setup;
