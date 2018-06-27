import React from "react";
import { markdown, ReactSpecimen } from "catalog";

import { Tiles, Tile, Icon } from "../components";
import { color } from "../../utils";

export default () => markdown`

  ## Tiles

  ${(
    <ReactSpecimen>
      <Tile onClick={(e) => console.log(e)}>
        <Icon name="users" /> Interview somebody else
      </Tile>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen>
      <Tiles>
        <Tile onClick={(e) => console.log(e)}>
          <Icon name="users" /> Interview somebody else
        </Tile>
        <Tile onClick={(e) => console.log(e)}>
          <Icon name="replayconv" /> Reload this conversation
        </Tile>
      </Tiles>
    </ReactSpecimen>
  )}

  ${(
    <ReactSpecimen>
      <Tiles>
        <Tile onClick={(e) => console.log(e)}>
          <Icon name="users" /> Interview somebody else
        </Tile>
        <Tile onClick={(e) => console.log(e)}>
          <Icon name="replayconv" /> Reload this conversation
        </Tile>
        <Tile paint={color.redM}>
          <Icon name="exit" /> I’m done chatting
        </Tile>
      </Tiles>
    </ReactSpecimen>
  )}
`;
