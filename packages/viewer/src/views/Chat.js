/* eslint react/forbid-prop-types: 0 */
/* eslint no-case-declarations: 0 */
import { object, shape, string } from "prop-types";
import { withRouter } from "react-router";
import React, { Component } from "react";
import {
  Action,
  Avatar,
  Container,
  Dropdown,
  DropdownContent,
  Icon,
  Separator,
  TileAction,
  Tip
} from "interviewjs-styleguide";
import { IntervieweeModal, StoryDetailsModal, Storyline } from "../partials/";
import {
  NvmActions,
  ChatActions,
  Page,
  PageBody,
  PageFoot,
  Topbar,
  RunAwayActions
} from "./chat/";

import LOCALES from "../locales";

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
      history: localHistory || [],
      intervieweeModal: false,
      replayCachedHistory: true,
      runawayDropdown: false,
      storyDetailsModal: false
    };
    this.findIntervieweeIndex = this.findIntervieweeIndex.bind(this);
    this.initHistory = this.initHistory.bind(this);
    this.onHistoryUpdate = this.onHistoryUpdate.bind(this);
    this.resetHistory = this.resetHistory.bind(this);
    this.switchChat = this.switchChat.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
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
    const { story } = this.props;
    const { interviewees } = story;
    const interviewee = interviewees[this.findIntervieweeIndex()];
    localStorage.setItem(
      `history-${story.id}-${story.version}-${interviewee.id}`,
      JSON.stringify(history)
    );

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
  toggleDropdown(dropdown, e) {
    if (e) e.preventDefault();
    this.setState({ [dropdown]: !this.state[dropdown] });
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
  resetHistory() {
    const { story } = this.props;
    const { interviewees } = story;
    const interviewee = interviewees[this.findIntervieweeIndex()];
    localStorage.removeItem(
      `history-${story.id}-${story.version}-${interviewee.id}`
    );
    this.setState({ history: [], actionbar: "scripted" });
    this.initHistory();
  }
  render() {
    const { history } = this.state;
    const { story } = this.props;
    const { interviewees } = story;
    const { storyline } = interviewees[this.findIntervieweeIndex()];
    const interviewee = interviewees[this.findIntervieweeIndex()];
    const hasHistory = history.length > 0;

    const LOCALE = story.locale ? story.locale : "en";
    const LANG = LOCALES[LOCALE];

    const getAction = (action, i) => {
      // console.log(action);
      const { mime, type, value, title } = action;
      if (mime === "image") {
        return (
          <TileAction
            key={type}
            onClick={() => this.updateHistory(type, i)}
            primary
          >
            <span className="span">
              <img className="img" src={value} alt="interviewjsasset" />
            </span>
          </TileAction>
        );
      } else if (mime === "link") {
        return (
          <TileAction
            key={type}
            onClick={() => this.updateHistory(type, i)}
            primary
          >
            {title || value}
          </TileAction>
        );
      } else if (mime === "embed" || mime === "media" || mime === "map") {
        return (
          <TileAction
            key={type}
            onClick={() => this.updateHistory(type, i)}
            primary
          >
            <div
              className="iframe"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </TileAction>
        );
      }
      return (
        // assume mime === 'text' because legacy
        <TileAction
          key={type}
          onClick={() => this.updateHistory(type, i)}
          primary
        >
          {value}
        </TileAction>
      );
    };

    const getActions = (arr) =>
      arr.map((action, i) => (action.enabled ? getAction(action, i) : null));

    const renderActions = () => {
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
              resetHistory={this.resetHistory}
              LANG={LANG}
            />
          );
        }
        const isNextHistoryItemUser = nextItem
          ? nextItem.role === "user"
          : false;
        if (isLastBubbleSwitchTo) {
          return <NvmActions updateHistory={this.updateHistory} LANG={LANG} />;
        } else if (isNextHistoryItemUser && isActiveActionbarScripted) {
          return getActions(nextItem.content);
        }
        return null;
      } else if (userStarts && isActiveActionbarScripted) {
        return getActions(storyline[0].content);
      } else if (userStarts && isActiveActionbarRunaway) {
        return (
          <RunAwayActions
            isSwitchPossible={interviewees.length > 1}
            navigateAway={this.props.router.push}
            updateHistory={this.updateHistory}
            resetHistory={this.resetHistory}
            LANG={LANG}
          />
        );
      }
      return null;
    };

    return [
      <Page key="page">
        <Topbar limit="m" padded>
          <Container flex={[0, 0, `${100 / 3}%`]} align="left">
            <Action
              iconic
              onClick={() => this.props.router.push(`/${story.id}/listing`)}
            >
              <Icon name="arrow-left" />
            </Action>
            <Separator dir="v" size="m" />
            <Dropdown
              html={
                <DropdownContent unlimited>
                  <div>
                    <RunAwayActions
                      LANG={LANG}
                      isSwitchPossible={interviewees.length > 1}
                      navigateAway={this.props.router.push}
                      resetHistory={this.resetHistory}
                      story={this.props.story}
                      updateHistory={this.updateHistory}
                    />
                  </div>
                </DropdownContent>
              }
              onRequestClose={() => this.toggleDropdown("runawayDropdown")}
              open={this.state.runawayDropdown}
            >
              <Action
                iconic
                onClick={(e) => this.toggleDropdown("runawayDropdown", e)}
              >
                <Icon name="hdots" />
              </Action>
            </Dropdown>
          </Container>
          <Container flex={[0, 0, `${100 / 3}%`]}>
            <Action onClick={() => this.toggleModal("intervieweeModal")}>
              <Tip title={interviewee.name}>
                <Avatar image={interviewee.avatar} size="l" />
              </Tip>
            </Action>
          </Container>
          <Container flex={[0, 0, `${100 / 3}%`]} align="right">
            <Action
              iconic
              onClick={() => this.toggleModal("storyDetailsModal")}
            >
              <Icon name="info" />
            </Action>
          </Container>
        </Topbar>
        <PageBody flex={[1, 1, `100%`]}>
          {this.state.currentIntervieweeId ? (
            <Storyline
              {...this.props}
              currentIntervieweeId={this.state.currentIntervieweeId}
              history={this.state.history}
              initHistory={this.initHistory}
              interviewee={interviewee}
              LANG={LANG}
              story={story}
              storyline={storyline}
              switchChat={this.switchChat}
              updateHistory={this.updateHistory}
            />
          ) : null}
        </PageBody>
        <PageFoot limit="m" flex={[0, 0, `126px`]}>
          <ChatActions>{renderActions()}</ChatActions>
        </PageFoot>
      </Page>,
      this.state.intervieweeModal ? (
        <IntervieweeModal
          {...this.props}
          cta={LANG.chatGetBack}
          handleClose={() => this.toggleModal("intervieweeModal")}
          handleSubmit={() => this.toggleModal("intervieweeModal")}
          interviewee={interviewee}
          isOpen={this.state.intervieweeModal !== null}
          key="intervieweeModal"
          LANG={LANG}
        />
      ) : null,
      this.state.storyDetailsModal ? (
        <StoryDetailsModal
          handleClose={() => this.toggleModal("storyDetailsModal")}
          isOpen={this.state.storyDetailsModal}
          key="detailsModal"
          story={story}
          LANG={LANG}
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
