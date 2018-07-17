import {} from "prop-types";
import Joyride from "react-joyride";
import React from "react";

import {} from "../../../utils";

const Tour = (props) => {
  console.log({ props });

  const styles = {};

  return <Joyride styles={styles} {...props} />;
};

Tour.propTypes = {};

Tour.defaultProps = {};

export default Tour;
