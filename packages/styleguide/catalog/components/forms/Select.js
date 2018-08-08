import CreatableSelect from "react-select/lib/Creatable";
import React from "react";
import styled from "styled-components";

import { color, font, time, radius } from "interviewjs-styleguide";

const InputEl = styled.input`
  background: transparent;
  border: none;
  box-shadow: none;
  color: #29336e;
  font-family: "PT Serif", serif;
  font-size: 15px;
  line-height: 1.5em;
  outline: none;
  padding-right: 35px;
  width: 100%;
`;

const Input = (props) => <InputEl {...props} />;

const customStyles = {
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? color.blueM : color.white,
    border: `1px solid ${state.isSelected ? color.blueM : color.greyWt}`,
    borderRadius: radius.s,
    color: state.isSelected ? color.white : color.greyBlk,
    cursor: "pointer",
    display: "inline-block",
    float: "left",
    fontSize: "13px",
    margin: "0 8px 8px 0",
    padding: "5px",
    width: "auto",
    ":hover": {
      backgroundColor: color.blueM,
      color: color.white,
      borderColor: color.blueM
    }
  }),
  menuList: (base) => ({
    ...base,
    padding: "8px 0 0 8px",
    maxHeight: "200px"
  }),
  control: (base, state) => ({
    ...base,
    background: color.white,
    borderColor: state.isFocused ? color.blueBlk : color.greyHL,
    borderRadius: radius.m,
    boxShadow: "none",
    padding: "8px",
    transition: `border-color ${time.m}`,
    ":hover": {
      borderColor: state.isFocused ? color.blueBlk : color.greyHL
    }
  }),
  singleValue: (base) => ({
    ...base,
    color: color.blueBlk,
    fontFamily: font.serif,
    lineHeight: "1.2em"
  }),
  container: (base) => ({
    ...base,
    background: color.white,
    fontFamily: font.serif,
    fontSize: "14px"
  }),
  input: (base) => ({
    ...base,
    color: color.blueBlk,
    fontFamily: font.serif,
    lineHeight: "1.2em"
  }),
  placeholder: (base) => ({
    ...base,
    color: color.greyLLt,
    fontStyle: "italic",
    fontWeight: "normal",
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginRight: "40px",
    width: "90%"
  }),
  valueContainer: (base) => ({
    ...base,
    fontFamily: font.serif
  })
};

const Select = (props) => (
  <CreatableSelect
    components={{ Input }}
    blurInputOnSelect
    createOptionPosition="first"
    formatCreateLabel={(str) => `Create: ${str}`}
    isClearable={false}
    styles={customStyles}
    {...props}
  />
);

export default Select;
