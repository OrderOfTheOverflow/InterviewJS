import {} from "prop-types";
import React, { Component, Fragment } from "react";
import Select from "react-select";

import {} from "interviewjs-styleguide";
import { GLOBALS, USER_ACTIONS } from "../../../../options";

export default class TextTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        Hello Text Tab
        <Select options={USER_ACTIONS} />
      </Fragment>
    );
  }
}

TextTab.propTypes = {};

TextTab.defaultProps = {};
