import { func } from "prop-types";
import React, { Component } from "react";

import {
  Container,
  FormItem,
  Label,
  Legend,
  Separator,
  TextInput
} from "interviewjs-styleguide";

export default class LinkTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draft: this.props.draft
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    const draft = {
      ...this.state.draft,
      [name]: value
    };
    this.setState({ draft }, () =>
      this.props.updateDraft("link", this.state.draft)
    );
  };
  render() {
    const { value, title } = this.state.draft;
    return (
      <Container padded>
        <FormItem>
          <Label>Link URL</Label>
          <TextInput
            input
            name="value"
            onChange={(e) => this.handleChange(e)}
            placeholder="Select and paste URL e.g. http://… or www.…"
            required
            type="url"
            value={value}
          />
          <Legend tip="Select and paste URL e.g. http:// ... or www. ... ">
            i
          </Legend>
        </FormItem>
        <Separator silent size="s" />
        <FormItem>
          <Label>Display text (optional)</Label>
          <TextInput
            input
            name="title"
            onChange={(e) => this.handleChange(e)}
            placeholder="Type the text to be hyperlinked"
            value={title}
          />
          <Legend tip="Type the text to be hyperlinked">i</Legend>
        </FormItem>
      </Container>
    );
  }
}

LinkTab.propTypes = {
  updateDraft: func.isRequired
};

LinkTab.defaultProps = {};
