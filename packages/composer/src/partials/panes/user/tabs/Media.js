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

export default class MediaTab extends Component {
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
      clean.toLowerCase().includes("youtube.com/embed/") &&
      clean.toLowerCase().endsWith("></iframe>")
    ) {
      this.props.updateDraft("media", draft);
    }
    return console.log("code not valid");
  };
  render() {
    const { value } = this.props.draft;
    return (
      <Container padded>
        <FormItem>
          <Label>Embed video</Label>
          <TextInput
            area
            name="value"
            onChange={(e) => this.handleChange(e)}
            placeholder="Insert an iframe to embed a video directly into your chat"
            required
            rows={5}
            type="url"
            value={value}
          />
          <Legend tip="To access the iframe code go to the share icon for a video e.g. Youtube or Vimeo. Select the share button and click the “embed” option. Then copy and paste.">
            i
          </Legend>
        </FormItem>
      </Container>
    );
  }
}

MediaTab.propTypes = {
  updateDraft: func.isRequired
};

MediaTab.defaultProps = {};
