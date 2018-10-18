import React from "react";
import { markdown, ReactSpecimen } from "catalog";

import { Bubble } from "../components";

import SampleImage from "../static/cover.jpg";

const ytFrame = `<iframe width="560" height="315" src="https://www.youtube.com/embed/H6lE5pai9fw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

const gmFrame = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9302.171246540584!2d18.6426717!3d54.34738845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd737602035d8f%3A0x3fc40d49a1a7e847!2sBrama+Wy%C5%BCynna!5e0!3m2!1spl!2spl!4v1520551093528" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>`;

export default () => markdown`

  ## Plain (textual) bubble types

  ${(
    <ReactSpecimen dark span={3}>
      <Bubble persona="interviewee" displayType="plain">
        Text bubble
      </Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen dark span={3}>
      <Bubble persona="user" displayType="plain">
        <a href="#">Link bubble</a>
      </Bubble>
    </ReactSpecimen>
  )}

  ## Rich bubble types

  ${(
    <ReactSpecimen dark span={3}>
      <Bubble persona="interviewee" displayType="rich">
        <img src={SampleImage} alt="" />
      </Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen dark span={3}>
      <Bubble persona="user" displayType="rich">
        <img src={SampleImage} alt="" />
      </Bubble>
    </ReactSpecimen>
  )}

  ## Embed bubble types

  ${(
    <ReactSpecimen dark span={3}>
      <Bubble persona="interviewee" displayType="embed">
        <div dangerouslySetInnerHTML={{ __html: ytFrame }} />
      </Bubble>
    </ReactSpecimen>
  )}
  ${(
    <ReactSpecimen dark span={3}>
      <Bubble persona="user" displayType="embed">
        <div dangerouslySetInnerHTML={{ __html: gmFrame }} />
      </Bubble>
    </ReactSpecimen>
  )}

`;
