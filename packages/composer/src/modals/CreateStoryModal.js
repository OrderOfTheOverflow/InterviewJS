import React from "react";
import ReactModal from "react-modal";
import { arrayOf, bool, func, object } from "prop-types";

import {
  Breadcrumb,
  Breadcrumbs,
  Container,
  Modal,
  ModalBody,
  ModalFoot,
  ModalHead,
  PageTitle,
  PageSubtitle,
  Separator
} from "interviewjs-styleguide";

import { StoryDetailsForm, StoryMetaForm } from "../forms";

const getStepState = (step, i) => {
  if (step === i) {
    return "active";
  } else if (step > i) {
    return "passed";
  }
  return null;
};

export default class CreateStoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
    this.handleStep0 = this.handleStep0.bind(this);
    this.handleStep1 = this.handleStep1.bind(this);
  }
  handleStep0(data) {
    this.props.handleCreateStory(data);
    this.setState({ step: this.state.step + 1 });
  }
  handleStep1(data) {
    this.props.handleUpdateStory(data, 0);
    this.setState({ step: this.state.step + 1 });
  }
  render() {
    const { step } = this.state;
    const getModalBody = () => {
      if (this.state.step === 0) {
        return (
          <Container limit="s" align="center">
            <Separator size="m" effect="silent" />
            <PageSubtitle typo="h3">
              Start by adding a few details and meta info about your story. You
              can attach a cover photo and your organisation logo here too.
            </PageSubtitle>
            <Separator size="m" effect="silent" />
            <StoryMetaForm
              handleCancel={this.props.handleClose}
              handleSubmit={this.handleStep0}
            />
          </Container>
        );
      } else if (this.state.step === 1) {
        return (
          <Container limit="s" align="center">
            <Separator size="m" effect="silent" />
            <PageSubtitle typo="h3">
              Add interviewees for the user to chat to. You will be able to
              script separate chats for each interviewee later.
            </PageSubtitle>
            <Separator size="m" effect="silent" />
            <StoryDetailsForm
              handleSubmit={this.handleStep1}
              story={this.props.stories[0]}
            />
          </Container>
        );
      } else if (this.state.step === 2) {
        return (
          <Container limit="s" align="center">
            Step 3
          </Container>
        );
      }
      return null;
    };
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={this.props.isOpen}
        key="CreateStoryModal"
        onRequestClose={this.props.handleClose}
      >
        <Modal {...this.props} wizard>
          <ModalHead>
            <PageTitle typo="h1">Create New Story</PageTitle>
            <Separator size="s" effect="silent" />
            <Breadcrumbs count={3}>
              <Breadcrumb
                onClick={step >= 0 ? () => this.setState({ step: 0 }) : null}
                state={getStepState(step, 0)}
              >
                Basic info
              </Breadcrumb>
              <Breadcrumb
                onClick={step >= 1 ? () => this.setState({ step: 1 }) : null}
                state={getStepState(step, 1)}
              >
                Intro
              </Breadcrumb>
              <Breadcrumb
                onClick={step >= 2 ? () => this.setState({ step: 2 }) : null}
                state={getStepState(step, 2)}
              >
                Interviewees
              </Breadcrumb>
            </Breadcrumbs>
          </ModalHead>
          <ModalBody>{getModalBody()}</ModalBody>
          <ModalFoot />
        </Modal>
      </ReactModal>
    );
  }
}

CreateStoryModal.propTypes = {
  handleClose: func.isRequired,
  handleCreateStory: func.isRequired,
  handleUpdateStory: func.isRequired,
  isOpen: bool.isRequired,
  stories: arrayOf(object)
};

CreateStoryModal.defaultProps = {
  stories: []
};
