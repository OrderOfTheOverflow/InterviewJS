import { func, string } from "prop-types";
import React, { Component } from "react";
// import Select from "react-select";
import CreatableSelect from "react-select/lib/Creatable";

import {
  Container,
  FormItem,
  Label,
  color,
  font,
  time,
  radius
} from "interviewjs-styleguide";
// import { GLOBALS, USER_ACTIONS } from "../../../../options";
import { USER_ACTIONS } from "../../../../options";

export default class TextTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleInputChange(str) {
    console.log(str);
  }
  handleChange(option) {
    if (option) {
      return this.props.selectAction("text", option.value, option.label);
    }
    return this.props.selectAction("text", "text01", "Tell me more");
  }
  render() {
    console.log("TEXT PROPS: ", this.props);

    const customStyles = {
      option: (base, state) => ({
        ...base,
        background: state.isSelected ? color.blueM : color.white,
        border: `1px solid ${color.greyWt}`,
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
      menuList: (base, state) => ({
        ...base,
        padding: "8px 0 0 8px"
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
      singleValue: (base, state) => ({
        ...base,
        color: color.blueBlk,
        fontFamily: font.serif,
        lineHeight: "1.2em"
      }),
      container: (base, state) => ({
        ...base,
        background: color.white,
        fontFamily: font.serif,
        fontSize: "14px"
      }),
      input: (base, state) => ({
        ...base,
        color: color.blueBlk,
        fontFamily: font.serif,
        lineHeight: "1.2em"
      }),
      placeholder: (base, state) => ({
        ...base,
        color: color.greyLLt,
        fontStyle: "italic",
        fontWeight: "normal"
      }),
      valueContainer: (base, state) => ({
        ...base,
        fontFamily: font.serif
      })
    };

    return (
      <Container padded>
        <FormItem>
          <Label>User action</Label>
          <CreatableSelect
            // menuIsOpen
            blurInputOnSelect
            createOptionPosition="first"
            hideSelectedOptionsboolean={false}
            isClearable
            onChange={(evt) => this.handleChange(evt)}
            onInputChange={(str) => this.handleInputChange(str)}
            options={USER_ACTIONS}
            placeholder="Type in or choose a comment or question here…"
            styles={customStyles}
            // value={dictItem}
          />
        </FormItem>
      </Container>
    );
  }
}

TextTab.propTypes = {
  selectAction: func.isRequired,
  dictItem: string
};

TextTab.defaultProps = {
  dictItem: null
};
