import { bool, func, shape } from "prop-types";
import React, { Component, Fragment } from "react";
import styled from "styled-components";

import {
  Icon,
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
      contextualMenuUnderstood,
      dragAndDropUnderstood,
      ExploreActionExplained,
      hasContinueActionToggled,
      hascontinueActionValue,
      hasExploreActionToggled,
      hasIntervieweeBubble,
      hasIntervieweeDraft,
      hasTranscript,
      hasUserBubble,
      intervieweeDraftLooksGood,
      userDraftLooksGood
    } = nextProps.conditions;

    const { storyline } = nextProps;

    const lastItem = storyline[storyline.length - 1];
    const lastRole = lastItem ? lastItem.role : null;

    const storylineEmpty = storyline.length === 0;

    const getStepIndex = () => {
      // 0 - does not have transcript
      if (!hasTranscript && storylineEmpty && !intervieweeDraftLooksGood) {
        return 0;
      }
      // 1 - has transcript, does not have selection
      else if (
        hasTranscript &&
        storylineEmpty &&
        !hasIntervieweeDraft &&
        !intervieweeDraftLooksGood
      ) {
        return 1;
      }
      // 2 - has selection
      else if (
        hasTranscript &&
        storylineEmpty &&
        hasIntervieweeDraft &&
        !intervieweeDraftLooksGood
      ) {
        return 2;
      }
      // 3 - has selection and `looks good`
      else if (
        hasTranscript &&
        storylineEmpty &&
        hasIntervieweeDraft &&
        intervieweeDraftLooksGood &&
        !hasContinueActionToggled
      ) {
        return 3;
      }
      // 4 - has 1st action toggled
      else if (
        intervieweeDraftLooksGood &&
        hasContinueActionToggled &&
        !hascontinueActionValue
      ) {
        return 4;
      }
      // 5 - has 1st action toggled and value set
      else if (
        intervieweeDraftLooksGood &&
        hasContinueActionToggled &&
        hascontinueActionValue &&
        !hasExploreActionToggled &&
        !ExploreActionExplained
      ) {
        return 5;
      }
      // 6 - has 1st action toggled and value set and `gotcha` or has 2nd action toggled and value set
      else if (ExploreActionExplained && !userDraftLooksGood) {
        return 6;
      }
      // 7 - has at least 1 action toggled and value set and `looks good`
      else if (userDraftLooksGood && !hasUserBubble) {
        return 7;
      }
      // 8 - has one storyline item that is of role 'user'
      else if (hasUserBubble && storyline.length === 1 && lastRole === "user") {
        return 8;
      }
      // 9 - the last storyline item is `interviewee`
      else if (
        hasIntervieweeBubble &&
        lastRole === "interviewee" &&
        !dragAndDropUnderstood
      ) {
        return 9;
      }
      // 10 - has user bubble, an interviewee bubble and the last `gotcha`
      else if (dragAndDropUnderstood && !contextualMenuUnderstood) {
        return 10;
      }
      // 11 - has user bubble, an interviewee bubble and another `gotcha`
      else if (contextualMenuUnderstood) {
        return 11;
      }
      return nextState.stepIndex;
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
    if (stepIndex === 11) {
      this.props.setCondition("tourOver", true);
      this.props.disableTourForThisStory();
    }
    this.setState({ stepIndex });
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
    const steps = [
      {
        // 0
        content: (
          <Fragment>
            <TourText>
              Paste text into transcript (not verbatim quote).
            </TourText>
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
            <TourAction
              onClick={() => {
                this.advanceTour(3);
                this.props.setCondition("intervieweeDraftLooksGood", true);
              }}
            >
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
            <TourText>
              You can give the end-user a choice between two questions—you’ll
              need one answer each! Left action will point to the first
              following interviewee message, right action will fast forward to
              the second following interviewee message.
            </TourText>
            <TourAction
              onClick={() => {
                this.advanceTour(5);
                this.props.setCondition("ExploreActionExplained", true);
              }}
            >
              Got it
            </TourAction>
          </Fragment>
        ),
        target: ".jr-step-05",
        placement: "left",
        disableBeacon: true
      },
      {
        // 6
        content: (
          <Fragment>
            <TourText>Double-check scripted user actions here.</TourText>
            <TourAction
              onClick={() => {
                this.advanceTour(7);
                this.props.setCondition("userDraftLooksGood", true);
              }}
            >
              Looking good
            </TourAction>
          </Fragment>
        ),
        target: ".jr-step-06",
        placement: "top",
        disableBeacon: true
      },
      {
        // 7
        content: (
          <Fragment>
            <TourText>Add scripted user actions to the storyline.</TourText>
          </Fragment>
        ),
        target: ".jr-step-07",
        placement: "left",
        disableBeacon: true
      },
      {
        // 8
        content: (
          <Fragment>
            <TourText>Add previously selected quote to the storyline.</TourText>
          </Fragment>
        ),
        title: "",
        target: ".jr-step-08",
        placement: "right",
        disableBeacon: true
      },
      {
        // 9
        content: (
          <Fragment>
            <TourText>
              Interviewee messages and user actions will show up here as you add
              them. You can drag and drop to rearrange them.
            </TourText>
            <TourAction
              onClick={() => {
                this.props.setCondition("dragAndDropUnderstood", true);
                this.advanceTour(9);
              }}
            >
              Gotcha
            </TourAction>
          </Fragment>
        ),
        target: ".jr-step-09",
        placement: "right",
        disableBeacon: true
      },
      {
        // 10
        content: (
          <Fragment>
            <TourText>
              Edit or delete any storyline item via contextual menu (
              <Icon name="hdots" />) available when hovering over messages with
              your mouse cursor.
            </TourText>
            <TourAction
              onClick={() => {
                this.advanceTour(10);
                this.props.setCondition("contextualMenuUnderstood", true);
              }}
            >
              Gotcha
            </TourAction>
          </Fragment>
        ),
        target: ".jr-step-10",
        placement: "left",
        disableBeacon: true
      },
      {
        // 11
        content: (
          <Fragment>
            <TourText>Enjoy creating your story!</TourText>
            <TourAction onClick={() => this.setState({ run: false })}>
              Ok!
            </TourAction>
          </Fragment>
        ),
        target: ".jr-step-11",
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
  disableTourForThisStory: func.isRequired,
  conditions: shape({
    hasIntervieweeDraft: bool,
    hasTranscript: bool,
    hasUserDraft: bool,
    isLastBubbleInterviewees: bool,
    isLastBubbleUsers: bool
  }).isRequired
};

ReactiveHelp.defaultProps = {};
