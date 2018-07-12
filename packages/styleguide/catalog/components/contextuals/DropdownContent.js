import css from "styled-components";

import { color, setSpace } from "../../../utils";

const DropdownContent = css.div`
  & ul, & li, & button {
    display: block;
    text-align: left;
  }
  & li {
    ${setSpace("mhx")};
    ${setSpace("pvx")};
  }
  & li:not(:first-child) {
    border-top: 1px solid ${color.greyWt};
  }
  & button {
    ${setSpace("pvs")};
    ${setSpace("phx")};
    width: 100%;
  }
  & h1, & h2 {
    color: ${color.blueBlk};
  }
  & p {
    color: ${color.greyBlk};
  }

  ${({ unlimited }) =>
    unlimited
      ? ``
      : `
  max-width: 200px;

    
  `}
  
`;

export default DropdownContent;
