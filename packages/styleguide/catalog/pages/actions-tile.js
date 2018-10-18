import React from "react";
import { markdown, ReactSpecimen } from "catalog";

import { TileAction } from "../components";

export default () => markdown`
  ## Tile Actions

  ${(
    <ReactSpecimen span={3}>
      <TileAction primary>
        A primary tile action that is at least one hundred characters long and
        goes on several lines. this is actually 142 chars and should be enough.
      </TileAction>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen span={3}>
      <TileAction secondary>
        A primary tile action that is at least one hundred characters long and
        goes on several lines. this is actually 142 chars and should be enough.
      </TileAction>
    </ReactSpecimen>
  )}
`;
