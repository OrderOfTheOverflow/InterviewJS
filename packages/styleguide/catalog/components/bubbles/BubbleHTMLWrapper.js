import React from "react";
import css from "styled-components";
import { array, object, oneOfType, string } from "prop-types";

import { color, radius, setType } from "../../../utils";

import ratioSpacer from "./ratioSpacer.png";

const BubbleHTMLWrapperEl = css.div`
  ${setType("x")};
  border-radius: ${radius.m};
  width: 100%;
  & > img {
    height: 100%;
    width: 100%;
  }
  & > a {
    color: ${color.blueM};
  }
  & > .iframe {
    height: 100%;
    position: relative;
    width: 100%;
    img {
      display: block;
      width: 100%;
    }
    iframe,
    object,
    embed {
      height: 100%;
      left: 0;
      max-width: 100% !important;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
  ${({ displayType }) =>
    displayType === "embed" || displayType === "rich" ? `line-height: 0;` : ``};
`;

const BubbleHTMLWrapper = (props) => (
  <BubbleHTMLWrapperEl displayType={props.displayType}>
    {props.displayType === "embed" ? (
      <div className="iframe">
        <img src={ratioSpacer} alt="" key="ratioSpacer" />
        {props.children}
      </div>
    ) : (
      props.children
    )}
  </BubbleHTMLWrapperEl>
);

export default BubbleHTMLWrapper;

BubbleHTMLWrapper.propTypes = {
  children: oneOfType([array, object, string]).isRequired,
  displayType: string
};

BubbleHTMLWrapper.defaultProps = {
  displayType: "plain"
};
