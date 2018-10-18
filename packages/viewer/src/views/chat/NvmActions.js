import React from "react";
import { func } from "prop-types";
import { TileAction } from "interviewjs-styleguide";

const NvmActions = (props) => [
  <TileAction
    key="neverMind"
    onClick={() => props.updateHistory("nvm", "Nevermind")}
    primary
  >
    {props.LANG.chatNVM}
  </TileAction>
];

NvmActions.propTypes = {
  updateHistory: func.isRequired
};

export default NvmActions;
