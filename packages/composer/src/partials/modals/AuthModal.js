import React from "react";
import ReactModal from "react-modal";
import { bool, func } from "prop-types";
import { Auth } from "aws-amplify";

import {
  Text,
  Actionbar,
  Action,
  TextInput,
  PaneTabs,
  PaneTab,
  Container,
  Animator,
  Bubble,
  BubbleGroup,
  Bubbles,
  Modal,
  ModalBody,
  ModalFoot,
  color
} from "interviewjs-styleguide";


export default class AuthModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      code: "",
      newPassword: "",
      activeTab: "signIn",
      message: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleConfirmSignUp = this.handleConfirmSignUp.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleConfirmForgotPassword = this.handleConfirmForgotPassword.bind(this);
    this.handleTabActivation = this.handleTabActivation.bind(this);
  }

  handleTabActivation(activeTab) {
    this.setState({ activeTab });
  }

  handleInputChange({ target }) {
    this.clearMessage();
    const { value, name } = target;

    this.setState({
      [name]: value
    });
  }

  raiseError(error) {
    console.log(error);
    this.setState({ message: error.message });
  }

  raiseMessage(message, data) {
    this.setState({ message });
    if (data) console.log(data);
  }

  clearMessage() {
    this.setState({ message: "" });
  }

  handleSignIn() {
    const { username, password } = this.state;

    Auth.signIn(username, password)
      .then(async user => {
          const info = await Auth.currentUserInfo();
          if (user && info) {
            this.raiseMessage("OK", info);
            this.props.handleAuthentication(info);
          }
      })
      .catch(error => this.raiseError(error));
  }

  handleSignUp() {
    const { username, password, email } = this.state;

    Auth.signUp({
      username, password,
      attributes: { email }
    })
      .then(data => this.raiseMessage("Check your email for access code", data))
      .catch(error => this.raiseError(error));
  }

  handleConfirmSignUp() {
    const { username, code } = this.state;

    Auth.confirmSignUp(username, code)
      .then(data => this.raiseMessage("Now please sign in", data))
      .catch(error => this.raiseError(error));
  }

  handleForgotPassword() {
    const { username } = this.state;

    Auth.forgotPassword(username)
      .then(data => this.raiseMessage("Check your email for access code", data))
      .catch(error => this.raiseError(error));
  }

  handleConfirmForgotPassword() {
    const { username, code, newPassword } = this.state;

    Auth.forgotPasswordSubmit(username, code, newPassword)
      .then(data => this.raiseMessage("Now please sign in", data))
      .catch(error => this.raiseError(error));
  }

  render() {
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.handleClose}
        overlayClassName="ReactModal__HeroOverlay"
        role="dialog"
      >
        <Modal {...this.props} persistent transparent>
          <ModalBody>
            <BubbleGroup>
              <Bubbles persona="interviewee">
                <Bubble
                  animated
                  persona="interviewee"
                  theme={{ backg: color.flareLLt, color: color.white }}
                >
                  Welcome!
                </Bubble>
                <Bubble
                  animated
                  delay={1000}
                  persona="interviewee"
                  theme={{ backg: color.flareLLt, color: color.white }}
                >
                  InterviewJS will help you tell interactive stories by
                  converting your interviews into a chat experiences.
                </Bubble>
                <Bubble
                  animated
                  delay={2000}
                  persona="interviewee"
                  theme={{ backg: color.flareLLt, color: color.white }}
                >
                  To continue, please sign in.
                </Bubble>
              </Bubbles>
            </BubbleGroup>
          </ModalBody>
          <ModalFoot>
            <Animator delay={3000}>
              <Container rounded fill="white">
                <PaneTabs>
                  <PaneTab opinionated active={this.state.activeTab === "signIn"} onClick={() => this.handleTabActivation("signIn")}>Sign In</PaneTab>
                  <PaneTab opinionated active={this.state.activeTab === "signUp"} onClick={() => this.handleTabActivation("signUp")}>Sign Up</PaneTab>
                  <PaneTab opinionated active={this.state.activeTab === "forgotPassword"} onClick={() => this.handleTabActivation("forgotPassword")}>Reset Password</PaneTab>
                </PaneTabs>

                <Text typo="h3">{ this.state.message }</Text>

                { this.state.activeTab === "signIn" ?
                  <div style={{ padding: "1em" }}>
                    <TextInput input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleInputChange} />
                    <TextInput input type="password" name="password" placeholder="password" onChange={this.handleInputChange} />
                    <Actionbar>
                      <Action fixed primary onClick={this.handleSignIn}>Sign in</Action>
                    </Actionbar>
                  </div>
                 : null
                }

                { this.state.activeTab === "signUp" ?
                  <div style={{ padding: "1em" }}>
                    <Text typo="h4">Step 1</Text>
                    <TextInput input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleInputChange} />
                    <TextInput input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInputChange} />
                    <TextInput input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.handleInputChange} />
                    <Actionbar>
                      <Action fixed primary onClick={this.handleSignUp}>Sign up</Action>
                    </Actionbar>
                    <Text typo="h4">Step 2</Text>
                    <TextInput input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleInputChange} />
                    <TextInput input type="text" name="code" placeholder="confirmation code" value={this.state.code} onChange={this.handleInputChange} />
                    <Actionbar>
                      <Action fixed primary onClick={this.handleConfirmSignUp}>Confirm sign up</Action>
                    </Actionbar>
                  </div>
                  : null
                }

                { this.state.activeTab === "forgotPassword" ?
                  <div style={{ padding: "1em" }}>
                    <Text typo="h4">Step 1</Text>
                    <TextInput input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleInputChange} />
                    <Actionbar>
                      <Action fixed primary onClick={this.handleForgotPassword}>Forgot password</Action>
                    </Actionbar>
                    <Text typo="h4">Step 2</Text>
                    <TextInput input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleInputChange} />
                    <TextInput input type="text" name="code" placeholder="confirmation code" value={this.state.code} onChange={this.handleInputChange} />
                    <TextInput input type="password" name="newPassword" placeholder="new password" value={this.state.newPassword} onChange={this.handleInputChange} />
                    <Actionbar>
                      <Action fixed primary onClick={this.handleConfirmForgotPassword}>Confirm forgot password</Action>
                    </Actionbar>
                  </div>
                  : null
                }
              </Container>
            </Animator>
          </ModalFoot>
        </Modal>
      </ReactModal>
    );
  }
}

AuthModal.propTypes = {
  handleAuthentication: func.isRequired,
  handleClose: func,
  isOpen: bool
};

AuthModal.defaultProps = {
  handleClose: null,
  isOpen: true
};

AuthModal.defaultProps = {};
