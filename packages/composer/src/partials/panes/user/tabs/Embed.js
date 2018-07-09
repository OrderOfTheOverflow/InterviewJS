import {} from "prop-types";
import React, { Component } from "react";

import { Container } from "interviewjs-styleguide";

export default class EmbedTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Container padded>Hello Embed Tab</Container>;
  }
}

EmbedTab.propTypes = {};

EmbedTab.defaultProps = {};
