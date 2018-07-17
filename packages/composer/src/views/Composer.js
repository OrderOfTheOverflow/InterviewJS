import React from "react";
import css from "styled-components";
import { arrayOf, func, object, shape, string } from "prop-types";

import {
  Action,
  Container,
  Icon,
  PageTitle,
  Preloader,
  Separator,
  Text,
  breakpoint,
  color,
  setSpace
} from "interviewjs-styleguide";

import "./joyride.css";

import {
  ComposerHelp,
  ComposerWelcomeModal,
  DetailsModal,
  ErrorBoundary,
  IntervieweePane,
  MobileRedirect,
  PublishStoryModal,
  StoryPane,
  UserPane
} from "../partials";

const Page = css.div`
  align-content: stretch;
  align-items: stretch;
  display: none;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  max-width: 1400px;
  ${breakpoint.desktop} {
    display: flex;
  }
`;

const PageHead = css.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
  ${PageTitle} {
    color: ${color.blueBlk};
  }
`;
const SaveIndicator = css(Text)`
  color: ${color.greenM};
  font-weight: bold;
`;

const PageBody = css.div`
  ${setSpace("pbm")};
  ${setSpace("phm")};
  align-content: stretch;
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex: 0 1 100%;
  & > *:first-child {
    ${setSpace("mrs")};
  }
  & > *:nth-child(2) {
    ${setSpace("mhs")};
  }
  & > *:last-child {
    ${setSpace("mls")};
  }
