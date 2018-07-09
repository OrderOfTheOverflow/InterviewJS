import { array, bool, oneOfType, node, string } from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";

import {} from "interviewjs-styleguide";

import { GLOBALS, USER_ACTIONS } from "../../../options";

const ActionEditEl = styled.div`
  ${({ locked }) =>
    locked
      ? `
    cursor: pointer;
  `
      : ``};
`;

export default class ActionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { children, locked } = this.props;
    const getUnlockedContent = () => <div>Unlocked</div>;
    return (
      <ActionEditEl {...this.props}>
        {locked ? children : getUnlockedContent()}
      </ActionEditEl>
    );
  }
}

ActionEdit.propTypes = {
  children: oneOfType([array, string, node]).isRequired,
  locked: bool
};

ActionEdit.defaultProps = {
  locked: true
};
