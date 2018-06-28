import React from "react";
import { markdown, ReactSpecimen } from "catalog";

import { Bubble, Icon } from "../components";

export default () => markdown`

  ## Animated bubbles

  ${(
    <ReactSpecimen span={3} dark>
      <Bubble animated>Animated bubble</Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen span={3} dark>
      <Bubble animated delay={2000}>
        Animated bubble with a delay in ms
      </Bubble>
    </ReactSpecimen>
  )}

  ## User / System / Interviewee bubbles

  ${(
    <ReactSpecimen span={2} dark>
      <Bubble persona="interviewee">Single bubble</Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen span={2} dark>
      <Bubble persona="system">Single bubble</Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen span={2}>
      <Bubble persona="user">Single bubble</Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen span={2} dark>
      <Bubble persona="interviewee">First bubble</Bubble>
      <Bubble persona="interviewee">Last bubble</Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen span={2} dark>
      <Bubble persona="system">First bubble</Bubble>
      <Bubble persona="system">Last bubble</Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen span={2}>
      <Bubble persona="user">First bubble</Bubble>
      <Bubble persona="user">Last bubble</Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen span={2} dark>
      <Bubble persona="interviewee">First bubble</Bubble>
      <Bubble persona="interviewee">Middle bubble</Bubble>
      <Bubble persona="interviewee">Last bubble</Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen span={2} dark>
      <Bubble persona="system">First bubble</Bubble>
      <Bubble persona="system">Middle bubble</Bubble>
      <Bubble persona="system">Last bubble</Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen span={2}>
      <Bubble persona="user">First bubble</Bubble>
      <Bubble persona="user">Middle bubble</Bubble>
      <Bubble persona="user">Last bubble</Bubble>
    </ReactSpecimen>
  )}

  ## Themeable bubbles

  ${(
    <ReactSpecimen span={2} dark>
      <Bubble
        persona="interviewee"
        theme={{ font: "sans-serif", backg: "black" }}
      >
        Custom bubble font
      </Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen span={2} dark>
      <Bubble
        persona="interviewee"
        theme={{ font: "sans-serif", backg: "cyan" }}
      >
        Custom bubble text
      </Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen span={2} dark>
      <Bubble persona="interviewee">Custom bubble</Bubble>
    </ReactSpecimen>
  )}
`;
