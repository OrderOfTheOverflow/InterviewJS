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

export default class EmbedTab extends Component {
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
      clean.toLowerCase().endsWith("></iframe>")
    ) {
      this.props.updateDraft("embed", draft);
    }
    return console.log("code not valid");
  };
  render() {
    const { value } = this.props.draft;
    return (
      <Container padded>
        <FormItem>
          <Label>Embed iframe</Label>
          <TextInput
            area
            name="value"
            onChange={(e) => this.handleChange(e)}
            placeholder="Insert an iframe to display web content directly into your chat"
            required
            rows={5}
            type="url"
            value={value}
          />
          <Legend tip="Insert an iframe to display web content directly in your chat. Click the share icon to see if an ‘embed code’ is available. Then copy and paste.">
            i
          </Legend>
        </FormItem>
      </Container>
    );
  }
}

EmbedTab.propTypes = {
  updateDraft: func.isRequired
};

EmbedTab.defaultProps = {};
