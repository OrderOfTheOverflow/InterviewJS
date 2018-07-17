import {} from "prop-types";
import React, { Component } from "react";

import { Tour } from "interviewjs-styleguide";

export default class ReactiveHelp extends Component {
  constructor(props) {
    super(props);

    const { conditions } = this.props;

    const detectStep = () => {
      if (!conditions.hasTranscript) {
        return 0;
      }
      return 1;
    };

    this.state = {
      run: localStorage.getItem("joyride") !== "false",
      steps: [
        {
          title: "A title",
          content: "This if my awesome feature!",
          target: ".jr-step-01",
          placement: "right",
          disableBeacon: true
        },
        {
          title: "A title",
          content: "This if my awesome feature!",
          target: ".jr-step-02",
          placement: "top",
          disableBeacon: true
        }
      ],
      stepIndex: detectStep()
    };
    this.callback = this.callback.bind(this);
  }

  callback = (data) => {
    const { action, index, type } = data;
    console.group("Joyride bitch!");
    console.log(data);
    console.groupEnd();

    if (action === "close") {
      this.setState({ run: false });
    }
  };

  render() {
    const { state, props } = this;
    const { stepIndex, steps, run } = state;

    console.group("It’s Teh Joyride, bitch");
    console.log(state);
    console.log(props);
    console.groupEnd();

    return (
      <Tour
        callback={this.callback}
        continuous={false}
        debug
        disableOverlay={false}
        hideBackButton={false}
        locale={{
          back: "Go back",
          close: "Thanks!",
          last: "Last",
          next: "Done!"
        }}
        run={run}
        steps={steps}
        showProgress={false}
        showSkipButton={false}
        spotlightClicks
        stepIndex={stepIndex}
      />
    );
  }
}

ReactiveHelp.propTypes = {};

ReactiveHelp.defaultProps = {};
