/* eslint react/forbid-prop-types: 0 */
/* eslint no-case-declarations: 0 */
import { object, shape, string } from "prop-types";
import { withRouter } from "react-router";
import React, { Component } from "react";
import { Actionbar, Action, Avatar, Icon, Tip } from "interviewjs-styleguide";
import { IntervieweeModal, StoryDetailsModal, Storyline } from "../partials/";
import {
  EmoActions,
  NvmActions,
  Page,
  PageBody,
  PageFoot,
  Topbar,
  RunAwayActions
} from "./chat/";

class ChatView extends Component {
  constructor(props) {
    super(props);
    const { interviewees } = this.props.story;
    const interviewee = interviewees[this.findIntervieweeIndex()];
    const { story } = this.props;
    const localHistory = JSON.parse(
      localStorage.getItem(
        `history-${story.id}-${story.version}-${interviewee.id}`
      )
    );
    this.state = {
      actionbar: "scripted",
      currentIntervieweeId: this.props.params.chatId,
      // history: [],
      history: localHistory || [],
      intervieweeModal: false,
      replayCachedHistory: true,
      storyDetailsModal: false
    };
    this.findIntervieweeIndex = this.findIntervieweeIndex.bind(this);
    this.initHistory = this.initHistory.bind(this);
    this.onHistoryUpdate = this.onHistoryUpdate.bind(this);
    this.switchChat = this.switchChat.bind(this);
    this.toggleToolbar = this.toggleToolbar.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
  }
  componentDidMount() {
    this.initHistory(); // init history when mounting the component
  }
  componentDidUpdate() {
    this.initHistory(); // init history also when switching between interviewees
  }
  onHistoryUpdate() {
    // grab necessary info
    const { history } = this.state;
    const { story } = this.props;
    const { storyline } = story.interviewees[this.findIntervieweeIndex()];

    // detect conditions
    const thisItem = history[history.length - 1];
    const thisItemIndex = thisItem ? thisItem.i : 0;
    const isThisItemLast = thisItemIndex === storyline.length - 1;

    if (!isThisItemLast) {
      // detect more conditions
      const thisItemType = thisItem ? thisItem.type : null;

      const prevItem = history[history.length - 2];
      const nextItem = storyline[thisItemIndex + 1];
      const secondNextItem = storyline[thisItemIndex + 2];

      const prevRole = prevItem ? prevItem.role : null;
      const nextRole = nextItem ? nextItem.role : null;
      const secondNextRole = secondNextItem ? secondNextItem.role : null;

      const isIntervieweesTurn = nextRole === "interviewee";
      const isUsersTurn = nextRole === "user";
      const willIntervieweeCarryOn = secondNextRole === "interviewee";

      if (thisItemType === "init" && isIntervieweesTurn) {
        setTimeout(() => this.updateHistory("followup"), 1050);
      } else if (thisItemType === "ignore") {
        if (isIntervieweesTurn && willIntervieweeCarryOn) {
          this.updateHistory("skip");
        } else if (isUsersTurn) {
          this.setState({ actionbar: "scripted" });
        } else {
          this.updateHistory("followup");
        }
      } else if (thisItemType === "explore") {
        if (isIntervieweesTurn) {
          this.updateHistory("followup");
        } else if (isUsersTurn) {
          this.setState({ actionbar: "scripted" });
        }
        return null;
      } else if (thisItemType === "followup") {
        // detect more conditions
        const isExploring = prevRole === "user" && prevItem.value === 1;
        if (isExploring && isIntervieweesTurn && willIntervieweeCarryOn) {
          setTimeout(() => this.updateHistory("skip"), 1500);
        } else if (
          isExploring &&
          isIntervieweesTurn &&
          !willIntervieweeCarryOn
        ) {
          this.updateHistory("fastfwd");
        } else if (isIntervieweesTurn) {
          setTimeout(() => this.updateHistory("followup"), 1500);
        } else if (isUsersTurn) {
          setTimeout(() => this.setState({ actionbar: "scripted" }), 2000);
        }
      }
      return null;
    } else if (isThisItemLast) {
      this.updateHistory("quit");
    }
    return null;
  }
  updateHistory(type, payload) {
    // hide actionbar till onHistoryUpdate will trigger another updateHistory loop that will enable it
    this.setState({ actionbar: null });

    // grab necessary info
    const { history } = this.state;
    const thisItem = history[history.length - 1];

    // write history:
    if (type === "ignore" || type === "explore") {
      this.setState({ actionbar: null });
      const action = {
        i: history.length > 0 ? thisItem.i + 1 : 0,
        role: "user",
        type,
        value: payload
      };
      history.push(action);
    } else if (type === "followup") {
      const followup = {
        i: thisItem.i + 1,
        role: "interviewee",
        type: "followup"
      };
      history.push(followup);
    } else if (type === "fastfwd") {
      this.setState({ actionbar: "scripted" });
      const fastfwd = {
        i: thisItem.i + 1,
        type: "fastfwd"
      };
      history.push(fastfwd);
    } else if (type === "skip") {
      this.setState({ actionbar: null });
      const skip = {
        i: thisItem.i + 2,
        role: "interviewee",
        type: "followup"
      };
      history.push(skip);
    } else if (type === "emoji") {
      this.setState({ actionbar: "scripted" });
      const emoji = {
        i: thisItem.i,
        role: "user",
        type: "emoji",
        value: payload
      };
      history.push(emoji);
    } else if (type === "switchTo") {
      this.setState({ actionbar: "scripted" });
      const switchTo = {
        i: thisItem.i - 1,
        role: "system",
        type: "switchTo"
      };
      history.push(switchTo);
    } else if (type === "nvm") {
      this.setState({ actionbar: "scripted" });
      history.splice(-1, 1);
    } else if (type === "quit") {
      const quit = {
        role: "system",
        type: "quit"
      };
      history.push(quit);
    }

    // save updated history in localStorage unless in switch interviewee loop
    if (type !== "nvm" && type !== "switchTo") {
      const { story } = this.props;
      const { interviewees } = story;
      const interviewee = interviewees[this.findIntervieweeIndex()];
      localStorage.setItem(
        `history-${story.id}-${story.version}-${interviewee.id}`,
        JSON.stringify(history)
      );
    }

    // update history to re-render storyline, then fire onHistoryUpdate
    this.setState({ history }, () => this.onHistoryUpdate());
  }
  switchChat(chatId) {
    const { story } = this.props;
    // get the other interviewee’s history saved in localStorage
    const localHistory = JSON.parse(
      localStorage.getItem(`history-${story.id}-${story.version}-${chatId}`)
    );
    this.setState({
      actionbar: "scripted",
      currentIntervieweeId: chatId,
      // history: []
      history: localHistory || []
    });
    this.props.router.push(`/${story.id}/chat/${chatId}`);
  }
  toggleToolbar(toolbar) {
    this.setState({ [toolbar]: !this.state[toolbar] });
  }
  toggleModal(modal) {
    this.setState({ [modal]: !this.state[modal] });
  }
  findIntervieweeIndex() {
    const { interviewees } = this.props.story;
    const { chatId } = this.props.params;
    return interviewees.findIndex((item) => item.id === chatId);
  }
  initHistory() {
    const { interviewees } = this.props.story;
    const { storyline } = interviewees[this.findIntervieweeIndex()];
    const isHistoryEmpty = this.state.history.length === 0;
    const firsStorylineItem = storyline[0];
    const doesIntervieweeStart = firsStorylineItem.role === "interviewee";
    if (isHistoryEmpty && doesIntervieweeStart) {
      const initHistoryItem = {
        i: 0,
        role: "interviewee",
        type: "init"
      };
      this.setState({ history: [initHistoryItem] }, () =>
        this.onHistoryUpdate("init")
      );
    }
    return null;
  }

