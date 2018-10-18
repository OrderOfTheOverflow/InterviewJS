import { bool, func } from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";

import {
  Action,
  Container,
  Separator,
  color,
  setType
} from "interviewjs-styleguide";
import { ActionEdit } from ".";

const ActionTeaser = styled.h2`
  ${setType("s")};
  color: ${color.greyBlk};
  font-style: italic;
  margin-left: auto;
  margin-right: auto;
  max-width: 200px;
  text-align: center;
`;

export default class SecActionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.unlock = this.unlockAction.bind(this);
  }
  unlockAction(e) {
    const { isActive, toggleAction } = this.props;
    if (e) e.preventDefault();
    if (e) e.stopPropagation();
    return !isActive ? toggleAction() : null;
  }
  render() {
    return (
      <ActionEdit
        {...this.props}
        onClick={(e) => this.unlockAction(e)}
        className="jr-step-05"
      >
        <Container dir="column" style={{ height: "100%" }}>
          <Action secondary fixed onClick={(e) => this.unlockAction(e)}>
            Second choice
          </Action>
          <Separator silent size="s" />
          <ActionTeaser>
            Allow the end reader to choose between two actions
          </ActionTeaser>
        </Container>
      </ActionEdit>
    );
  }
}

SecActionEdit.propTypes = {
  isActive: bool,
  toggleAction: func.isRequired
};

SecActionEdit.defaultProps = {
  isActive: false
};
