import styled from "styled-components";

import { color, font, radius, setSpace } from "interviewjs-styleguide";

const PaneTitle = styled.h2`
  ${setSpace("phs")};
  background: ${color.white};
  border-radius: ${radius.m} ${radius.m} ${radius.n} ${radius.n};
  box-shadow: 0px -1px 1px 0 ${color.shadowWt};
  color: ${color.blueBlk};
  display: inline-block;
  font-family: ${font.serif};
  font-size: 13px;
  font-weight: bold;
  height: 16px;
  left: 50%;
  line-height: 22px;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translate(-50%, -100%);
`;

export default PaneTitle;
