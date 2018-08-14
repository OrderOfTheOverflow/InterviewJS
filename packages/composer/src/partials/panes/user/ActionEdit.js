import { array, bool, func, oneOfType, node, string } from "prop-types";
import React, { Component, Fragment } from "react";
import styled from "styled-components";

import { Icon, PaneTabs, PaneTab, radius } from "interviewjs-styleguide";
import { Text, Link, Image, Media, Embed, Map } from "./tabs";

const ActionEditEl = styled.div`
  border-radius: ${radius.l} ${radius.l} ${radius.n} ${radius.n};
  position: relative;
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
    width: 100%;
    & > * {
      background: transparent;
      flex-basis: ${100 / 6}%;
    }
    & > *:first-child {
      border-radius: ${radius.l} ${radius.n} ${radius.n};
    }
    & > *:last-child {
      border-radius: ${radius.n} ${radius.l} ${radius.n} ${radius.n};
    }
  }
`;

export default class ActionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { children, isActive, activeMIME, switchMIME } = this.props;
    const renderContent = () => {
      switch (activeMIME) {
        case "link":
          return <Link {...this.props} draft={this.props.draft.link} />;
        case "image":
          return <Image {...this.props} draft={this.props.draft.image} />;
        case "media":
          return <Media {...this.props} draft={this.props.draft.media} />;
        case "embed":
          return <Embed {...this.props} draft={this.props.draft.embed} />;
        case "map":
          return <Map {...this.props} draft={this.props.draft.map} />;
        default:
        case "text":
          return (
            <Text
              {...this.props}
              draft={this.props.draft.text}
              primary={this.props.primary}
            />
          );
      }
    };

    const getUnlockedContent = () => (
      <Fragment>
        <PaneTabs>
          <PaneTab
            active={activeMIME === "text"}
            onClick={() => switchMIME("text")}
          >
            <Icon name="text" size="x" />
          </PaneTab>
          <PaneTab
            active={activeMIME === "link"}
            onClick={() => switchMIME("link")}
          >
            <Icon name="link" size="x" />
          </PaneTab>
          <PaneTab
            active={activeMIME === "image"}
            onClick={() => switchMIME("image")}
          >
            <Icon name="image" size="x" />
          </PaneTab>
          <PaneTab
            active={activeMIME === "embed"}
            onClick={() => switchMIME("embed")}
          >
            <Icon name="embed" size="x" />
          </PaneTab>
          <PaneTab
            active={activeMIME === "map"}
            onClick={() => switchMIME("map")}
          >
            <Icon name="map" size="x" />
          </PaneTab>
          <PaneTab
            active={activeMIME === "media"}
            onClick={() => switchMIME("media")}
          >
            <Icon name="media" size="x" />
          </PaneTab>
        </PaneTabs>
        {renderContent()}
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
  activeMIME: string.isRequired,
  children: oneOfType([array, string, node]).isRequired,
  isActive: bool,
  switchMIME: func.isRequired
};

ActionEdit.defaultProps = {
  isActive: true
};
