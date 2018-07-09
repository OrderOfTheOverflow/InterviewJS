import {} from "prop-types";
import React, { Component } from "react";

import { Container } from "interviewjs-styleguide";

export default class ImageTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Container padded>Hello Image Tab</Container>;
  }
}

ImageTab.propTypes = {};

ImageTab.defaultProps = {};
