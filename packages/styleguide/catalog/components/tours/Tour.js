import {} from "prop-types";
import Joyride from "react-joyride";
import React from "react";

import { color, font } from "../../../utils";

const Tour = (props) => {
  const buttonStyle = {
    borderColor: color.blueM,
    borderRadius: "30px",
    borderStyle: "solid",
    borderWidth: "1px",
    fontFamily: font.serif,
    fontSize: "14px",
    lineHeight: "1.2em",
    padding: "5px 10px"
  };

  const secButtonStyle = {
    background: "transparent",
    color: color.blueM
  };

  const priButtonStyle = {
    background: color.blueM,
    color: color.white
  };

  const styles = {
    options: {
      arrowColor: color.white,
      backgroundColor: color.white,
      beaconSize: 36
    },
    beacon: {},
    beaconInner: {
      background: color.greenM
    },
    beaconOuter: {
      borderColor: color.greenM,
      background: color.flareM
    },
    tooltip: {
      borderRadius: "10px",
      padding: "20px"
    },
    tooltipContainer: {},
    tooltipTitle: {
      color: color.blueBlk,
      marginBottom: "10px",
      padding: "0",
      textAlign: "left"
    },
    tooltipContent: {
      fontFamily: font.serif,
      color: color.greyBlk,
      marginTop: "10px",
      padding: "0",
      textAlign: "left"
    },
    tooltipFooter: {
      marginTop: "20px"
    },
    buttonNext: {
      ...buttonStyle,
      ...priButtonStyle
    },
    buttonBack: {
      ...buttonStyle,
      ...secButtonStyle
    },
    buttonClose: {},
    buttonSkip: {
      ...buttonStyle,
      ...secButtonStyle
    },
    overlay: {},
    overlayLegacy: {},
    spotlight: {
      borderRadius: "10px"
    },
    spotlightLegacy: {},
    floater: {
      arrow: {
        color: "#f7f7f7"
      },
      tooltip: {}
    }
  };
  return (
    <Joyride
      styles={styles}
      locale={{
        back: "Back",
        close: "Next",
        last: "Last",
        next: "Next"
      }}
      {...props}
    />
  );
};

Tour.propTypes = {};

Tour.defaultProps = {};

export default Tour;
