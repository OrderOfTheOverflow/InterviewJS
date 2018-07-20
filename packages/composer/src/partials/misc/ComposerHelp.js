import { bool, shape } from "prop-types";
import React, { Component, Fragment } from "react";
import styled from "styled-components";

import {
  Tour,
  color,
  font,
  radius,
  setSpace,
  setType
} from "interviewjs-styleguide";

const TourText = styled.h2`
  ${setSpace("pan")};
  ${setSpace("mbm")};
  ${setSpace("mtn")};
  ${setType("x")};
  color: ${color.white};
  font-family: ${font.serif};
`;
const TourAction = styled.button`
  ${setSpace("mbn")};
  ${setSpace("phs")};
  ${setSpace("pvx")};
  ${setType("x")};
  background: ${color.white};
  cursor: pointer;
  border-radius: ${radius.a};
  border: 1px solid ${color.white};
  box-shadow: none;
  color: ${color.greenHD};
  font-family: ${font.serif};
  outline: none;
`;

export default class ReactiveHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      run: false,
      stepIndex: 0
    };
    this.evalConditions = this.evalConditions.bind(this);
    this.advanceTour = this.advanceTour.bind(this);
  }

  componentDidMount() {
    setTimeout(this.evalConditions, 2000);
  }

  advanceTour() {
    console.log("advancing tour");

    const { stepIndex } = this.state;
    const {
      hasTranscript,
      hasIntervieweeDraft,
      hasUserDraft,
      isLastBubbleUsers,
      isLastBubbleInterviewees
    } = this.props.conditions;

    console.log({ stepIndex });
    console.log({ hasTranscript });
    console.log({ hasIntervieweeDraft });

    switch (stepIndex) {
      case 0:
        return hasTranscript ? this.setState({ stepIndex: 1 }) : null;
      case 1:
        return hasIntervieweeDraft ? this.setState({ stepIndex: 2 }) : null;
      case 2:
        return this.setState({ stepIndex: 3 });
      case 3:
        return hasUserDraft ? this.setState({ stepIndex: 4 }) : null;
      default:
        return null;
    }
  }

  evalConditions() {
    const {
      hasTranscript,
      hasIntervieweeDraft,
      hasUserDraft,
      isLastBubbleUsers,
      isLastBubbleInterviewees
    } = this.props.conditions;

    console.group("Eval conditions");
    console.log(this.props.conditions);
    console.groupEnd();

    const ruleset0 = !hasTranscript;
    const ruleset1 = hasTranscript && !hasIntervieweeDraft;
    const ruleset2 = hasTranscript && hasIntervieweeDraft;
    const ruleset3 = ruleset1 && hasIntervieweeDraft;
    const ruleset4 = ruleset3 && !hasUserDraft;
    const ruleset5 = ruleset3 && hasUserDraft;
    const ruleset6 = ruleset4 && isLastBubbleUsers;
    const ruleset7 = isLastBubbleInterviewees;
    // const ruleset8 = ruleset4 && conditions.isLastBubbleUsers;

    if (ruleset0) {
      this.setState({ run: true, stepIndex: 0 });
    } else if (ruleset1) {
      this.setState({ run: true, stepIndex: 1 });
    } else if (ruleset2) {
      this.setState({ run: true, stepIndex: 2 });
    } else if (ruleset3) {
      this.setState({ run: true, stepIndex: 3 });
    } else if (ruleset4) {
      this.setState({ run: true, stepIndex: 4 });
    } else if (ruleset5) {
      this.setState({ run: true, stepIndex: 5 });
    } else if (ruleset6) {
      this.setState({ run: true, stepIndex: 6 });
    } else if (ruleset7) {
      this.setState({ run: true, stepIndex: 7 });
    }
    return null;
  }

  render() {
    const { stepIndex, run } = this.state;

    const steps = [
      {
        // 0
        content: (
          <Fragment>
            <TourText>
              Paste or type in your interview transcript here.
            </TourText>
            {/* <TourAction onClick={this.advanceTour}>Next</TourAction> */}
          </Fragment>
        ),
        target: ".jr-step-00",
        placement: "right",
        disableBeacon: true
      },
      {
        // 1
        content: (
          <Fragment>
            <TourText>
              Select some text to highlight a meaningful quote.
            </TourText>
            {/* <TourAction onClick={this.advanceTour}>Got it</TourAction> */}
          </Fragment>
        ),
        target: ".jr-step-01",
        placement: "right-start",
        disableBeacon: true
      },
      {
        // 2
        content: (
          <Fragment>
            <TourText>You can preview and clean up your quotes here.</TourText>
            <TourAction onClick={this.advanceTour}>Looking good</TourAction>
          </Fragment>
        ),
        target: ".jr-step-02",
        placement: "top",
        disableBeacon: true
      },
      {
        // 3
        content: (
          <Fragment>
            <TourText>Script a question leading to selected quote.</TourText>
            {/* <TourAction onClick={this.advanceTour}>Done</TourAction> */}
          </Fragment>
        ),
        target: ".jr-step-03",
        placement: "left",
        disableBeacon: true
      },
      {
        // 4
        content: (
          <Fragment>
            <TourText>Go ahead, type in or select an suggestion here</TourText>
            <TourAction onClick={this.advanceTour}>Done</TourAction>
          </Fragment>
        ),
        target: ".jr-step-04",
        placement: "left",
        disableBeacon: true
      },
      {
        // 5
        content: (
          <Fragment>
            <TourText>Double-check scripted user actions here.</TourText>
            <TourAction onClick={this.advanceTour}>Looking good</TourAction>
          </Fragment>
        ),
        target: ".jr-step-05",
        placement: "top",
        disableBeacon: true
      },
      {
        // 6
        content: (
          <Fragment>
            <TourText>Add scripted user actions to the storyline.</TourText>
            <TourAction onClick={this.advanceTour}>Done</TourAction>
          </Fragment>
        ),
        target: ".jr-step-06",
        placement: "left",
        disableBeacon: true
      },
      {
        // 7
        content: (
          <Fragment>
            <TourText>Add previously selected quote to the storyline.</TourText>
            <TourAction onClick={this.advanceTour}>Done</TourAction>
          </Fragment>
        ),
        title: "",
        target: ".jr-step-07",
        placement: "right",
        disableBeacon: true
      },
      {
        // 8
        content: (
          <Fragment>
            <TourText>
              Interviewee bubbles and user actions will show up here as you add
              them.
            </TourText>
            <TourAction onClick={this.advanceTour}>Gotcha</TourAction>
          </Fragment>
        ),
        target: ".jr-step-08",
        placement: "right",
        disableBeacon: true
      },
      {
        // 9
        content: (
          <Fragment>
            <TourText>Enjoy creating your story!</TourText>
            <TourAction onClick={this.advanceTour}>Thanks</TourAction>
          </Fragment>
        ),
        target: ".jr-step-09",
        placement: "center",
        disableBeacon: true
      }
    ];

    return (
      <Tour
        continuous={false}
        disableCloseOnEsc
        disableOverlay={false}
        disableOverlayClose
        hideBackButton={false}
        locale={{
          back: "Back",
          close: "Done",
          last: "Last",
          next: "Done!"
        }}
        run={run}
        showProgress={false}
        showSkipButton={false}
        spotlightClicks
        steps={steps}
        stepIndex={stepIndex}
      />
    );
  }
}

ReactiveHelp.propTypes = {
  conditions: shape({
    hasIntervieweeDraft: bool,
    hasTranscript: bool,
    hasUserDraft: bool,
    isLastBubbleInterviewees: bool,
    isLastBubbleUsers: bool
  }).isRequired
};

ReactiveHelp.defaultProps = {};
