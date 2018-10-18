import { func } from "prop-types";
import React, { Component } from "react";

import {
  Container,
  FormItem,
  Label,
  Legend,
  TextInput
} from "interviewjs-styleguide";

import { filterIframe } from "../../../../util/IframeSanitizer";

export default class MapTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    const clean = filterIframe(value);

    const draft = {
      ...this.props.draft,
      [name]: value
    };

    if (
      clean.toLowerCase().startsWith("<iframe") &&
      clean.toLowerCase().includes("src=") &&
      clean.toLowerCase().includes("google.com/maps") &&
      clean.toLowerCase().endsWith("></iframe>")
    ) {
      this.props.updateDraft("map", draft);
    }
    return console.log("code not valid");
  };
  render() {
    const { value } = this.props.draft;
    return (
      <Container padded>
        <FormItem>
          <Label>Embed map</Label>
          <TextInput
            area
            name="value"
            onChange={(e) => this.handleChange(e)}
            placeholder="Insert an iframe to embed a Google Map directly into your chat"
            required
            rows={5}
            type="url"
            value={value}
          />
          <Legend tip="Choose a location on Google Maps to access the iframe code. Select the share button and click the “embed map” option. Then copy and paste.">
            i
          </Legend>
        </FormItem>
      </Container>
    );
  }
}

MapTab.propTypes = {
  updateDraft: func.isRequired
};

MapTab.defaultProps = {};
