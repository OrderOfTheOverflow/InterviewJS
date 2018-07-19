import { func, number, object, string } from "prop-types";
import styled from "styled-components";
import React from "react";

import {
  Container,
  Separator,
  TileAction,
  color,
  radius,
  setSpace
} from "interviewjs-styleguide";

import { USER_ACTIONS } from "../../options";

import PaneFrame from "./PaneFrame";
import PaneTitle from "./PaneTitle";
import { PriActionEdit, SecActionEdit } from "./user";

const DEFAULT_ACTION1 = USER_ACTIONS[0].label;
const DEFAULT_ACTION2 = USER_ACTIONS[1].label;

const EMPTY_DRAFT = {
  continue: {
    isActive: false,
    mime: "text",
    embed: { value: "" },
    image: { value: "", title: "", filename: "" },
    link: { value: "", title: "" },
    map: { value: "" },
    media: { value: "" },
    text: { value: DEFAULT_ACTION1, option: USER_ACTIONS[0].value }
  },
  explore: {
    isActive: false,
    mime: "text",
    embed: { value: "" },
    image: { value: "", title: "", filename: "" },
    link: { value: "", title: "" },
    map: { value: "" },
    media: { value: "" },
    text: { value: DEFAULT_ACTION2, option: USER_ACTIONS[1].value }
  }
};

const PaneEl = styled(Container)`
  height: 100%;
  width: 100%;
`;

const UserActions = styled(Container)`
  ${setSpace("pbm")};
  height: 100%;
  position: relative;
  & > div {
    display: block;
    width: 100%;
    height: 50%;
  }
`;

const UserAction = styled(Container)`
  align-items: stretch;
  border-radius: ${radius.l};
  border: 1px solid ${color.greyHL};
  box-shadow: 0 1px 3px ${color.shadowWt};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
`;

const Draft = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  width: 100%;
  & > * {
    ${setSpace("mhx")};
    max-width: 40%;
  }
