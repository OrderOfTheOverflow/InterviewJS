import { func } from "prop-types";
import React, { Component } from "react";

import {
  Container,
  FormItem,
  Label,
  Legend,
  Select
} from "interviewjs-styleguide";
// import { GLOBALS, USER_ACTIONS } from "../../../../options";
import { USER_ACTIONS } from "../../../../options";

const createOption = (label: string) => {
  const trimmedLabel = label.trim().substr(0, 120);
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
        draft: {
          label: nextProps.draft.value,
          value: nextProps.draft.option
        }
      };
    }
    return nextState;
  }
  constructor(props) {
    super(props);

    const getValue = () => {
      const { value, option } = this.props.draft;
      if (value && option) {
        return {
          value: option,
          label: value
          // value: "",
          // label: ""
        };
      }
      return undefined;
    };

    this.state = {
      isLoading: false,
      options: USER_ACTIONS,
      draft: getValue()
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
          draft: {
            value: defVal,
            label: defLab
          }
        },
        () => this.props.updateDraft("text", { option: defVal, value: defLab })
      );
    } else {
      this.setState({ draft: newValue }, () =>
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
          draft: newOption
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
    const { isLoading, options, draft } = this.state;

    return (
      <Container padded style={{ height: "100%" }}>
        <FormItem
          style={{ height: "85%" }}
          className={this.props.primary ? `jr-step-04` : ""}
        >
          <Label>User action</Label>
          <Select
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={this.handleChange}
            onCreateOption={this.handleCreate}
            options={options}
            placeholder={
              draft && draft.label
                ? draft.label
                : "Type in or choose a comment or question here…"
            }
            value={draft.value}
          />
          <Legend tip="Use this box to script a text user interaction or question.">
            i
          </Legend>
        </FormItem>
      </Container>
    );
  }
}

TextTab.propTypes = {
  updateDraft: func.isRequired
};

TextTab.defaultProps = {
  draft: {
    value: "",
    option: ""
  }
};
