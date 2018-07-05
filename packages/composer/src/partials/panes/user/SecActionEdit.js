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
  margin-left: auto;
  margin-right: auto;
  max-width: 200px;
  text-align: center;
`;

export default class SecActionEdit extends Component {
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
            Give choice
          </Action>
          <Separator silent size="s" />
          <ActionTeaser>
            Script two actions to give your end-reader a choice
          </ActionTeaser>
        </Container>
      </ActionEdit>
    );
  }
}

SecActionEdit.propTypes = {};

SecActionEdit.defaultProps = {};