`;

export default class UserPane extends React.Component {
  static getDerivedStateFromProps(nextProps, nextState) {
    if (
      !nextProps.currentBubble ||
      nextProps.currentBubble.role === "interviewee"
    )
      return null;

    const { currentBubble } = nextProps;
    const { content } = currentBubble;

    const isBinary = content[0].enabled && content[1].enabled;
    const isContinueActive = isBinary ? true : content[0].enabled;
    const isExploreActive = isBinary ? true : content[1].enabled;
    const continueMIME = content[0].mime ? content[0].mime : "text";
    const exploreMIME = content[0].mime ? content[1].mime : "text";

    return {
      ...nextState,
      draft: {
        continue: {
          ...nextState.draft.continue,
          isActive: isContinueActive,
          mime: continueMIME,
          [continueMIME]: {
            value: content[0].value ? content[0].value : "",
            option: content[0].option ? content[0].option : "",
            title: content[0].title ? content[0].title : ""
          }
        },
        explore: {
          ...nextState.draft.explore,
          isActive: isExploreActive,
          mime: exploreMIME,
          [exploreMIME]: {
            value: content[1].value ? content[1].value : "",
            option: content[1].option ? content[1].option : "",
            title: content[1].title ? content[1].title : ""
          }
        }
      }
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      draft: EMPTY_DRAFT
    };
    this.addStorylineItem = this.addStorylineItem.bind(this);
    this.updateStorylineItem = this.updateStorylineItem.bind(this);

    // NEW LOGIC
    this.switchMIME = this.switchMIME.bind(this);
    this.toggleAction = this.toggleAction.bind(this);
    this.updateDraft = this.updateDraft.bind(this);
  }
  toggleAction(action) {
    const isExploreActive = this.state.draft.explore.isActive;
    if (isExploreActive && action === "explore") {
      this.setState({
        draft: {
          ...this.state.draft,
          explore: {
            ...this.state.draft.explore,
            isActive: false
          }
        }
      });
    } else if (!isExploreActive && action === "explore") {
      this.setState({
        draft: {
          continue: {
            ...this.state.draft.continue,
            isActive: true
          },
          explore: {
            ...this.state.draft.explore,
            isActive: true
          }
        }
      });
    } else {
      this.setState({
        draft: {
          ...this.state.draft,
          [action]: {
            ...this.state.draft[action],
            isActive: !this.state.draft[action].isActive
          }
        }
      });
    }
  }
  switchMIME(action, mime) {
    this.setState({
      draft: {
        ...this.state.draft,
        [action]: { ...this.state.draft[action], mime }
      }
    });
  }
  updateDraft(action, mime, draft) {
    this.setState({
      draft: {
        ...this.state.draft,
        [action]: {
          ...this.state.draft[action],
          [mime]: draft
        }
      }
    });
  }

  addStorylineItem() {
    const { storyIndex, currentInterviewee } = this.props;
    const { draft } = this.state;
    const continueMIME = this.state.draft.continue.mime;
    const exploreMIME = this.state.draft.explore.mime;

    const newUserBubble = {
      content: [
        {
          ...draft.continue[continueMIME],
          enabled: draft.continue.isActive,
          type: draft.explore.isActive ? "ignore" : "explore",
          title: draft.continue[continueMIME].title,
          mime: continueMIME
        },
        {
          ...draft.explore[exploreMIME],
          enabled: draft.explore.isActive,
          type: "explore",
          title: draft.explore[exploreMIME].title,
          mime: exploreMIME
        }
      ],
      role: "user"
    };
    this.props.addStorylineItem(storyIndex, currentInterviewee, newUserBubble);

    this.setState({
      draft: EMPTY_DRAFT
    });

    this.props.showSavedIndicator();
  }
  updateStorylineItem() {
    const { storyIndex, currentInterviewee, currentBubbleIndex } = this.props;
    const { draft } = this.state;

    const continueMIME = this.state.draft.continue.mime;
    const exploreMIME = this.state.draft.explore.mime;

    const editedUserBubble = {
      content: [
        {
          ...draft.continue[continueMIME],
          enabled: draft.continue.isActive,
          type: draft.explore.isActive ? "ignore" : "explore",
          mime: continueMIME
        },
        {
          ...draft.explore[exploreMIME],
          enabled: draft.explore.isActive,
          type: "explore",
          mime: exploreMIME
        }
      ],
      role: "user"
    };

    this.props.updateStorylineItem(
      storyIndex,
      currentInterviewee,
      currentBubbleIndex,
      editedUserBubble
    );

    this.setState({
      draft: EMPTY_DRAFT
    });

    this.props.setCurrentBubbleNone();
    this.props.showSavedIndicator();
  }
  render() {
    return (
      <PaneEl fill="white" rounded shift dir="column">
        <PaneTitle>End-reader</PaneTitle>
        <PaneFrame
          {...this.props}
          active
          addStorylineItem={this.addStorylineItem}
          hasDraft={
            this.state.draft.continue.isActive ||
            this.state.draft.explore.isActive
          }
          side="right"
          updateStorylineItem={this.updateStorylineItem}
          draft={
            <Draft className="jr-step-04">
              {["continue", "explore"].map((action) => {
                if (this.state.draft[action].isActive) {
                  const { mime } = this.state.draft[action];
                  if (mime === "link") {
                    return (
                      <TileAction primary>
                        {this.state.draft[action].link.title ||
                          this.state.draft[action].link.value}
                      </TileAction>
                    );
                  } else if (mime === "image") {
                    return (
                      <TileAction primary>
                        {this.state.draft[action].image.value ? (
                          <span className="span">
                            <img
                              className="img"
                              src={this.state.draft[action].image.value}
                              alt={this.state.draft[action].image.title}
                            />
                          </span>
                        ) : (
                          this.state.draft[action].image.title
                        )}
                      </TileAction>
                    );
                  } else if (
                    mime === "embed" ||
                    mime === "media" ||
                    mime === "map"
                  ) {
                    return (
                      <TileAction primary>
                        {this.state.draft[action][mime].value ? (
                          <div
                            className="iframe"
                            dangerouslySetInnerHTML={{
                              __html: this.state.draft[action][mime].value
                            }}
                          />
                        ) : null}
                      </TileAction>
                    );
                  }
                  return (
                    <TileAction primary>
                      {this.state.draft[action].text.value}
                    </TileAction>
                  );
                }
                return null;
              })}
            </Draft>
          }
        >
          <UserActions>
            <Container>
              <UserAction dir="row">
                <PriActionEdit
                  activeMIME={this.state.draft.continue.mime}
                  draft={this.state.draft.continue}
                  isActive={this.state.draft.continue.isActive}
                  switchMIME={(mime) => this.switchMIME("continue", mime)}
                  toggleAction={() => this.toggleAction("continue")}
                  updateDraft={(mime, draft) =>
                    this.updateDraft("continue", mime, draft)
                  }
                  story={this.props.story}
                  user={this.props.user}
                />
              </UserAction>
            </Container>
            <Separator silent size="s" />
            <Container>
              <UserAction dir="row">
                <SecActionEdit
                  activeMIME={this.state.draft.explore.mime}
                  draft={this.state.draft.explore}
                  isActive={this.state.draft.explore.isActive}
                  switchMIME={(mime) => this.switchMIME("explore", mime)}
                  toggleAction={() => this.toggleAction("explore")}
                  updateDraft={(mime, draft) =>
                    this.updateDraft("explore", mime, draft)
                  }
                  story={this.props.story}
                  user={this.props.user}
                />
              </UserAction>
            </Container>
          </UserActions>
        </PaneFrame>
      </PaneEl>
    );
  }
}

UserPane.propTypes = {
  addStorylineItem: func.isRequired,
  continueVal: string,
  currentBubble: object,
  currentBubbleIndex: number,
  currentInterviewee: number.isRequired,
  exploreVal: string,
  setCurrentBubbleNone: func.isRequired,
  showSavedIndicator: func.isRequired,
  storyIndex: number.isRequired /* eslint react/forbid-prop-types: 0 */,
  updateStorylineItem: func.isRequired
};

UserPane.defaultProps = {
  currentBubbleIndex: null,
  currentBubble: null,
  exploreVal: DEFAULT_ACTION1,
  continueVal: DEFAULT_ACTION2
};
