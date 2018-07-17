import {} from "prop-types";
import React, { Component } from "react";

import { Tour } from "interviewjs-styleguide";

export default class ReactiveHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      run: localStorage.getItem("joyride") !== "false",
      steps: [
        {
          title: "A title",
          content: "This if my awesome feature!",
          target: ".jr-step-01",
          placement: "right",
          disableBeacon: true
        }
      ]
    };
    this.callback = this.callback.bind(this);
  }

  callback = (data) => {
    // const { action, index, type } = data;
    console.group("Joyride bitch!");
    console.log(data);
    console.groupEnd();
  };

  render() {
    const { state, props } = this;
    const { steps, run } = state;
    console.group("Joyride Bitch");
    console.log(state);
    console.log(props);
    console.groupEnd();

    return (
      <Tour
        callback={this.callback}
        continuous={false}
        debug
        disableCloseonEsc={false}
        disableOverlay={false}
        disableOverlayClose
        hideBackButton={false}
        locale={{
          back: "Go back",
          close: "Thanks!",
          last: "last",
          next: "Done!"
        }}
        run={run}
        steps={steps}
        scrollOffset={20}
        scrollToFirstStep={false}
        showProgress={false}
        showSkipButton={false}
        spotlightClicks
        stepIndex={0}
      />
    );
  }
}

ReactiveHelp.propTypes = {};

ReactiveHelp.defaultProps = {};
