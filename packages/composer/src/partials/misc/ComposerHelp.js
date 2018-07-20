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
  ${setSpace("man")};
  ${setSpace("pan")};
  ${setType("x")};
  color: ${color.white};
  font-family: ${font.serif};
`;
const TourAction = styled.button`
  ${setSpace("mbn")};
  ${setSpace("mtm")};
  ${setSpace("phs")};
  ${setSpace("pvx")};
  ${setType("x")};
  background: ${color.white};
  border-radius: ${radius.a};
  border: 1px solid ${color.white};
  box-shadow: none;
  color: ${color.greenHD};
  cursor: pointer;
  font-family: ${font.serif};
  outline: none;
`;

export default class ReactiveHelp extends Component {
  static getDerivedStateFromProps(nextProps, nextState) {
    const {
      hasTranscript,
      hasIntervieweeDraft,
      hasUserDraft,
      aboutToHaveUserDraft
    } = nextProps.conditions;

    const { storyline } = nextProps;

    const lastItem = storyline[storyline.length - 1];
    const lastRole = lastItem ? lastItem.role : null;

    const storylineEmpty = storyline.length === 0;

    const getStepIndex = () => {
      const ruleset0 = !hasTranscript && storylineEmpty;
      const ruleset1 = hasTranscript && storylineEmpty && !hasIntervieweeDraft;
      const ruleset2 =
        hasTranscript &&
        storylineEmpty &&
        hasIntervieweeDraft &&
        !aboutToHaveUserDraft;
      const ruleset3 =
        hasTranscript && hasIntervieweeDraft && !aboutToHaveUserDraft;
      const ruleset4 = aboutToHaveUserDraft && !hasUserDraft && storylineEmpty;
      const ruleset5 = aboutToHaveUserDraft && hasUserDraft && storylineEmpty;
      const ruleset6 = aboutToHaveUserDraft && hasUserDraft && storylineEmpty;
      const ruleset7 = !storylineEmpty && lastRole === "user";
      const ruleset8 = !storylineEmpty && lastRole === "interviewee";

      if (ruleset0) {
        return 0;
      } else if (ruleset1) {
        return 1;
      } else if (ruleset2) {
        return 2;
      } else if (ruleset3) {
        return 3;
      } else if (ruleset4) {
        return 4;
      } else if (ruleset5) {
        return 5;
      } else if (ruleset6) {
        return 6;
      } else if (ruleset7) {
        return 7;
      } else if (ruleset8) {
        return 8;
      }
      return 0;
    };

    return {
      ...nextState,
      stepIndex: getStepIndex()
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      run: false,
      stepIndex: 0
    };
    this.startTour = this.startTour.bind(this);
    this.advanceTour = this.advanceTour.bind(this);
  }

  componentDidMount() {
    this.startTour();
  }

  advanceTour(stepIndex) {
    this.setState({ stepIndex });
    //
    // const { stepIndex } = this.state;
    // const {
    //   hasTranscript,
    //   hasIntervieweeDraft,
    //   hasUserDraft,
    //   isLastBubbleUsers,
    //   isLastBubbleInterviewees
    // } = this.props.conditions;
    //
    // console.log({ stepIndex });
    // console.log({ hasTranscript });
    // console.log({ hasIntervieweeDraft });
    //
    // switch (stepIndex) {
    //   case 0:
    //     return hasTranscript ? this.setState({ stepIndex: 1 }) : null;
    //   case 1:
    //     return hasIntervieweeDraft ? this.setState({ stepIndex: 2 }) : null;
    //   case 2:
    //     return this.setState({ stepIndex: 3 });
    //   case 3:
    //     return hasUserDraft ? this.setState({ stepIndex: 4 }) : null;
    //   case 4:
    //     return hasUserDraft ? this.setState({ stepIndex: 5 }) : null;
    //   case 5:
    //     return hasUserDraft ? this.setState({ stepIndex: 6 }) : null;
    //   default:
    //     return null;
    // }
  }

  startTour() {
    const { hasTranscript, storylineEmpty } = this.props.conditions;
    if (!hasTranscript && storylineEmpty) {
      this.setState({ run: true, stepIndex: 0 });
    } else if (hasTranscript && storylineEmpty) {
      this.setState({ run: true, stepIndex: 1 });
    }
    return null;
  }

  render() {
    const { stepIndex, run } = this.state;

    console.group("Tour conditions");
    console.log(this.state);
    console.log(this.props.conditions);
    console.groupEnd();

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
            <TourAction onClick={() => this.advanceTour(3)}>
              Looking good
            </TourAction>
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
            <TourText>Go ahead, type in or select a user action.</TourText>
            <TourAction onClick={() => this.advanceTour(5)}>Done</TourAction>
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
            <TourAction onClick={() => this.advanceTour(6)}>
              Looking good
            </TourAction>
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
            <TourText>Add scripted user action to the storyline.</TourText>
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
            <TourAction onClick={() => this.advanceTour(9)}>Gotcha</TourAction>
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
            <TourAction onClick={() => this.setState({ run: false })}>
              Thanks!
            </TourAction>
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
