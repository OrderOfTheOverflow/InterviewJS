import React from "react";
import css from "styled-components";
import ReactModal from "react-modal";
import { bool, func, shape, string } from "prop-types";
import {
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";

import {
  Action,
  Actionbar,
  Container,
  Modal,
  ModalBody,
  ModalFoot,
  ModalHead,
  PageSubtitle,
  PageTitle,
  Separator,
  color,
  setSpace
} from "interviewjs-styleguide";

const ShareButtons = css.div`
  text-align: center;
  & > * {
    ${setSpace("mhs")};
    cursor: pointer;
    display: inline-block;
  }
`;

export default class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { story, LANG } = this.props;
    const storyUrl = window.location.href.replace(/results/g, "");
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.handleClose}
        role="dialog"
        style={{ overlay: { background: color.shadowM } }}
      >
        <Modal {...this.props}>
          <ModalHead>
            <PageTitle typo="p4">“{story.title}”</PageTitle>
            <Separator silent size="x" />
            <PageSubtitle typo="h2">{LANG.shareTitle}</PageSubtitle>
          </ModalHead>
          <ModalBody>
            <Container align="center">
              <ShareButtons>
                <TwitterShareButton
                  url={storyUrl}
                  hashtags={["interviewjs"]}
                  title={story.title}
                >
                  <TwitterIcon size={44} round />
                </TwitterShareButton>
                <LinkedinShareButton url={storyUrl} title={story.title}>
                  <LinkedinIcon size={44} round />
                </LinkedinShareButton>
                <EmailShareButton
                  url={storyUrl}
                  subject={story.title}
                  body={`You have to see this: ${storyUrl} #interviewjs`}
                >
                  <EmailIcon size={44} round />
                </EmailShareButton>
              </ShareButtons>
            </Container>
          </ModalBody>
          <ModalFoot>
            <Actionbar>
              <Action primary fixed onClick={this.props.handleClose}>
                {LANG.shareCloseButton}
              </Action>
            </Actionbar>
          </ModalFoot>
        </Modal>
      </ReactModal>
    );
  }
}

ShareModal.propTypes = {
  handleClose: func.isRequired,
  isOpen: bool.isRequired,
  story: shape({
    title: string.isRequired
  }).isRequired
};

ShareModal.defaultProps = {};
