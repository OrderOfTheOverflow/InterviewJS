import { func, number, object, string } from "prop-types";
import styled from "styled-components";
import React from "react";

import {
  Action,
  Container,
  Separator,
  color,
  radius,
  setSpace
} from "interviewjs-styleguide";

import PaneFrame from "./PaneFrame";
import PaneTitle from "./PaneTitle";
import { PriActionEdit, SecActionEdit } from "./user";

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

      exploreVal: areWeEdtingHere ? currentBubble.content[0].value : "Carry on",
      continueVal: areWeEdtingHere
        ? currentBubble.content[1].value
        : "Omg, why?"
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
  customiseActionLabel(action, e) {
    const { value } = e.target;
    return action === "customExploreVal"
      ? this.setState({
          [action]: value,
          enableExplore: value.length > 0,
          enableContinue: !this.state.enableContinue ? value.length > 0 : true,
          exploreLibItem: null,
          exploreVal: value.length > 0 ? value : this.props.exploreVal
        })
      : this.setState({
          [action]: value,
          enableContinue: value.length > 0,
          continueLibItem: null,
          continueVal: value.length > 0 ? value : this.props.continueVal
        });
  }
  selectContinueAction(dict, i, e) {
    this.setState({
      continueLibDict: dict,
      continueLibItem: i,
      continueVal: e.target.innerHTML,
      customContinueVal: e.target.innerHTML,
      enableContinue: true
    });
  }
  selectExploreAction(dict, i, e) {
    this.setState({
      customExploreVal: e.target.innerHTML,
      enableContinue: true,
      enableExplore: true,
      exploreLibDict: dict,
      exploreLibItem: i,
      exploreVal: e.target.innerHTML
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
      continueVal,
      customContinueVal,
      customExploreVal,
      enableContinue,
      enableExplore,
      exploreLibDict,
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
                <Action
                  fixed
                  primary={!enableExplore}
                  secondary={!!enableExplore}
                  theme={{ font: "PT sans" }}
                >
                  {continueVal}
                </Action>
              ) : null}
              {enableExplore ? (
                <Action fixed primary theme={{ font: "PT sans" }}>
                  {exploreVal}
                </Action>
              ) : null}
            </Draft>
          }
        >
          <UserActions>
            <Container>
              <UserAction dir="row">
                <PriActionEdit
                  activeTab={continueLibDict}
                  customValue={customContinueVal}
                  isActive={enableContinue}
                  switchTab={(tab) => this.setState({ continueLibDict: tab })}
                  selectAction={(el, i, evt) =>
                    this.selectContinueAction(el, i, evt)
                  }
                  toggleAction={() => this.toggleAction("enableContinue")}
                />
              </UserAction>
            </Container>
            <Separator silent size="s" />
            <Container>
              <UserAction dir="row">
                <SecActionEdit
                  activeTab={exploreLibDict}
                  customValue={customExploreVal}
                  isActive={enableExplore}
                  switchTab={(tab) => this.setState({ exploreLibDict: tab })}
                  selectAction={(el, i, evt) =>
                    this.selectExploreAction(el, i, evt)
                  }
                  toggleAction={() => this.toggleAction("enableExplore")}
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
  exploreVal: "Omg why?",
  continueVal: "Carry on"
};
