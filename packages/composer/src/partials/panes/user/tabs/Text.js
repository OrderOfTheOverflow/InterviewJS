import {} from "prop-types";
import React, { Component } from "react";
import Select from "react-select";

import { Container } from "interviewjs-styleguide";
import { GLOBALS, USER_ACTIONS } from "../../../../options";

export default class TextTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container padded>
        Hello Text Tab
        <Select options={USER_ACTIONS} />
      </Container>
    );
  }
}

TextTab.propTypes = {};

TextTab.defaultProps = {};
