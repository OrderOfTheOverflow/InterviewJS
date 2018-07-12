import { func, string } from "prop-types";
import React, { Component } from "react";

import { Container, FormItem, Select, Label } from "interviewjs-styleguide";
// import { GLOBALS, USER_ACTIONS } from "../../../../options";
import { USER_ACTIONS } from "../../../../options";

const createOption = (label: string) => {
  console.log({ label });
  const trimmedLabel = label.trim().substr(0, 120);
  console.log({ trimmedLabel });
  return {
    label: trimmedLabel,
    value: trimmedLabel.toLowerCase().replace(/\W/g, "")
  };
};

export default class TextTab extends Component {
  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.label) {
      return {
        ...nextState,
        value: {
          label: nextProps.label,
          value: nextProps.value
        }
      };
    }
    return nextState;
  }
  constructor(props) {
    super(props);

    const getValue = () => {
      const { value, label } = this.props;
      if (value && label) {
        return {
          value,
          label
        };
      }
      return undefined;
    };

    this.state = {
      isLoading: false,
      options: USER_ACTIONS,
      value: getValue()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }
  handleChange = (newValue: any, actionMeta: any) => {
    if (actionMeta.action === "clear") {
      const defVal = USER_ACTIONS[0].value;
      const defLab = USER_ACTIONS[0].label;
      this.setState(
        {
          value: {
            value: defVal,
            label: defLab
          }
        },
        () => this.props.updateDraft("text", { option: defVal, value: defLab })
      );
    } else {
      this.setState({ value: newValue }, () =>
        this.props.updateDraft("text", {
          option: newValue.value,
          value: newValue.label
        })
      );
    }
    return null;
  };
  handleCreate = (inputValue: any) => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      const { options } = this.state;
      const newOption = createOption(inputValue);
      this.setState(
        {
          isLoading: false,
          options: [...options, newOption],
          value: newOption
        },
        () =>
          this.props.updateDraft("text", {
            option: newOption.value,
            value: newOption.label
          })
      );
    }, 1000);
  };
  render() {
    const { isLoading, options, value } = this.state;
    return (
      <Container padded>
        <FormItem>
          <Label>User action</Label>
          <Select
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={this.handleChange}
            onCreateOption={this.handleCreate}
            options={options}
            placeholder="Type in or choose a comment or question here…"
            value={value}
          />
        </FormItem>
      </Container>
    );
  }
}

TextTab.propTypes = {
  label: string,
  updateDraft: func.isRequired,
  value: string
};

TextTab.defaultProps = {
  label: null,
  value: null
};
