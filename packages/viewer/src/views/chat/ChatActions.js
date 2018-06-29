import {} from "interviewjs-styleguide";
import {} from "prop-types";
import React from "react";
import styled from "styled-components";

const ChatActionsEl = styled.div`
  display: flex;
  flex-direction: row;
  height: 106px;
  justify-content: center;
  margin: 0 auto;
  max-width: 380px;
  text-align: center;
  width: 100%;
  & > * {
    margin: 0 5px;
  }
`;

const ChatActions = (props) => <ChatActionsEl {...props} />;

ChatActions.propTypes = {};

export default ChatActions;
