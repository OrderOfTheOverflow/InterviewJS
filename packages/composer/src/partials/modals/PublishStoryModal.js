/* eslint react/forbid-prop-types: 0 */
import css from "styled-components";
import React, { Component } from "react";
import ReactModal from "react-modal";
import { arrayOf, bool, func, number, object } from "prop-types";
import { Storage } from "aws-amplify";
import shortUuid from "short-uuid";
import uuidv5 from "uuid/v5";

import {
  Action,
  Actionbar,
  Breadcrumb,
  Breadcrumbs,
  Container,
  Modal,
  ModalBody,
  ModalHead,
  PageSubtitle,
  PageTitle,
  Separator,
  radius,
  Preloader,
  Text
} from "interviewjs-styleguide";

import { DetailsForm, MetaForm, Poll } from "../";

import iframeRatioSpacer from "./iframeRatioSpacer.png";

const uuidv4 = () => shortUuid().fromUUID(shortUuid.uuid());

const getStepState = (step, i) => {
  if (step === i) {
    return "active";
  } else if (step > i) {
    return "passed";
  }
  return null;
};

const PreviewWrapper = css.div`
  border-radius: ${radius.m};
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  overflow: hidden;
  position: relative;
  width: 100%;
  img {
    display: block;
    width: 100%;
  }
  iframe {
    height: 100%;
    left: 0;
    max-width: 100% !important;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

const PlaceHolder = css.div`
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 6px;
  font-family: "PT Serif",serif;
  display: block;
  font-size: 14px;
  color: #28336e;
  line-height: 20px;
  margin: 10px 0;
  padding: 20px;
  vertical-align: baseline;
  width: 100%
`;

const LoaderContainer = css.div`
  position: absolute;
  top:50%;
  transform: translateY(-50%);
