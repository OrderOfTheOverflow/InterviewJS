import {} from "prop-types";
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

export default class PriActionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { locked: true };
    this.toggleLock = this.toggleLock.bind(this);
  }
  toggleLock() {
    this.setState({ locked: !this.state.locked });
  }
  render() {
    const { locked } = this.state;
    return (
      <ActionEdit locked={locked} onClick={locked ? this.toggleLock : null}>
        <Container dir="column" style={{ height: "100%" }}>
          <Action secondary fixed onClick={this.toggleLock}>
            Create an action
          </Action>
          <Separator silent size="s" />
          <ActionTeaser>
            Give your end-reader a way to interact with the interviewee
          </ActionTeaser>
        </Container>
      </ActionEdit>
    );
  }
}

PriActionEdit.propTypes = {};

PriActionEdit.defaultProps = {};
