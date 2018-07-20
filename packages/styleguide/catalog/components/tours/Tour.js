import {} from "prop-types";
import Joyride from "react-joyride";
import React from "react";

import { color, radius } from "../../../utils";
import "./tour.css";

const Tour = (props) => {
  const buttonStyle = {
    display: "none"
  };

  const secButtonStyle = {
    background: "transparent",
    color: color.white
  };

  const priButtonStyle = {
    background: color.white,
    color: color.greenHD
  };

  const styles = {
    options: {
      arrowColor: color.greenHD,
      backgroundColor: color.greenHD,
      beaconSize: 36
    },
    beacon: {},
    beaconInner: {
      background: color.greenHD
    },
    beaconOuter: {
      borderColor: color.greenHD,
      background: color.flareM
    },
    tooltip: {
      borderRadius: radius.s,
      padding: "15px",
      width: "240px"
    },
    tooltipContainer: {},
    tooltipTitle: {
      margin: "0",
      padding: "0"
    },
    tooltipContent: {
      margin: "0",
      padding: "0",
      textAlign: "left"
    },
    tooltipFooter: {
      display: "none"
    },
    buttonNext: {
      ...buttonStyle,
      ...priButtonStyle
    },
    buttonBack: {
      ...buttonStyle,
      ...secButtonStyle
    },
    buttonClose: {
      display: "none"
    },
    buttonSkip: {
      ...buttonStyle,
      ...secButtonStyle
    },
    overlay: { background: color.flareM, cursor: "default" },
    overlayLegacy: { background: color.flareM },
    spotlight: {
      borderRadius: "10px",
      boxShadow: `
        0px 2px 5px ${color.shadowHL},
        0px -2px 5px ${color.shadowHL}
      `,
      border: `3px solid ${color.greenBlk}`
    },
    spotlightLegacy: {},
    floater: {
      arrow: {},
      tooltip: {}
    }
  };
  return <Joyride styles={styles} {...props} />;
};

Tour.propTypes = {};

Tour.defaultProps = {};

export default Tour;
