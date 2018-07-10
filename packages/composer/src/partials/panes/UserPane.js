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

      customContinueVal: "",
      customExploreVal: "",

      continueLibDict: "text",
      continueLibItem: null,

      exploreLibDict: "text",
      exploreLibItem: null,

      exploreVal: areWeEdtingHere
        ? currentBubble.content[0].value
        : DEFAULT_ACTION2,
      continueVal: areWeEdtingHere
        ? currentBubble.content[1].value
        : DEFAULT_ACTION1
    };
    this.addStorylineItem = this.addStorylineItem.bind(this);
    this.customiseActionLabel = this.customiseActionLabel.bind(this);
    this.selectContinueAction = this.selectContinueAction.bind(this);
    this.selectExploreAction = this.selectExploreAction.bind(this);
    this.toggleAction = this.toggleAction.bind(this);
    this.updateStorylineItem = this.updateStorylineItem.bind(this);
  }
  toggleAction(action) {
    const { enableExplore } = this.state;
    if (enableExplore && action === "enableExplore") {
      this.setState({ enableExplore: false });
    } else if (!enableExplore && action === "enableExplore") {
      this.setState({ enableExplore: true, enableContinue: true });
    } else {
      this.setState({ [action]: !this.state[action] });
    }
  }
  customiseActionLabel(action, str) {
    return action === "customExploreVal"
      ? this.setState({
          [action]: str,
          enableExplore: str.length > 0,
          enableContinue: !this.state.enableContinue ? str.length > 0 : true,
          exploreLibItem: null,
          exploreVal: str.length > 0 ? str : this.props.exploreVal
        })
      : this.setState({
          [action]: str,
          enableContinue: str.length > 0,
          continueLibItem: null,
          continueVal: str.length > 0 ? str : this.props.continueVal
        });
  }
  selectContinueAction(dict, value, label) {
    this.setState({
      continueLibDict: dict,
      continueLibItem: value,
      continueVal: label,
      customContinueVal: label,
      enableContinue: true
    });
  }
  selectExploreAction(dict, value, label) {
    this.setState({
      customExploreVal: label,
      enableContinue: true,
      enableExplore: true,
      exploreLibDict: dict,
      exploreLibItem: value,
      exploreVal: label
    });
  }
  addStorylineItem() {
    const { storyIndex, currentInterviewee } = this.props;
    const {
      enableContinue,
      enableExplore,
      continueVal,
      exploreVal
    } = this.state;
    const newUserBubble = {
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
    this.props.addStorylineItem(storyIndex, currentInterviewee, newUserBubble);
    this.setState({
      customContinueVal: "",
      customExploreVal: "",
      enableContinue: false,
      enableExplore: false,
      continueLibItem: null,
      continueVal: this.props.continueVal,
      exploreLibItem: null,
      exploreVal: this.props.exploreVal
    });

    this.props.showSavedIndicator();
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
      customContinueVal: "",
      customExploreVal: "",
      enableContinue: false,
      enableExplore: false,
      continueLibItem: null,
      continueVal: this.props.continueVal,
      exploreLibItem: null,
      exploreVal: this.props.exploreVal
    });

    this.props.setCurrentBubbleNone();
    this.props.showSavedIndicator();
  }
  render() {
    const {
      continueLibDict,
      continueLibItem,
      continueVal,
      customContinueVal,
      customExploreVal,
      enableContinue,
      enableExplore,
      exploreLibDict,
      exploreLibItem,
      exploreVal
    } = this.state;
    return (
      <PaneEl fill="white" rounded shift dir="column">
        <PaneTitle>End-reader</PaneTitle>
        <PaneFrame
          {...this.props}
          active
          addStorylineItem={this.addStorylineItem}
          hasDraft={enableContinue || enableExplore}
          side="right"
          updateStorylineItem={this.updateStorylineItem}
          draft={
            <Draft>
              {enableContinue ? (
                <TileAction primary theme={{ font: "PT sans" }}>
                  {continueVal}
                </TileAction>
              ) : null}
              {enableExplore ? (
                <TileAction primary theme={{ font: "PT sans" }}>
                  {exploreVal}
                </TileAction>
              ) : null}
            </Draft>
          }
        >
          <UserActions>
            <Container>
              <UserAction dir="row">
                <PriActionEdit
                  activeTab={continueLibDict}
                  isActive={enableContinue}
                  label={
                    customContinueVal === "" ? undefined : customContinueVal
                  }
                  switchTab={(tab) => this.setState({ continueLibDict: tab })}
                  selectAction={(el, i, evt) =>
                    this.selectContinueAction(el, i, evt)
                  }
                  toggleAction={() => this.toggleAction("enableContinue")}
                  value={continueLibItem}
                />
              </UserAction>
            </Container>
            <Separator silent size="s" />
            <Container>
              <UserAction dir="row">
                <SecActionEdit
                  activeTab={exploreLibDict}
                  isActive={enableExplore}
                  label={customExploreVal === "" ? undefined : customExploreVal}
                  switchTab={(tab) => this.setState({ exploreLibDict: tab })}
                  selectAction={(el, i, evt) =>
                    this.selectExploreAction(el, i, evt)
                  }
                  toggleAction={() => this.toggleAction("enableExplore")}
                  value={exploreLibItem}
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