`;

const computeId = (userId, storyId) => {
  let namespace = userId;
  if (namespace.indexOf(":") > 0) namespace = namespace.split(":").pop();

  let id = storyId;
  if (id.indexOf("_")) id = id.split("_").pop();
  if (id.length < 36) id = shortUuid().toUUID(id);

  const uuid = uuidv5(id, namespace);
  return shortUuid().fromUUID(uuid);
};

export default class PublishStoryModal extends Component {
  constructor(props) {
    super(props);

    let storyBase = "/"; // FIXME: local-dev url?
    switch (document.location.hostname) {
      case "composer.interviewjs.net.s3-website-us-east-1.amazonaws.com":
        storyBase =
          "http://story.interviewjs.net.s3-website-us-east-1.amazonaws.com";
        break;
      case "composer.interviewjs.net":
        storyBase = "https://story.interviewjs.net/";
        break;
      case "localhost":
        storyBase = "https://story.interviewjs.net/"; // FIXME: local-dev url?
        break;
      default:
        storyBase = "https://story.interviewjs.io/"; // production
    }
    // const { story } = this.props;

    this.state = {
      step: 0,
      storyKey: null,
      storyBase,
      embedModal: false
    };

    this.handleStep0 = this.handleStep0.bind(this);
    this.handleStep1 = this.handleStep1.bind(this);
    this.handleStep2 = this.handleStep2.bind(this);
    this.handleStep3 = this.handleStep3.bind(this);
    this.toggleEmbedModal = this.toggleEmbedModal.bind(this);
  }

  componentDidMount() {
    const { publishShortcut } = this.state;
    if (publishShortcut) this.handleStep2();
  }

  componentDidUpdate() {
    if (this.iframe) {
      this.iframe.addEventListener("load", () => {
        // console.log("iframe loaded");
        if (!this.state.storyKey)
          setTimeout(
            () => this.iframe.contentWindow.postMessage(this.props.story, "*"),
            5000
          );
      });
    }
  }

  handleStep0(data) {
    this.props.updateStory(data, this.props.storyIndex);
    return this.setState({ step: this.state.step + 1 });
  }

  handleStep1(data) {
    this.props.updateStory(data, this.props.storyIndex);
    this.setState({ step: this.state.step + 1 });
  }

  handleStep2() {
    const { story } = this.props;
    if (story.ignore) {
      this.setState({
        step: this.state.publishShortcut ? 3 : this.state.step + 1,
        storyKey: null
      });

      return;
    }

    story.composer = {
      host: document.location.hostname,
      version: process.env.VERSION
    };
    Storage.put(
      `stories/${this.props.user.id}/${story.id}/story.json`,
      JSON.stringify(story),
      {
        bucket: "data.interviewjs.io",
        level: "public",
        contentType: "application/json"
      }
    )
      .then(async (result) => {
        console.log(result);
        this.setState({
          step: this.state.publishShortcut ? 3 : this.state.step + 1,
          storyKey: computeId(this.props.user.id, this.props.story.id)
        });
        localStorage.setItem(`publishShortcut-${story.id}`, true);
      })
      .catch((err) => console.log(err));
  }

  handleStep3() {
    this.props.router.push("/stories");
  }

  toggleEmbedModal() {
    this.setState({
      embedModal: !this.state.embedModal
    });
  }

  render() {
    const iframeViewer = `${this.state.storyBase}${
      this.state.storyKey ? this.state.storyKey : this.props.story.id
    }`;

    const { step } = this.state;
    const getModalBody = () => {
      if (step === 0) {
        return (
          <Container limit="s" align="center">
            <PageSubtitle typo="h3">Review your story details…</PageSubtitle>
            <Separator size="m" silent />
            <MetaForm
              handleSubmit={this.handleStep0}
              story={this.props.story}
              user={this.props.user}
              cta="Confirm"
              required
            />
          </Container>
        );
      } else if (step === 1) {
        return (
          <Container limit="s" align="center">
            <PageSubtitle typo="h3">
              Give the readers a quest, tell them what they will learn about a
              topic when speaking to the interviewees.
            </PageSubtitle>
            <Separator size="m" silent />
            <DetailsForm
              handleSubmit={this.handleStep1}
              story={this.props.story}
              cta="Confirm"
              required
            />
          </Container>
        );
      } else if (step === 2) {
        return (
          <Container limit="s" align="center">
            <PageSubtitle typo="h3">
              Engage your readers by asking them to have their say. Create
              questions based on the content of your story with a clear choice.
              You need at least one question.
            </PageSubtitle>
            <Separator size="m" silent />
            <Poll
              {...this.props}
              cta="Publish Story"
              handleSubmit={this.handleStep2}
              story={this.props.story}
            />
          </Container>
        );
      } else if (step === 3) {
        return (
          <Container limit="s" align="center">
            <PageSubtitle typo="h3">
              Well done! Your story is now up and running. Here’s a preview:
            </PageSubtitle>
            <Separator size="m" silent />
            <PageSubtitle typo="h4">
              Grab the link and share on social:
            </PageSubtitle>
            <Separator size="s" silent />
            {this.state.storyKey ? (
              <Action target="_blank" href={`${iframeViewer}/`}>
                {`${iframeViewer}/`}
              </Action>
            ) : (
              ""
            )}
            <Separator size="m" silent />
            <PreviewWrapper>
              <LoaderContainer>
                <Preloader />
                <Separator size="s" silent />
                <Text>
                  Please wait. Your InterviewJS story is being created.
                </Text>
                <Separator size="m" silent />
              </LoaderContainer>
              <img src={iframeRatioSpacer} alt="" />
              <iframe
                title="Preview"
                src={`${iframeViewer}?${uuidv4()}/nolocalstorage`}
                ref={(iframe) => {
                  this.iframe = iframe;
                }}
              >
                {" "}
              </iframe>
            </PreviewWrapper>
            <Separator size="m" silent />
            <PageSubtitle typo="h4">
              You can edit a story any time by accessing it via your library. Re-publish to save the changes—the link stays the same.
            </PageSubtitle>
            <Separator size="m" silent />
            <Actionbar>
              <Action fixed secondary onClick={this.handleStep3}>
                My story library
              </Action>
              <Action fixed primary onClick={this.toggleEmbedModal}>
                Embed
              </Action>
            </Actionbar>
            <ReactModal isOpen={this.state.embedModal} ariaHideApp={false}>
              <Modal handleClose={this.toggleEmbedModal}>
                <ModalHead fill="grey">
                  <PageTitle typo="h2">Embed Code</PageTitle>
                  <Separator size="s" silent />
                </ModalHead>
                <ModalBody>
                  <Text>
                    Copy the code below and embed it in your HTML editor
                  </Text>
                  <PlaceHolder>
                    {`<iframe width='100%' height='768px' src='${iframeViewer}'>
                    </iframe>`}
                  </PlaceHolder>
                </ModalBody>
              </Modal>
            </ReactModal>
          </Container>
        );
      }
      return null;
    };
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={this.props.isOpen} // TODO
        key="PublishStoryModal"
        onRequestClose={this.props.handleClose}
        role="dialog"
      >
        <Modal {...this.props} wizard>
          <ModalHead>
            <PageTitle typo="h1">Publish Story</PageTitle>
            <Separator size="s" silent />
            <Breadcrumbs count={4}>
              <Breadcrumb
                onClick={step >= 0 ? () => this.setState({ step: 0 }) : null}
                state={getStepState(step, 0)}
              >
                Review basic info
              </Breadcrumb>
              <Breadcrumb
                onClick={step >= 1 ? () => this.setState({ step: 1 }) : null}
                state={getStepState(step, 1)}
              >
                Review context
              </Breadcrumb>
              <Breadcrumb
                onClick={step >= 2 ? () => this.setState({ step: 2 }) : null}
                state={getStepState(step, 2)}
              >
                Add closing poll
              </Breadcrumb>
              <Breadcrumb
                onClick={step >= 3 ? () => this.setState({ step: 3 }) : null}
                state={getStepState(step, 3)}
              >
                Share your story
              </Breadcrumb>
            </Breadcrumbs>
          </ModalHead>
          <Separator size="s" silent />
          <ModalBody>{getModalBody()}</ModalBody>
        </Modal>
      </ReactModal>
    );
  }
}

PublishStoryModal.propTypes = {
  createInterviewee: func.isRequired,
  createStory: func.isRequired,
  deleteInterviewee: func.isRequired,
  handleClose: func.isRequired,
  isOpen: bool.isRequired,
  router: object.isRequired,
  stories: arrayOf(object),
  storyIndex: number.isRequired,
  updateInterviewee: func.isRequired,
  updateStory: func.isRequired,
  story: object.isRequired,
  user: object.isRequired
};

PublishStoryModal.defaultProps = {
  stories: []
};
