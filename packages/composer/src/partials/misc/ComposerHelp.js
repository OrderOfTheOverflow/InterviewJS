// import { object } from "prop-types";
import React, { Component } from "react";

import { Tour } from "interviewjs-styleguide";

const STEPS = [
  {
    // 0
    title: "Paste or type in your interview transcript here.",
    target: ".jr-step-00",
    placement: "right",
    disableBeacon: true,
    showSkipButton: false,
    locale: {
      close: "Done!"
    }
  },
  {
    // 1
    title: "Now select a meaningful quote.",
    target: ".jr-step-01",
    placement: "right-start",
    disableBeacon: true,
    showSkipButton: false,
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
    showSkipButton: false,
    locale: {
      close: "Looking good"
    }
  },
  {
    // 3
    title: "Now script a question leading to selected quote.",
    target: ".jr-step-03",
    placement: "left",
    disableBeacon: true,
    showSkipButton: false,
    locale: {
      close: "Done!"
    }
  },
  {
    // 4
    title: "You can preview those user actions here.",
    target: ".jr-step-04",
    placement: "top",
    disableBeacon: true,
    showSkipButton: false,
    locale: {
      close: "Nice!"
    }
  },
  {
    // 5
    title: "Now add them to the storyline.",
    target: ".jr-step-05",
    placement: "left",
    disableBeacon: true,
    showSkipButton: false,
    locale: {
      close: "Done!"
    }
  },
  {
    // 6
    title: "You can now add previously selected quote to the storyline.",
    target: ".jr-step-06",
    placement: "right",
    disableBeacon: true,
    showSkipButton: false,
    locale: {
      close: "Great!"
    }
  },
  {
    // 7
    title:
      "Interviewee bubbles and user actions will show up here as you add them.",
    target: ".jr-step-07",
    placement: "right",
    disableBeacon: true,
    showSkipButton: false,
    locale: {
      close: "Got it"
    }
  },
  {
    // 8
    title: "Enjoy creating your story!",
    target: ".jr-step-08",
    placement: "center",
    disableBeacon: true,
    showSkipButton: false,
    locale: {
      close: "Thanks"
    }
  }
];

export default class ReactiveHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      run: true,
      // stepIndex: 0,
      steps: STEPS
    };
    // this.callback = this.callback.bind(this);
    // this.ctrlTour = this.ctrlTour.bind(this);
    // this.evalConditions = this.evalConditions.bind(this);
  }

  // componentDidMount() {
  //   this.evalConditions(this.props.conditions);
  // }

  // evalConditions(conditions) {
  //   console.group("Eval conditions");
  //   console.log(conditions);
  //   console.groupEnd();
  //
  //   const ruleset0 = !conditions.hasTranscript;
  //   const ruleset1 =
  //     conditions.hasTranscript && !conditions.hasIntervieweeDraft;
  //   const ruleset2 = conditions.hasTranscript && conditions.hasIntervieweeDraft;
  //   const ruleset3 = ruleset1 && conditions.hasIntervieweeDraft;
  //   const ruleset4 = ruleset3 && !conditions.hasUserDraft;
  //   const ruleset5 = ruleset3 && conditions.hasUserDraft;
  //   const ruleset6 = ruleset4 && conditions.isLastBubbleUsers;
  //   // const ruleset7 = ruleset4 && conditions.isLastBubbleUsers;
  //   // const ruleset8 = ruleset4 && conditions.isLastBubbleUsers;
  //
  //   if (ruleset0) {
  //     this.setState({ run: true, stepIndex: 0 });
  //   } else if (ruleset1) {
  //     this.setState({ run: true, stepIndex: 1 });
  //   } else if (ruleset2) {
  //     this.setState({ run: true, stepIndex: 2 });
  //   } else if (ruleset3) {
  //     this.setState({ run: true, stepIndex: 3 });
  //   } else if (ruleset4) {
  //     this.setState({ run: true, stepIndex: 4 });
  //   } else if (ruleset5) {
  //     this.setState({ run: true, stepIndex: 5 });
  //   } else if (ruleset6) {
  //     this.setState({ run: true, stepIndex: 6 });
  //   }
  //   return null;
  // }

  // ctrlTour(action: string, target: number) {
  //   switch (action) {
  //     case "stop":
  //       return this.setState({ run: false });
  //     case "start":
  //       return this.setState({ run: true });
  //     case "fwd":
  //       return this.setState({ stepIndex: target });
  //     default:
  //       return null;
  //   }
  // }

  // callback = (data) => {
  //   const { action, index, type } = data;
  //   const { action } = data;
  //   const { stepIndex } = this.state;
  //   const { conditions } = this.props;
  //
  //   console.group("Joyride action, bitch!");
  //   console.log(data);
  //   console.groupEnd();
  //
  //   if (action === "close" && action === "next") {
  //     switch (stepIndex) {
  //       case 0:
  //         return conditions.hasTranscript
  //           ? this.setState({ stepIndex: 1, run: true })
  //           : console.log("doesn’t have a transcript");
  //       case 1:
  //         return console.log("stepIndex: 1");
  //       default:
  //         return null;
  //     }
  //   }
  //
  //   return null;
  //
  //   if (action === "close") {
  //     this.setState({ run: false });
  //   } else if (action === "prev" && this.state.stepIndex < 0) {
  //     this.setState({ stepIndex: this.state.stepIndex - 1 });
  //   }
  // };

  render() {
    // const { stepIndex, steps, run } = this.state;
    const { steps, run } = this.state;

    // console.group("Tour Conditions");
    // console.log(props.conditions);
    // console.groupEnd();

    return (
      <Tour
        // callback={this.callback}
        continuous={false}
        disableCloseOnEsc
        disableOverlayClose
        disableOverlay={false}
        hideBackButton={false}
        locale={{
          back: "Back",
          close: "Done",
          last: "Last",
          next: "Done!"
        }}
        run={run}
        steps={steps}
        showProgress={false}
        showSkipButton
        spotlightClicks
        // stepIndex={stepIndex}
      />
    );
  }
}

ReactiveHelp.propTypes = {
  // conditions: object.isRequired
};

ReactiveHelp.defaultProps = {};
