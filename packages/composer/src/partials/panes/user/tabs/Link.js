import {} from "prop-types";
import React, { Component } from "react";

import { Container } from "interviewjs-styleguide";

export default class LinkTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Container padded>Hello Link Tab</Container>;
  }
}

LinkTab.propTypes = {};

LinkTab.defaultProps = {};