  render() {
    const { history } = this.state;
    const { story } = this.props;
    const { interviewees } = story;
    const { storyline } = interviewees[this.findIntervieweeIndex()];
    const interviewee = interviewees[this.findIntervieweeIndex()];
    const hasHistory = history.length > 0;

    // if current bubble is the last one
    const isLastBubble = () => {
      if (hasHistory) {
        const thisHistoryItem = history[history.length - 1];
        const thisBubbleI = thisHistoryItem.i;
        const lastBubbleI = storyline.length - 1;
        return thisBubbleI === lastBubbleI || thisHistoryItem.type === "quit";
      }
      return false;
    };

    // if current action should be `nevermind`
    const isNvmBubble = () => {
      if (hasHistory) {
        const thisHistoryItem = history[history.length - 1];
        return thisHistoryItem.type === "switchTo";
      }
      return false;
    };

    // should actionbar side toggles be hidden
    const hideActionbarSatellites =
      !isNvmBubble() && !isLastBubble() && hasHistory;

    const getCurrentScriptActions = (arr) =>
      arr.map((action, i) => {
        if (action.enabled) {
          return (
            <Action
              fixed
              key={action.type}
              onClick={() => this.updateHistory(action.type, i)}
              primary={action.type === "explore"}
              secondary={action.type === "ignore"}
              theme={{ font: "PT sans" }}
            >
              {action.value}
            </Action>
          );
        }
        return null;
      });

    const renderUserActions = () => {
      const isActiveActionbarEmot = this.state.actionbar === "emot";
      const isActiveActionbarRunaway = this.state.actionbar === "runaway";
      const isActiveActionbarScripted = this.state.actionbar === "scripted";
      const userStarts = !hasHistory && storyline[0].role === "user";

      if (hasHistory) {
        const thisHistoryItem = history[history.length - 1];
        const thisItemIndex = thisHistoryItem.i;
        const nextItem = storyline[thisItemIndex + 1];

        const isLastBubbleSwitchTo = thisHistoryItem.type === "switchTo";
        const isTheVeryLastBubble =
          thisItemIndex === storyline.length - 1 ||
          thisHistoryItem.type === "quit";

        if (isTheVeryLastBubble || isActiveActionbarRunaway) {
          return (
            <RunAwayActions
              isSwitchPossible={interviewees.length > 1}
              navigateAway={this.props.router.push}
              updateHistory={this.updateHistory}
              story={this.props.story}
            />
          );
        }
        const isNextHistoryItemUser = nextItem
          ? nextItem.role === "user"
          : false;
        if (isNextHistoryItemUser && isActiveActionbarEmot) {
          return <EmoActions updateHistory={this.updateHistory} />;
        } else if (isLastBubbleSwitchTo) {
          return <NvmActions updateHistory={this.updateHistory} />;
        } else if (isNextHistoryItemUser && isActiveActionbarScripted) {
          return getCurrentScriptActions(nextItem.content);
        }
        return null;
      } else if (userStarts && isActiveActionbarScripted) {
        return getCurrentScriptActions(storyline[0].content);
      } else if (userStarts && isActiveActionbarRunaway) {
        return (
          <RunAwayActions
            isSwitchPossible={interviewees.length > 1}
            navigateAway={this.props.router.push}
            updateHistory={this.updateHistory}
          />
        );
      } else if (userStarts && isActiveActionbarEmot) {
        return <EmoActions updateHistory={this.updateHistory} />;
      }
      return null;
    };

    return [
      <Page key="page">
        <Topbar limit="m" padded>
          <Action
            iconic
            onClick={() => this.props.router.push(`/${story.id}/listing`)}
          >
            <Icon name="arrow-left" />
          </Action>
          <Action onClick={() => this.toggleModal("intervieweeModal")}>
            <Tip title={interviewee.name}>
              <Avatar image={interviewee.avatar} size="l" />
            </Tip>
          </Action>
          <Action iconic onClick={() => this.toggleModal("storyDetailsModal")}>
            <Icon name="info" />
          </Action>
        </Topbar>
        <PageBody flex={[1, 1, `100%`]}>
          {this.state.currentIntervieweeId ? (
            <Storyline
              {...this.props}
              currentIntervieweeId={this.state.currentIntervieweeId}
              history={this.state.history}
              initHistory={this.initHistory}
              interviewee={interviewee}
              story={story}
              storyline={storyline}
              switchChat={this.switchChat}
              updateHistory={this.updateHistory}
            />
          ) : null}
        </PageBody>
        <PageFoot limit="m" flex={[0, 0, `80px`]} padded>
          <Actionbar satellite={hideActionbarSatellites ? "both" : null}>
            {hideActionbarSatellites ? (
              <Action
                iconic
                active={this.state.actionbar === "runaway"}
                onClick={
                  this.state.actionbar !== "runaway"
                    ? () => this.setState({ actionbar: "runaway" })
                    : () => this.setState({ actionbar: "scripted" })
                }
                secondary
              >
                <Icon
                  name={this.state.actionbar === "runaway" ? `cross` : `vdots`}
                />
              </Action>
            ) : null}
            {renderUserActions()}
            {hideActionbarSatellites ? (
              <Action
                iconic
                active={this.state.actionbar === "emot"}
                onClick={
                  this.state.actionbar !== "emot"
                    ? () => this.setState({ actionbar: "emot" })
                    : () => this.setState({ actionbar: "scripted" })
                }
                secondary
              >
                <Icon
                  name={this.state.actionbar === "emot" ? `cross` : `smile`}
                />
              </Action>
            ) : null}
          </Actionbar>
        </PageFoot>
      </Page>,
      this.state.intervieweeModal ? (
        <IntervieweeModal
          {...this.props}
          cta="Get back to chat"
          handleClose={() => this.toggleModal("intervieweeModal")}
          handleSubmit={() => this.toggleModal("intervieweeModal")}
          interviewee={interviewee}
          isOpen={this.state.intervieweeModal !== null}
          key="intervieweeModal"
        />
      ) : null,
      this.state.storyDetailsModal ? (
        <StoryDetailsModal
          handleClose={() => this.toggleModal("storyDetailsModal")}
          isOpen={this.state.storyDetailsModal}
          key="detailsModal"
          story={story}
        />
      ) : null
    ];
  }
}

ChatView.propTypes = {
  router: object,
  params: shape({ chatId: string }).isRequired,
  story: shape({
    title: string
  })
};

ChatView.defaultProps = {
  router: null,
  story: {}
};

export default withRouter(ChatView);
