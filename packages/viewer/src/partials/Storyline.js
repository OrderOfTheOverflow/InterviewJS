/* eslint react/no-danger: 0 */
import { arrayOf, func, string, object, shape } from "prop-types";
import styled, { keyframes } from "styled-components";
import React, { Component } from "react";
import { withRouter } from "react-router";

import {
  Action,
  Avatar,
  Bubble,
  BubbleBlock,
  Container,
  Message,
  color,
  setSpace
} from "interviewjs-styleguide";

const fader = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StorylineEl = styled(Container)`
  ${setSpace("phm")};
  border-left: 1px solid ${color.greyHL};
  border-right: 1px solid ${color.greyHL};
  bottom: 0;
  height: 100%;
  left: 0;
  overflow-y: auto;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  top: 0;
  & > * {
    ${setSpace("mvm")};
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

const AvatarHolder = styled(Container)`
  ${setSpace("prs")};
`;

const BubbleAvatar = styled(Container)`
  opacity: 0;
  animation-delay: 350ms;
  animation-direction: normal;
  animation-duration: 350ms;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-name: ${fader};
  animation-play-state: running;
  animation-timing-function: ease-in;
`;

const Push = styled.div`
  height: calc(100% - 80px);
  margin: 0;
  padding: 0;
`;

class Storyline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replayCachedHistory: true
    };
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  componentDidMount() {
    setTimeout(() => this.scrollToBottom("instant"), 0);
    setTimeout(() => this.scrollToBottom("instant"), 300);
    setTimeout(() => this.scrollToBottom("instant"), 400);
    this.setState({ replayCachedHistory: false });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIntervieweeId !== this.props.currentIntervieweeId) {
      this.setState({ replayCachedHistory: true });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentIntervieweeId !== this.props.currentIntervieweeId) {
      this.setState({ replayCachedHistory: false });
      setTimeout(() => this.scrollToBottom("instant"), 0);
      setTimeout(() => this.scrollToBottom("instant"), 350);
    }
    setTimeout(() => this.scrollToBottom(), 0);
    setTimeout(() => this.scrollToBottom(), 350);
    setTimeout(() => this.scrollToBottom(), 700);
    setTimeout(() => this.scrollToBottom(), 1050);
    setTimeout(() => this.scrollToBottom(), 1400);
    setTimeout(() => this.scrollToBottom(), 1750);
  }
  scrollToBottom(behaviour) {
    return this.anchor
      ? this.anchor.parentElement.scroll({
          top: this.anchor.offsetTop,
          left: 0,
          behavior: behaviour || "smooth"
        })
      : null;
  }
  render() {
    const { storyline, history, interviewee, story, LANG } = this.props;
    const { replayCachedHistory } = this.state;

    // const animateAndDelay = true;
    const animateAndDelay = !replayCachedHistory;

    const renderIntervieweeBubble = (item, index) => {
      const { content, type } = storyline[item.i];

      const getBubbleContent = () => {
        switch (type) {
          case "text":
            return [
              <p>{content.value}</p>,
              content.source ? (
                <a href={content.source}>{LANG.chatBubbleSource}</a>
              ) : null
            ];
          case "image":
            return [
              <img src={content.value} alt={content.title} key="image" />,
              content.title ? <p key="caption">{content.title}</p> : null
            ];
          case "link":
            return (
              <a href={content.value} target="_blank">
                {content.title ? content.title : content.value}
              </a>
            );
          case "embed":
          case "map":
          case "media":
            return <div dangerouslySetInnerHTML={{ __html: content.value }} />;
          default:
            return null;
        }
      };

      const getBubbleDisplayType = () => {
        const isEmbed = ["embed", "media", "map"].includes(type);
        const isImage = type === "image";
        if (isEmbed) {
          return "embed";
        } else if (isImage) {
          return "rich";
        }
        return "plain";
      };

      return (
        <Container
          dir="row"
          style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
        >
          <BubbleAvatar dir="column" flex={[0, 0, "auto"]}>
            <Avatar
              size="s"
              image={interviewee.avatar}
              style={{ margin: "0 5px 2px 0" }}
            />
          </BubbleAvatar>
          <Container flex={[1, 1, "100%"]}>
            <BubbleBlock key={index} persona="interviewee">
              <Bubble
                animated={animateAndDelay}
                delay={animateAndDelay ? 350 : null}
                displayType={getBubbleDisplayType()}
                loading={animateAndDelay}
                persona="interviewee"
                theme={{ backg: interviewee.color, font: "PT sans" }}
              >
                {getBubbleContent()}
              </Bubble>
            </BubbleBlock>
          </Container>
        </Container>
      );
    };

    const renderUserBubble = (item, index) => {
      const { type } = item;

      const getBubbleContent = () => {
        if (type === "ignore" || type === "explore") {
          const { i } = item;
          const { content } = storyline[i];
          const filterByType = () =>
            content.findIndex((contentEl) => contentEl.type === type);

          const bubble = content[filterByType()];
          if (bubble.mime === "image") {
            return [
              <img src={bubble.value} alt={bubble.title} key="image" />,
              bubble.title ? <p key="caption">{bubble.title}</p> : null
            ];
          } else if (
            bubble.mime === "map" ||
            bubble.mime === "embed" ||
            bubble.mime === "media"
          ) {
            return <div dangerouslySetInnerHTML={{ __html: bubble.value }} />;
          } else if (bubble.mime === "link") {
            return (
              <a href={bubble.value} target="_blank" style={{ color: "white" }}>
                {bubble.title ? bubble.title : bubble.value}
              </a>
            );
          }
          return bubble.value; // assume 'text' because legacy
        }
        return null;
      };

      const getBubbleDisplayType = () => {
        const { i } = item;
        const { content } = storyline[i];
        const filterByType = () =>
          content.findIndex((contentEl) => contentEl.type === type);
        const bubble = content[filterByType()];

        const isEmbed = ["embed", "media", "map"].includes(bubble.mime);
        const isImage = bubble.mime === "image";
        if (isEmbed) {
          return "embed";
        } else if (isImage) {
          return "rich";
        }
        return "plain";
      };

      return (
        <BubbleBlock key={index} persona="user">
          <Bubble
            persona="user"
            animated={animateAndDelay}
            displayType={getBubbleDisplayType()}
            theme={{ font: "PT sans" }}
          >
            {getBubbleContent()}
          </Bubble>
        </BubbleBlock>
      );
    };

    const renderSystemBubble = (item, index) => {
      const { type } = item;
      if (type === "switchTo") {
        return (
          <BubbleBlock key={index}>
            <Bubble persona="system" theme={{ font: "PT sans" }}>
              {LANG.chatChooseAnother}
            </Bubble>
            {story.interviewees.map(
              (character, i) =>
                character.id !== this.props.currentIntervieweeId ? (
                  <Bubble
                    key={character.name}
                    persona="system"
                    onClick={() => this.props.switchChat(character.id)}
                    theme={{ font: "PT sans" }}
                  >
                    <Container dir="row">
                      <AvatarHolder flex={[1, 0, "auto"]}>
                        <Avatar image={character.avatar} size="s" />
                      </AvatarHolder>
                      <Container flex={[1, 1, "100%"]}>
                        <Action
                          onClick={() => this.props.switchChat(character.id)}
                        >
                          {character.name}
                        </Action>
                      </Container>
                    </Container>
                  </Bubble>
                ) : null
            )}
          </BubbleBlock>
        );
      } else if (type === "quit") {
        return (
          <Message delay={500}>
            {interviewee.name} {LANG.chatLeft}
          </Message>
        );
      }
      return null;
    };

    console.log("—— History: ", this.props.history);
    return (
      <StorylineEl limit="m">
        <Push />
        {history.length > 0
          ? history.map((item, index) => {
              const { role } = item;
              if (role === "interviewee") {
                return renderIntervieweeBubble(item, index);
              } else if (role === "user") {
                return renderUserBubble(item, index);
              } else if (role === "system") {
                return renderSystemBubble(item, index);
              }
              return null;
            })
          : null}
        <div
          ref={(el) => {
            this.anchor = el;
          }}
        />
      </StorylineEl>
    );
  }
}

Storyline.propTypes = {
  history: arrayOf(object),
  currentIntervieweeId: string.isRequired,
  switchChat: func.isRequired,
  interviewee: shape({
    color: string.isRequired
  }).isRequired,
  storyline: arrayOf(object),
  story: shape({
    interviewees: arrayOf(object)
  })
};

Storyline.defaultProps = {
  history: [],
  storyline: [],
  story: {}
};

export default withRouter(Storyline);
