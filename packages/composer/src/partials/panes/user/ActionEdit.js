import { array, bool, oneOfType, node, string } from "prop-types";
import React, { Component, Fragment } from "react";
import styled from "styled-components";

import { Icon, PaneTabs, PaneTab, radius } from "interviewjs-styleguide";

import { GLOBALS, USER_ACTIONS } from "../../../options";

const ActionEditEl = styled.div`
  border-radius: ${radius.l} ${radius.l} ${radius.n} ${radius.n};
  overflow: hidden;
  width: 100%;

  ${({ locked }) =>
    locked
      ? `
    cursor: pointer;
  `
      : ``};

  ${PaneTabs} {
    background: transparent;
    position: relative;
    top: -1px;
    & > * {
      background: transparent;
      flex-basis: ${100 / 6}%;
    }
  }
`;

export default class ActionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { children, locked } = this.props;
    const getUnlockedContent = () => (
      <Fragment>
        <PaneTabs>
          <PaneTab active>
            <Icon name="text" size="x" />
          </PaneTab>
          <PaneTab>
            <Icon name="link" size="x" />
          </PaneTab>
          <PaneTab>
            <Icon name="image" size="x" />
          </PaneTab>
          <PaneTab>
            <Icon name="embed" size="x" />
          </PaneTab>
          <PaneTab>
            <Icon name="map" size="x" />
          </PaneTab>
          <PaneTab>
            <Icon name="media" size="x" />
          </PaneTab>
        </PaneTabs>
      </Fragment>
    );
    return (
      <ActionEditEl {...this.props}>
        {!locked ? children : getUnlockedContent() /* TODO: INVERT IF CLAUSE */}
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
