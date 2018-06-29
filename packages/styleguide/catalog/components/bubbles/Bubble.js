import React, { Component } from "react";
import { array, bool, number, object, oneOfType, string } from "prop-types";

import { Preloader } from "../";
import SpeakerBubble from "./SpeakerBubble";
import SystemBubble from "./SystemBubble";
import UserBubble from "./UserBubble";
import BubbleHTMLWrapper from "./BubbleHTMLWrapper";

export default class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: this.props.loading, rendering: true };
  }
  componentDidMount() {
    this.preloaderTimer = setTimeout(() => {
      this.setState({ loading: false });
    }, this.props.delay + 1500);
    this.renderTimeout = setTimeout(() => {
      this.setState({ rendering: false });
    }, this.props.delay);
  }
  componentWillUnmount() {
    clearTimeout(this.renderTimeout);
    clearTimeout(this.preloaderTimer);
  }
  render() {
    const { loading, rendering } = this.state;
    const { animated, children, persona, displayType } = this.props;
    setTimeout(() => {}, 1000);
    if (persona === "user") {
      if (!rendering) {
        return (
          <UserBubble {...this.props}>
            <BubbleHTMLWrapper displayType={displayType}>
              {children}
            </BubbleHTMLWrapper>
          </UserBubble>
        );
      }
      return null;
    } else if (persona === "interviewee") {
      if (!rendering) {
        return (
          <SpeakerBubble {...this.props}>
            {animated && loading ? (
              <Preloader />
            ) : (
              <BubbleHTMLWrapper displayType={displayType}>
                {children}
              </BubbleHTMLWrapper>
            )}
          </SpeakerBubble>
        );
      }
      return null;
    }
    if (!rendering) {
      return (
        <SystemBubble {...this.props}>
          {animated && loading ? (
            <Preloader />
          ) : (
            <BubbleHTMLWrapper>{children}</BubbleHTMLWrapper>
          )}
        </SystemBubble>
      );
    }
    return null;
  }
}

Bubble.propTypes = {
  animated: bool,
  children: oneOfType([array, object, string]),
  delay: number,
  displayType: string,
  loading: bool,
  persona: string
};

Bubble.defaultProps = {
  animated: false,
  children: null,
  delay: 0,
  displayType: "plain",
  loading: true,
  persona: null
};
