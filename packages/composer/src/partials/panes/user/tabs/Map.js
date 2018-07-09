import {} from "prop-types";
import React, { Component } from "react";

import { Container } from "interviewjs-styleguide";

export default class MapTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Container padded>Hello Map Tab</Container>;
  }
}

MapTab.propTypes = {};

MapTab.defaultProps = {};
