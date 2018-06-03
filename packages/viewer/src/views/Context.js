/* eslint react/forbid-prop-types: 0 */
import css from "styled-components";
import React, { Component } from "react";
import { object, shape, string, func } from "prop-types";
import axios from "axios";

import {
  Action,
  Actionbar,
  PageParagraph,
  PageSubtitle,
  Separator,
  color
} from "interviewjs-styleguide";

import {
  Cover,
  Page,
  PageBody,
  PageHead,
  StoryDetailsModal,
  Topbar
} from "../partials";

import LOCALES from "../locales";

const Aside = css(PageParagraph)`
  color: ${color.flareHD};
`;

export default class ContextView extends Component {
  constructor(props) {
    super(props);
    this.state = { storyDetailsModal: false };
    this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
  }

  componentDidMount() {
    // I'm framed, wait for message with JSON that looks like a story -- FIXME
    if (window.top !== window && window.addEventListener) {
      window.addEventListener(
        "message",
        ({ data, origin, source }) => {
          console.log(origin, data, source);
          if (data.interviewees) this.props.createStory(data);
        },
        false
      );
    }

    // Load story via storyId -> getStoryURL
    if (
      (!this.props.story || Object.keys(this.props.story).length === 0) &&
      this.props.params.storyId &&
      window.InterviewJS &&
      window.InterviewJS.getStoryURL
    ) {
      const storyURL = window.InterviewJS.getStoryURL(
        this.props.params.storyId
      );
      if (storyURL)
        axios
          .get(storyURL)
          .then((response) => this.props.createStory(response.data));
    }
  }

  toggleDetailsModal() {
    this.setState({ storyDetailsModal: !this.state.storyDetailsModal });
  }

  render() {
    const { story } = this.props;
    const LOCALE = story.locale ? story.locale : "en";
    const LANG = LOCALES[LOCALE];
    if (!story || Object.keys(story).length === 0) return null; // FIXME show spinner

    return [
      <Topbar
        handleDetails={this.toggleDetailsModal}
        handleBack={() => this.props.router.push(`/${story.id}`)}
        key="topbar"
      />,
      <Page key="page">
        <PageHead flex={[0, 1, `${100 / 2}%`]}>
          <Cover image={story.cover} compact />
        </PageHead>
        <PageBody limit="x" flex={[1, 0, `${100 / 2}%`]}>
          <Aside typo="p3">{LANG.contextText}</Aside>
          <Separator size="m" silent />
          <PageSubtitle typo="h4">{story.context}</PageSubtitle>
          <Separator size="l" silent />
          <Actionbar>
            <Action
              fixed
              onClick={() =>
                this.props.router.push(`/${story.id}/interviewees`)
              }
              primary
            >
              {LANG.contextButton}
            </Action>
          </Actionbar>
        </PageBody>
      </Page>,
      this.state.storyDetailsModal ? (
        <StoryDetailsModal
          handleClose={this.toggleDetailsModal}
          isOpen={this.state.storyDetailsModal}
          key="detailsModal"
          story={story}
          LANG={LANG}
        />
      ) : null
    ];
  }
}

ContextView.propTypes = {
  createStory: func.isRequired,
  router: object,
  story: shape({
    title: string
  })
};

ContextView.defaultProps = {
  router: null,
  story: {}
};
