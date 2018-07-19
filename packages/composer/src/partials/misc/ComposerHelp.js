import { bool, shape } from "prop-types";
import React, { Component } from "react";

import { Tour } from "interviewjs-styleguide";

const STEPS = [
  {
    // 0
    title: "Paste or type in your interview transcript here.",
    target: ".jr-step-00",
    placement: "right",
    disableBeacon: true,
    locale: {
      close: "Next"
    }
  },
  {
    // 1
    title: "Select some text to highlight a meaningful quote.",
    target: ".jr-step-01",
    placement: "right-start",
    disableBeacon: true,
    locale: {
      close: "Got it"
    }
  },
  {
    // 2
    title: "You can preview and clean up that quote here",
    target: ".jr-step-02",
    placement: "top",
    disableBeacon: true,
    locale: {
      close: "Looking good"
    }
  },
  {
    // 3
    title: "Script a question leading to selected quote.",
    target: ".jr-step-03",
    placement: "left",
    disableBeacon: true,
    locale: {
      close: "Done"
    }
  },
  {
    // 4
    title: "Double-check scripted user actions here.",
    target: ".jr-step-04",
    placement: "top",
    disableBeacon: true,
    locale: {
      close: "Looking good"
    }
  },
  {
    // 5
    title: "Add scripted user actions to the storyline.",
    target: ".jr-step-05",
    placement: "left",
    disableBeacon: true,
    locale: {
      close: "Done"
    }
  },
  {
    // 6
    title: "Add previously selected quote to the storyline.",
    target: ".jr-step-06",
    placement: "right",
    disableBeacon: true,
    locale: {
      close: "Done"
    }
  },
  {
    // 7
    title:
      "Interviewee bubbles and user actions will show up here as you add them.",
    target: ".jr-step-07",
    placement: "right",
    disableBeacon: true,
    locale: {
      close: "Gotcha"
    }
  },
  {
    // 8
    title: "Enjoy creating your story!",
    target: ".jr-step-08",
    placement: "center",
    disableBeacon: true,
    locale: {
      close: "Thanks"
    }
  }
];

export default class ReactiveHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      run: false,
      stepIndex: 0,
      steps: STEPS
    };
    this.evalConditions = this.evalConditions.bind(this);
  }

  componentDidMount() {
    setTimeout(this.evalConditions, 2000);
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
    const { stepIndex, steps, run } = this.state;
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
