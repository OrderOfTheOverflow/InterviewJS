import {} from "prop-types";
import React, { Component } from "react";

import { Container } from "interviewjs-styleguide";

export default class MediaTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Container padded>Hello Media Tab</Container>;
  }
}

MediaTab.propTypes = {};

MediaTab.defaultProps = {};
