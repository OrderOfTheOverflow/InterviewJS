import React from "react";
import { func } from "prop-types";
import { Action } from "interviewjs-styleguide";

const NvmActions = (props) => [
  <Action
    fixed
    key="neverMind"
    onClick={() => props.updateHistory("nvm", "Nevermind")}
    primary
  >
    {props.LANG.chatNVM}
  </Action>
];

NvmActions.propTypes = {
  updateHistory: func.isRequired
};

export default NvmActions;
