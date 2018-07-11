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
  static getDerivedStateFromProps(nextProps) {
    if (
      !nextProps.currentBubble ||
      nextProps.currentBubble.role === "interviewee"
    )
      return null;
    const { content } = nextProps.currentBubble;
    const isBinary = content[0].enabled && content[1].enabled;
    return {
      enableContinue: isBinary ? true : content[0].enabled,
      enableExplore: isBinary ? true : content[1].enabled,
      customContinueVal: content[0].value,
      customExploreVal: content[1].value,
      continueVal: content[0].value,
      exploreVal: content[1].value
    };
  }
  constructor(props) {
    super(props);

    const { currentBubble } = this.props;
    const areWeEdtingHere = currentBubble !== null;

    this.state = {
      enableContinue: areWeEdtingHere
        ? currentBubble.content[0].enabled
        : false,
      enableExplore: areWeEdtingHere ? currentBubble.content[1].enabled : false,

      exploreVal: areWeEdtingHere
        ? currentBubble.content[0].value
        : DEFAULT_ACTION2,
      continueVal: areWeEdtingHere
        ? currentBubble.content[1].value
        : DEFAULT_ACTION1,

      // NEW LOGIC
      draft: {
        continue: {
          isActive: false,
          mime: "text",
          embed: { value: "" },
          image: { value: "", title: "", filename: "" },
          link: { value: "", title: "" },
          map: { value: "" },
          media: { value: "" },
          text: { value: "", option: null }
        },
        explore: {
          isActive: false,
          mime: "text",
          embed: { value: "" },
          image: { value: "", title: "", filename: "" },
          link: { value: "", title: "" },
          map: { value: "" },
          media: { value: "" },
          text: { value: "", option: null }
        }
      }
    };
    this.addStorylineItem = this.addStorylineItem.bind(this);
    this.updateStorylineItem = this.updateStorylineItem.bind(this);

    // NEW LOGIC
    this.switchMIME = this.switchMIME.bind(this);
    this.toggleAction = this.toggleAction.bind(this);
    this.updateDraft = this.updateDraft.bind(this);
  }
  toggleAction(action) {
    // console.group("toggleAction()");
    // console.log({ action });
    // console.groupEnd();
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
    // console.group("switchMIME()");
    // console.log({ action });
    // console.log({ mime });
    // console.groupEnd();
    this.setState({
      draft: {
        ...this.state.draft,
        [action]: { ...this.state.draft[action], mime }
      }
    });
  }
  updateDraft(action, mime, draft) {
    // console.group("updateDraft(…)");
    // console.log({ action });
    // console.log({ mime });
    // console.log({ draft });
    // console.log(this.state);
    // console.groupEnd();
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
    console.group("addStorylineItem():");
    console.log({ storyIndex });
    console.log({ currentInterviewee });
    console.log({ draft });
    console.groupEnd();

    // const {
    //   enableContinue,
    //   enableExplore,
    //   continueVal,
    //   exploreVal
    // } = this.state;
    // const newUserBubble = {
    //   content: [
    //     {
    //       enabled: enableContinue,
    //       value: continueVal,
    //       type: enableExplore ? "ignore" : "explore"
    //     },
    //     { enabled: enableExplore, value: exploreVal, type: "explore" }
    //   ],
    //   role: "user"
    // };
    // this.props.addStorylineItem(storyIndex, currentInterviewee, newUserBubble);
    // this.setState({
    //   customContinueVal: "",
    //   customExploreVal: "",
    //   enableContinue: false,
    //   enableExplore: false,
    //   continueLibItem: null,
    //   continueVal: this.props.continueVal,
    //   exploreLibItem: null,
    //   exploreVal: this.props.exploreVal
    // });
    // this.props.showSavedIndicator();
  }
  updateStorylineItem() {
    const { storyIndex, currentInterviewee, currentBubbleIndex } = this.props;
    const {
      enableContinue,
      enableExplore,
      continueVal,
      exploreVal
    } = this.state;
    const editedUserBubble = {
      content: [
        {
          enabled: enableContinue,
          value: continueVal,
          type: enableExplore ? "ignore" : "explore"
        },
        { enabled: enableExplore, value: exploreVal, type: "explore" }
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
      enableContinue: false,
      enableExplore: false,
      continueVal: this.props.continueVal,
      exploreVal: this.props.exploreVal
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
            <Draft>
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
                        <span className="span">
                          <img
                            className="img"
                            src={this.state.draft[action].image.value}
                            alt="interviewjsasset"
                          />
                        </span>
                      </TileAction>
                    );
                  } else if (
                    mime === "embed" ||
                    mime === "media" ||
                    mime === "map"
                  ) {
                    return (
                      <TileAction primary>
                        <div
                          className="iframe"
                          dangerouslySetInnerHTML={{
                            __html: this.state.draft[action][mime].value
                          }}
                        />
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
