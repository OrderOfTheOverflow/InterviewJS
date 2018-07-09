import { array, bool, func, oneOfType, node, string } from "prop-types";
import React, { Component, Fragment } from "react";
import styled from "styled-components";

import { Icon, PaneTabs, PaneTab, radius } from "interviewjs-styleguide";
import { Text, Link, Image, Media, Embed, Map } from "./tabs";

import { GLOBALS, USER_ACTIONS } from "../../../options";

const ActionEditEl = styled.div`
  border-radius: ${radius.l} ${radius.l} ${radius.n} ${radius.n};
  overflow: hidden;
  width: 100%;

  ${({ isActive }) =>
    !isActive
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
    const { children, isActive, activeTab, switchTab } = this.props;
    const renderTabs = () => {
      switch (activeTab) {
        case "link":
          return <Link />;
        case "image":
          return <Image />;
        case "media":
          return <Media />;
        case "embed":
          return <Embed />;
        case "map":
          return <Map />;
        default:
        case "text":
          return <Text />;
      }
    };

    const getUnlockedContent = () => (
      <Fragment>
        <PaneTabs>
          <PaneTab
            active={activeTab === "text"}
            onClick={() => switchTab("text")}
          >
            <Icon name="text" size="x" />
          </PaneTab>
          <PaneTab
            active={activeTab === "link"}
            onClick={() => switchTab("link")}
          >
            <Icon name="link" size="x" />
          </PaneTab>
          <PaneTab
            active={activeTab === "image"}
            onClick={() => switchTab("image")}
          >
            <Icon name="image" size="x" />
          </PaneTab>
          <PaneTab
            active={activeTab === "embed"}
            onClick={() => switchTab("embed")}
          >
            <Icon name="embed" size="x" />
          </PaneTab>
          <PaneTab
            active={activeTab === "map"}
            onClick={() => switchTab("map")}
          >
            <Icon name="map" size="x" />
          </PaneTab>
          <PaneTab
            active={activeTab === "media"}
            onClick={() => switchTab("media")}
          >
            <Icon name="media" size="x" />
          </PaneTab>
        </PaneTabs>
        {renderTabs()}
      </Fragment>
    );
    return (
      <ActionEditEl {...this.props}>
        {!isActive
          ? children
          : getUnlockedContent() /* TODO: INVERT IF CLAUSE */}
      </ActionEditEl>
    );
  }
}

ActionEdit.propTypes = {
  activeTab: string,
  children: oneOfType([array, string, node]).isRequired,
  isActive: bool,
  switchTab: func.isRequired
};

ActionEdit.defaultProps = {
  activeTab: "text",
  isActive: true
};