`;

export default class ComposerView extends React.Component {
  static getDerivedStateFromProps(nextState) {
    const skipComposerWelcome = localStorage.getItem("skipComposerWelcome");
    return {
      ...nextState,
      welcomeModal: !skipComposerWelcome
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      currentBubble: null,
      currentInterviewee: 0,
      detailsModal: "",
      publishModal: false,
      savedLabel: null,
      welcomeModal: false
    };
    this.deleteInterviewee = this.deleteInterviewee.bind(this);
    this.setCurrentBubbleNone = this.setCurrentBubbleNone.bind(this);
    this.showSavedIndicator = this.showSavedIndicator.bind(this);
    this.switchInterviewee = this.switchInterviewee.bind(this);
    this.toggleBubbleEdit = this.toggleBubbleEdit.bind(this);
    this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
    this.togglePublishModal = this.togglePublishModal.bind(this);
    this.updateStory = this.updateStory.bind(this);
  }

  setCurrentBubbleNone() {
    this.setState({ currentBubble: null });
  }

  switchInterviewee(interviewee) {
    this.setState(
      {
        currentInterviewee: interviewee,
        currentBubble: null
      },
      () => this.setCurrentBubbleNone()
    );
  }

  deleteInterviewee(story, interviewee) {
    this.setState({ currentInterviewee: 0 });
    this.props.deleteInterviewee(story, interviewee);
  }

  toggleDetailsModal(tab) {
    return tab
      ? this.setState({ detailsModal: tab })
      : this.setState({ detailsModal: "" });
  }

  togglePublishModal() {
    this.setState({ publishModal: !this.state.publishModal });
  }

  closeWelcomeModal() {
    this.setState({ welcomeModal: false });
    localStorage.setItem("skipComposerWelcome", true);
  }

  toggleBubbleEdit(target) {
    this.setState({ currentBubble: target });
  }

  updateStory(data) {
    const { storyId } = this.props.params;
    const i = this.props.stories.findIndex((story) => story.id === storyId);
    this.props.updateStory(data, i);
    this.showSavedIndicator();
  }

  showSavedIndicator() {
    this.setState({ savedLabel: false });
    setTimeout(() => this.setState({ savedLabel: true }), 2000);
    setTimeout(() => this.setState({ savedLabel: null }), 5000);
  }

  render() {
    const { storyId } = this.props.params;
    const storyIndex = this.props.stories.findIndex(
      (story) => story.id === storyId
    );
    const story = this.props.stories[storyIndex];
    if (!story) {
      this.props.router.push(`/`);
      return null;
    }

    const { storyline } = story.interviewees[this.state.currentInterviewee];

    const renderSaveIndicator = () => {
      if (this.state.savedLabel === false) {
        return [<Preloader />, <Separator dir="v" size="m" />];
      } else if (this.state.savedLabel === true) {
        return [
          <SaveIndicator typo="p5">
            <Icon name="checkmark" /> Saved
          </SaveIndicator>,
          <Separator dir="v" size="m" />
        ];
      }
      return null;
    };

    return [
      <Page key="Page">
        <ErrorBoundary>
          <PageHead>
            <Container flex={[1, 1, `${100 / 3}%`]} padded>
              <Action onClick={() => this.props.router.push(`/stories`)}>
                <Icon name="arrow-left" size="x" /> My story library
              </Action>
              <Separator dir="v" size="m" />
              <Action onClick={() => this.toggleDetailsModal("meta")}>
                Story elements
              </Action>
            </Container>
            <Container flex={[1, 1, `${100 / 3}%`]} align="center">
              <PageTitle typo="h2">{story.title}</PageTitle>
            </Container>
            <Container flex={[1, 1, `${100 / 3}%`]} align="right" padded>
              {renderSaveIndicator()}
              <Action href="https://interviewjs.io/help.html" target="_blank">
                Help
              </Action>
              <Separator dir="v" size="m" />
              <Action primary onClick={this.togglePublishModal}>
                Review story
              </Action>
            </Container>
          </PageHead>
          <PageBody>
            <Container flex={[1, 1, `${100 / 3}%`]} className="my-first-step">
              <IntervieweePane
                {...this.props}
                currentBubble={storyline[this.state.currentBubble]}
                currentBubbleIndex={this.state.currentBubble}
                currentInterviewee={this.state.currentInterviewee}
                setCurrentBubbleNone={this.setCurrentBubbleNone}
                story={story}
                storyIndex={storyIndex}
                showSavedIndicator={this.showSavedIndicator}
                editMode={
                  !!(
                    this.state.currentBubble !== null &&
                    storyline[this.state.currentBubble].role === "interviewee"
                  )
                }
              />
            </Container>
            <Container flex={[0, 1, `400px`]}>
              <StoryPane
                {...this.props}
                currentBubble={this.state.currentBubble}
                currentInterviewee={this.state.currentInterviewee}
                story={story}
                storyIndex={storyIndex}
                switchInterviewee={this.switchInterviewee}
                toggleBubbleEdit={this.toggleBubbleEdit}
                toggleDetailsModal={() =>
                  this.toggleDetailsModal("interviewees")
                }
              />
            </Container>
            <Container flex={[1, 1, `${100 / 3}%`]}>
              <UserPane
                {...this.props}
                currentBubble={storyline[this.state.currentBubble]}
                currentBubbleIndex={this.state.currentBubble}
                currentInterviewee={this.state.currentInterviewee}
                setCurrentBubbleNone={this.setCurrentBubbleNone}
                story={story}
                storyIndex={storyIndex}
                showSavedIndicator={this.showSavedIndicator}
                editMode={
                  !!(
                    this.state.currentBubble !== null &&
                    storyline[this.state.currentBubble].role === "user"
                  )
                }
              />
            </Container>
          </PageBody>
        </ErrorBoundary>
      </Page>,
      <MobileRedirect {...this.props} key="MobileRedirect" />,
      this.state.detailsModal !== "" ? (
        <DetailsModal
          {...this.props}
          deleteInterviewee={this.deleteInterviewee}
          handleClose={() => this.toggleDetailsModal()}
          isOpen
          key="DetailsModal"
          story={story}
          storyIndex={storyIndex}
          tab={this.state.detailsModal}
          updateStory={this.updateStory}
        />
      ) : null,
      this.state.publishModal ? (
        <PublishStoryModal
          {...this.props}
          handleClose={() => this.togglePublishModal()}
          isOpen
          key="PublishModal"
          story={story}
          user={this.props.user}
          storyIndex={storyIndex}
          tab={this.state.detailsModal}
          updateStory={this.updateStory}
        />
      ) : null,
      this.state.welcomeModal ? (
        <ComposerWelcomeModal
          {...this.props}
          handleClose={() => this.closeWelcomeModal()}
          isOpen
          key="ComposerWelcomeModal"
        />
      ) : null,
      <ComposerHelp key="ComposerHelp" />
    ];
  }
}

ComposerView.propTypes = {
  deleteInterviewee: func,
  params: shape({ storyId: string.isRequired }).isRequired,
  router: object.isRequired /* eslint react/forbid-prop-types: 0 */,
  stories: arrayOf(object),
  user: object,
  updateStory: func
};

ComposerView.defaultProps = {
  deleteInterviewee: null,
  stories: [],
  user: {},
  updateStory: null
};
