/* eslint react/forbid-prop-types: 0 */
import css from "styled-components";
import React, { Component } from "react";
import { object, shape, string, func } from "prop-types";
import axios from "axios";

import {
  Action,
  Avatar,
  Container,
  Icon,
  PageTitle,
  Separator,
  Text,
  Tip,
  color,
  setSpace
} from "interviewjs-styleguide";

import {
  Cover,
  IntervieweeModal,
  Page,
  PageBody,
  PageHead,
  StoryDetailsModal,
  Topbar
} from "../partials";

import LOCALES from "../locales";

const Interviewees = css.ul`
  display: block;
  width: 100%;
`;

const Interviewee = css.li`
  ${setSpace("pvm")};
  border-bottom: 1px solid ${color.flareHL};
  cursor: pointer;
  display: block;
  & button {
    ${setSpace("mls")};
  }
  ${Avatar} {
    ${setSpace("mrm")};
  }
`;

const IntervieweeTitle = css(Text)`
  color: ${color.flareD};
`;

const Aside = css(PageTitle)`
  color: ${color.flareHD};
`;

export default class ContextView extends Component {
  constructor(props) {
    super(props);
    this.state = { intervieweeModal: null, storyDetailsModal: false };
    this.startChat = this.startChat.bind(this);
    this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
    this.toggleIntervieweeModal = this.toggleIntervieweeModal.bind(this);
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

  toggleDetailsModal(e) {
    if (e) e.stopPropagation();
    this.setState({ storyDetailsModal: !this.state.storyDetailsModal });
  }

  toggleIntervieweeModal(e, target) {
    e.stopPropagation();
    if (target !== null) {
      this.setState({ intervieweeModal: target });
    } else {
      this.setState({ intervieweeModal: null });
    }
  }

  startChat(e, target) {
    e.stopPropagation();
    this.props.router.push(`/${this.props.story.id}/chat/${target}`);
  }

  render() {
    const { story } = this.props;
    const LOCALE = story.locale ? story.locale : "en";
    const LANG = LOCALES[LOCALE];

    if (!story || Object.keys(story).length === 0) return null; // FIXME show spinner

    return [
      <Topbar
        handleDetails={(e) => this.toggleDetailsModal(e)}
        handleBack={() => this.props.router.push(`/${story.id}/context`)}
        key="topbar"
      />,
      <Page key="page">
        <PageHead flex={[0, 1, `${100 / 2}%`]}>
          <Cover image={story.cover} compact />
        </PageHead>
        <PageBody limit="x" flex={[1, 0, `${100 / 2}%`]}>
          <Aside typo="p3">{LANG.intervieweesText}</Aside>
          <Separator size="m" silent />
          <Interviewees>
            {story.interviewees.map((interviewee, i) => (
              <Interviewee
                key={interviewee.id}
                onClick={(e) => this.startChat(e, interviewee.id)}
              >
                <Container dir="row">
                  <Container flex={[1, 0, "auto"]}>
                    <Avatar
                      size="l"
                      image={interviewee.avatar}
                      onClick={() =>
                        this.props.router.push(
                          `/${story.id}/chat/${interviewee.id}`
                        )
                      }
                    />
                  </Container>
                  <Container flex={[0, 1, "100%"]} align="left">
                    <Text typo="p1">{interviewee.name}</Text>
                    <Separator silent size="n" />
                    <IntervieweeTitle typo="p5">
                      {interviewee.title}
                    </IntervieweeTitle>
                  </Container>
                  <Container flex={[1, 0, "auto"]}>
                    <Tip title={LANG.intervieweesAbout}>
                      <Action
                        iconic
                        inverted
                        onClick={(e) => this.toggleIntervieweeModal(e, i)}
                      >
                        <Icon name="info" />
                      </Action>
                    </Tip>
                    <Tip title={LANG.intervieweesStartChat}>
                      <Action
                        iconic
                        onClick={(e) => this.startChat(e, interviewee.id)}
                        primary
                      >
                        <Icon name="bubbles" />
                      </Action>
                    </Tip>
                  </Container>
                </Container>
              </Interviewee>
            ))}
          </Interviewees>
        </PageBody>
      </Page>,
      this.state.intervieweeModal !== null ? (
        <IntervieweeModal
          {...this.props}
          handleClose={(e) => this.toggleIntervieweeModal(e, null)}
          interviewee={story.interviewees[this.state.intervieweeModal]}
          isOpen={this.state.intervieweeModal !== null}
          key="intervieweeModal"
          handleSubmit={() =>
            this.props.router.push(
              `/${story.id}/chat/${
                story.interviewees[this.state.intervieweeModal].id
              }`
            )
          }
          cta={LANG.intervieweesStartChat}
        />
      ) : null,
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
