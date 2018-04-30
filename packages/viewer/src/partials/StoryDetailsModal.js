import css from "styled-components";
import React from "react";
import ReactModal from "react-modal";
import { bool, func, shape } from "prop-types";

import {
  Action,
  Actionbar,
  Container,
  Icon,
  Modal,
  PageSubtitle,
  Separator,
  color,
  font,
  setSpace,
  setType,
} from "interviewjs-styleguide";

import { Cover, PageBody, PageHead } from "../partials";

const Topbar = css(Container)`
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5;
`;

const TopbarHolder = css(Container)`
  align-content: flex-end;
  align-items: flex-end;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ModalBody = css(Container)`
  ${setSpace("pbh")};
  background: ${color.black};
  color: ${color.white};
  min-height: 100vh;
  min-width: 100vw;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const DetailsCopy = css.div`
  ${setType("s")};
  text-align: left;
  font-family: ${font.serif};
  h2 {
    ${setType("m")};
    color: ${color.greyBlk};
  }
  h3 {
    ${setType("s")};
    font-weight: bold;
    color: ${color.greyBlk};
  }
  p {
    ${setSpace("mbm")};
    ${setType("s")};
  }
  dl {

  }
  dt {
    color: ${color.greyBlk};
    display: block;
  }
  dd {
    ${setSpace("mbm")};
    display: block;
  }
  a {
    color: white;
    text-decoration: underline;
  }
`;

export default class StoryDetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { story } = this.props;
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.handleClose}
        role="dialog"
        style={{ overlay: { background: "none" } }}
      >
        <Topbar>
          <TopbarHolder limit="m" padded>
            <Action inverted iconic onClick={this.props.handleClose}>
              <Icon name="cross" />
            </Action>
          </TopbarHolder>
        </Topbar>
        <Modal wizard persistent>
          <ModalBody cover>
            <PageHead flex={[0, 1, `${100 / 2}%`]}>
              <Cover image={story.cover} compact />
            </PageHead>
            <PageBody limit="x" flex={[1, 0, `${100 / 2}%`]}>
              <PageSubtitle typo="h3">Credits</PageSubtitle>
              <Separator silent size="m" />
              <DetailsCopy>
                <dl>
                  {story.title ? [<dt>Full title</dt>, <dd>{story.title}</dd>] : null}
                  {story.author && story.authorLink
                    ? [
                        <dt>Author</dt>,
                        <dd>
                          <a href={story.authorLink} target="_blank" rel="noopener noreferrer">
                            {story.author}
                          </a>
                        </dd>,
                      ]
                    : null}
                  {!story.author && story.authorLink
                    ? [
                        <dt>Author link</dt>,
                        <dd>
                          <a href={story.authorLink} target="_blank" rel="noopener noreferrer">
                            {story.authorLink}
                          </a>
                        </dd>,
                      ]
                    : null}
                  {story.pubDate ? [<dt>Published</dt>, <dd>{story.pubDate}</dd>] : null}
                </dl>
              </DetailsCopy>
              <Separator silent size="m" />
              <PageSubtitle typo="h5">About InterviewJS</PageSubtitle>
              <Separator silent size="m" />
              <DetailsCopy>
                <p>
                  Turn interview transcripts into shareable and embeddable interactive chats—InterviewJS is an open-source
                  Google DNI & Al Jazeera-backed web app for newsrooms that enables journalists to compose and manage 
                  scripted chats for a more immersive storytelling experience.
                </p>
                <p>
                  If you want to make interview.js story please visit our website www.interviewjs.io
                </p>
              </DetailsCopy>
              <Separator silent size="m" />
              <PageSubtitle typo="h5">Connect with InterviewJS</PageSubtitle>
              <Separator silent size="m" />
              <DetailsCopy>
                <p>
                  InterviewJS is an open-source software happily accepting stars, forks and PRs on Github and followers
                  on Twitter:
                </p>
              </DetailsCopy>
              <Separator silent size="m" />
              <Actionbar>
                <Action href="https://github.com/AJInteractive/InterviewJS" target="_blank" inverted fixed>
                  <Icon name="github" /> Github
                </Action>
                <Action href="https://twitter.com/interview_js" target="_blank" inverted fixed>
                  <Icon name="twitter" /> Twitter
                </Action>
              </Actionbar>
            </PageBody>
          </ModalBody>
        </Modal>
      </ReactModal>
    );
  }
}

StoryDetailsModal.propTypes = {
  handleClose: func.isRequired,
  isOpen: bool.isRequired,
  story: shape({}).isRequired,
};

StoryDetailsModal.defaultProps = {};
