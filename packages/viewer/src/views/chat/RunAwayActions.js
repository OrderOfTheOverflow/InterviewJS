/* eslint react/forbid-prop-types: 0 */
import React from "react";
import { bool, func, object } from "prop-types";
import { Icon, Tiles, Tile, color } from "interviewjs-styleguide";

const RunAwayActions = (props) => (
  <Tiles force={3}>
    {props.isSwitchPossible ? (
      <Tile
        onClick={() => props.updateHistory("switchTo")}
        style={{ minWidth: "140px" }}
      >
        <Icon name="users" size="l" /> <div>{props.LANG.chatChangeSpeaker}</div>
      </Tile>
    ) : null}
    <Tile onClick={props.resetHistory} style={{ minWidth: "140px" }}>
      <Icon name="replayconv" size="l" />{" "}
      <div>{props.LANG.chatResetHistory}</div>
    </Tile>
    <Tile
      paint={color.redM}
      onClick={() => props.navigateAway(`/${props.story.id}/outro`)}
      style={{ minWidth: "140px" }}
    >
      <Icon name="exit" size="l" /> <div>{props.LANG.chatQuit}</div>
    </Tile>
  </Tiles>
);

RunAwayActions.propTypes = {
  isSwitchPossible: bool.isRequired,
  LANG: object.isRequired,
  navigateAway: func.isRequired,
  resetHistory: func.isRequired,
  story: object,
  updateHistory: func.isRequired
};

export default RunAwayActions;
