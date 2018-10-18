import { func, number, object } from "prop-types";
import styled from "styled-components";
import React, { Component } from "react";

import {
  Container,
  Icon,
  PaneTab,
  PaneTabs,
  Tip,
  color,
  radius
} from "interviewjs-styleguide";

import {
  EmbedPane,
  ImagePane,
  LinkPane,
  MapPane,
  MediaPane,
  TextPane
} from "./interviewee";

import PaneTitle from "./PaneTitle";

const EMPTY_DRAFT = {
  text: { value: "", source: "" },
  link: { value: "", title: "" },
  image: {
    value: "",
    title: "",
    filename: ""
  },
  embed: { value: "" },
  map: { value: "" },
  media: { value: "" }
};

const PaneEl = styled(Container)`
  align-items: stretch;
  height: 100%;
  overflow: visible;
  width: 100%;
  ${PaneTabs} {
    background: ${color.white};
    border-radius: ${radius.l} ${radius.l} 0 0;
    overflow: hidden;
    & > * {
      transform: translateY(-1px);
    }
    & > *:first-child {
      border-radius: ${radius.l} 0 0 0;
    }
    & > *:last-child {
      border-radius: 0 ${radius.l} 0 0;
    }
  }
`;

export default class IntervieweePane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draft: EMPTY_DRAFT,
      clean: {
        embed: "",
        map: "",
        media: ""
      },
      tab: "text"
    };
    this.addStorylineItem = this.addStorylineItem.bind(this);
    this.constructDrafts = this.constructDrafts.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.updateDraft = this.updateDraft.bind(this);
    this.updateSrcText = this.updateSrcText.bind(this);
    this.updateStorylineItem = this.updateStorylineItem.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentBubble &&
      prevProps.currentBubbleIndex !== this.props.currentBubbleIndex &&
      this.props.currentBubble.role === "interviewee"
    ) {
      const { content, type } = this.props.currentBubble;
      this.setState({
        draft: {
          ...this.state.draft,
          [type]: content
        },
        tab: type || "text"
      });
    }
    return null;
  }

  updateSrcText(data) {
    const { storyIndex, currentInterviewee, story } = this.props;
    const { interviewees } = story;
    const intervieweeData = {
      ...interviewees[currentInterviewee],
      srcText: data
    };
    this.props.updateInterviewee(
      storyIndex,
      currentInterviewee,
      intervieweeData
    );
  }

  updateDraft(data, type, clean) {
    // console.log(clean);
    this.setState({
      draft: { ...this.state.draft, [type]: data },
      clean: { ...this.state.clean, [type]: clean }
    });
  }

  constructDrafts() {
    this.setState({
      draft: EMPTY_DRAFT,
      clean: {
        embed: "",
        map: "",
        media: ""
      }
    });
  }

  addStorylineItem(source) {
    const { storyIndex, currentInterviewee } = this.props;
    const { draft, clean } = this.state;

    let content = draft[source];
    if (source === "embed" || source === "map" || source === "media")
      content = { value: clean[source], title: draft[source].title };

    const newIntervieweeBubble = {
      content,
      role: "interviewee",
      type: this.state.tab
    };

    this.props.addStorylineItem(
      storyIndex,
      currentInterviewee,
      newIntervieweeBubble
    );

    this.setState({
      draft: {
        ...this.state.draft,
        [source]: { value: "", title: "", source: "", filename: "" }
      }
    });

    this.props.showSavedIndicator();
    this.props.setCondition("hasIntervieweeBubble", true);
  }
  updateStorylineItem() {
    const { storyIndex, currentInterviewee, currentBubbleIndex } = this.props;
    const editedIntervieweeBubble = {
      content: this.state.draft[this.state.tab],
      role: "interviewee",
      type: this.state.tab
    };
    this.props.updateStorylineItem(
      storyIndex,
      currentInterviewee,
      currentBubbleIndex,
      editedIntervieweeBubble
    );
    this.setState({
      draft: {
        ...this.state.draft,
        [this.state.tab]: {
          value: "",
          title: "",
          source: "",
          filename: ""
        }
      }
    });

    this.props.setCurrentBubbleNone();
    this.props.showSavedIndicator();
  }

  switchTab(target) {
    this.setState({ tab: target }, () => this.props.setCurrentBubbleNone());
    this.constructDrafts();
  }

  render() {
    console.log(this.props.currentBubbleIndex);

    const { tab } = this.state;
    const { currentInterviewee, story } = this.props;
    return (
      <PaneEl fill="white" rounded shift dir="column">
        <PaneTitle>Interviewee</PaneTitle>
        <Container flex={[0, 0, "auto"]}>
          <PaneTabs>
            <PaneTab
              active={tab === "text"}
              onClick={() => this.switchTab("text")}
              opinionated
            >
              <Tip title="Insert Text">
                <Icon name="text" size="s" />
              </Tip>
            </PaneTab>
            <PaneTab
              active={tab === "link"}
              onClick={() => this.switchTab("link")}
              opinionated
            >
              <Tip title="Insert Link">
                <Icon name="link" size="s" />
              </Tip>
            </PaneTab>
            <PaneTab
              active={tab === "image"}
              onClick={() => this.switchTab("image")}
              opinionated
            >
              <Tip title="Insert Image">
                <Icon name="image" size="s" />
              </Tip>
            </PaneTab>
            <PaneTab
              active={tab === "embed"}
              onClick={() => this.switchTab("embed")}
              opinionated
            >
              <Tip title="Embed iframe">
                <Icon name="embed" size="s" />
              </Tip>
            </PaneTab>
            <PaneTab
              active={tab === "map"}
              onClick={() => this.switchTab("map")}
              opinionated
            >
              <Tip title="Embed map">
                <Icon name="map" size="s" />
              </Tip>
            </PaneTab>
            <PaneTab
              active={tab === "media"}
              onClick={() => this.switchTab("media")}
              opinionated
            >
              <Tip title="Embed video">
                <Icon name="media" size="s" />
              </Tip>
            </PaneTab>
          </PaneTabs>
        </Container>
        <Container flex={[1, 1, "100%"]}>
          <TextPane
            {...this.props}
            active={tab === "text"}
            addStorylineItem={() => this.addStorylineItem("text")}
            draft={this.state.draft.text}
            srcText={story.interviewees[currentInterviewee].srcText}
            updateDraft={(data) => this.updateDraft(data, "text")}
            updateSrcText={this.updateSrcText}
            updateStorylineItem={() => this.updateStorylineItem("text")}
          />
          <LinkPane
            {...this.props}
            active={tab === "link"}
            addStorylineItem={() => this.addStorylineItem("link")}
            draft={this.state.draft.link}
            updateDraft={(data) => this.updateDraft(data, "link")}
            updateStorylineItem={() => this.updateStorylineItem("link")}
          />
          <ImagePane
            {...this.props}
            active={tab === "image"}
            addStorylineItem={() => this.addStorylineItem("image")}
            draft={this.state.draft.image}
            updateDraft={(data) => this.updateDraft(data, "image")}
            updateStorylineItem={() => this.updateStorylineItem("image")}
          />
          <EmbedPane
            {...this.props}
            active={tab === "embed"}
            addStorylineItem={() => this.addStorylineItem("embed")}
            draft={this.state.draft.embed}
            updateStorylineItem={() => this.updateStorylineItem("embed")}
            updateDraft={(data, clean) =>
              this.updateDraft(data, "embed", clean)
            }
          />
          <MapPane
            {...this.props}
            active={tab === "map"}
            addStorylineItem={() => this.addStorylineItem("map")}
            draft={this.state.draft.map}
            updateDraft={(data, clean) => this.updateDraft(data, "map", clean)}
            updateStorylineItem={() => this.updateStorylineItem("map")}
          />
          <MediaPane
            {...this.props}
            active={tab === "media"}
            addStorylineItem={() => this.addStorylineItem("media")}
            draft={this.state.draft.media}
            updateDraft={(data, clean) =>
              this.updateDraft(data, "media", clean)
            }
            updateStorylineItem={() => this.updateStorylineItem("media")}
          />
        </Container>
      </PaneEl>
    );
  }
}

IntervieweePane.propTypes = {
  addStorylineItem: func.isRequired,
  showSavedIndicator: func.isRequired,
  currentBubble: object,
  currentInterviewee: number.isRequired,
  currentBubbleIndex: number,
  story: object.isRequired /* eslint react/forbid-prop-types: 0 */,
  storyIndex: number.isRequired,
  updateInterviewee: func.isRequired,
  setCurrentBubbleNone: func.isRequired,
  updateStorylineItem: func.isRequired
};

IntervieweePane.defaultProps = {
  currentBubble: null,
  currentBubbleIndex: null
};
