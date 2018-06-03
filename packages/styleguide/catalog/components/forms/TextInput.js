import styled from "styled-components";
import React from "react";
import { bool, string } from "prop-types";

import { color, font, radius, setSpace, setType, time } from "../../../utils";
import { Preloader } from "../";

const Input = styled.input`
  ${setSpace("phm")};
  ${setSpace("pvm")};
  ${setType("x")};
  background: ${color.white};
  border-radius: ${radius.m};
  border: 1px solid ${color.greyHL};
  box-shadow: none;
  color: ${({ disabled }) => (disabled ? color.greyBlk : color.blueBlk)};
  font-family: ${font.serif};
  position: relative;
  resize: none;
  transition: border-color ${time.m};
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${color.blueM};
    z-index: 50;
  }
  &::placeholder {
    ${setType("x")};
    color: ${color.greyLLt};
    font-family: ${font.serif};
    font-style: italic;
  }
  ${({ valid }) =>
    valid === false
      ? `
    border-color: ${color.redM} !important;
    z-index: 50;
  `
      : ``};
  ${({ area }) =>
    area
      ? `
    min-height: 100px;
  `
      : ``} ${({ place }) => {
    if (place === "left") {
      return `border-radius: ${radius.m} 0 0 ${radius.m}; left: 1px`;
    } else if (place === "right") {
      return `border-radius: 0 ${radius.m} ${radius.m} 0; right: 1px`;
    }
    if (place !== null) {
      return `border-radius: 0`;
    }
    return null;
  }};
  ${({ nooffset }) => (nooffset ? `right: 0; left: 0;` : ``)};

  ${({ disabled }) => (disabled ? `opacity: .75;` : "")};
`;

const Button = styled(Input.withComponent("button"))`
  text-align: left;
  cursor: pointer;
`;

const Textarea = Input.withComponent("textarea");
const Select = styled(Input.withComponent("select"))`
  appearance: none;
`;

const TextInput = (props) => {
  if (props.file) {
    const handler = (e) => {
      e.preventDefault();
      props.onClick();
    };
    if (props.loading) {
      return (
        <Button {...props} onClick={(e) => handler(e)}>
          <Preloader />
        </Button>
      );
    }
    return (
      <Button {...props} onClick={(e) => handler(e)}>
        {props.uploaded ? props.uploaded : "Select file…"}
      </Button>
    );
  }
  if (props.area) {
    return <Textarea {...props} />;
  } else if (props.select) {
    return <Select {...props} />;
  }
  return <Input {...props} />;
};

TextInput.propTypes = {
  area: bool,
  file: bool,
  input: bool,
  loading: bool,
  nooffset: bool,
  place: string,
  select: bool,
  uploaded: string
};

TextInput.defaultProps = {
  area: false,
  file: false,
  input: false,
  loading: null,
  nooffset: false,
  place: null,
  select: false,
  uploaded: null
};

export default TextInput;
