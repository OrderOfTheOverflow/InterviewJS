import {} from "prop-types";
import Joyride from "react-joyride";
import React from "react";

import { color, font } from "../../../utils";
import "./tour.css";

const Tour = (props) => {
  const buttonStyle = {
    borderColor: color.flareBlk,
    borderRadius: "30px",
    borderStyle: "solid",
    borderWidth: "1px",
    fontFamily: font.serif,
    fontSize: "13px",
    lineHeight: "1.2em",
    padding: "5px 10px"
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
      animation: "pulsate-fwd 1.5s ease-in-out infinite both",
      borderRadius: "10px",
      padding: "15px",
      width: "240px"
    },
    tooltipContainer: {},
    tooltipTitle: {
      color: color.white,
      fontFamily: font.serif,
      fontSize: "14px",
      marginBottom: "10px",
      padding: "0",
      textAlign: "left"
    },
    tooltipContent: {
      color: color.flareBlk,
      fontFamily: font.serif,
      fontSize: "14px",
      marginTop: "10px",
      padding: "0",
      textAlign: "left"
    },
    tooltipFooter: {
      marginTop: "15px"
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
      animation: "blink 1.5s ease-in-out infinite both",
      borderRadius: "10px",
      boxShadow: `
        0px 2px 5px ${color.shadowHL},
        0px -2px 5px ${color.shadowHL}
      `,
      border: `3px solid ${color.greenBlk}`
    },
    spotlightLegacy: {},
    floater: {
      arrow: {
        width: "12px !important",
        height: "24px !important",
        length: 16,
        spread: 32
      },
      tooltip: {}
    }
  };
  return <Joyride styles={styles} {...props} />;
};

Tour.propTypes = {};

Tour.defaultProps = {};

export default Tour;
