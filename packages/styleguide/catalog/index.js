import React from "react";
import ReactDOM from "react-dom";
import { Catalog, pageLoader } from "catalog";
import { injectGlobal } from "styled-components";

import { reset } from "./styles";

/* eslint no-unused-expressions: 0 */
const styles = injectGlobal`
  ${reset};
`;

import InterviewJSLogo from "./static/logo.svg";
import theme from "./theme";

const pages = [
  {
    content: pageLoader(() => import("./WELCOME.md")),
    path: "/",
    title: "Welcome"
  },
  {
    title: "Utils",
    pages: [
      {
        path: "utils/colors",
        title: "Colors",
        content: require("./pages/utils-colors.js")
      }
    ]
  },
  {
    title: "Actions",
    pages: [
      {
        path: "actions/default-variations",
        title: "Default",
        content: require("./pages/actions-default.js")
      },
      {
        path: "actions/toned-variations",
        title: "Toned",
        content: require("./pages/actions-toned.js")
      },
      {
        path: "actions/themeable-variations",
        title: "Themeable",
        content: require("./pages/actions-themeable.js")
      },
      {
        path: "actions/inverted-variations",
        title: "Inverted",
        content: require("./pages/actions-inverted.js")
      },
      {
        path: "actions/tile",
        title: "Tile Actions",
        content: require("./pages/actions-tile.js")
      }
    ]
  },
  {
    content: require("./pages/actionbars.js"),
    path: "/actionbars",
    title: "Actionbars"
  },
  {
    content: require("./pages/animators.js"),
    path: "/animators",
    title: "Animators"
  },
  {
    content: require("./pages/avatars.js"),
    path: "/avatars",
    title: "Avatars"
  },
  {
    content: require("./pages/breadcrumbs.js"),
    path: "/breadcrumbs",
    title: "Breadcrumbs"
  },
  {
    title: "Bubbles",
    pages: [
      {
        content: require("./pages/bubbles.js"),
        path: "/bubbles",
        title: "Bubbles"
      },
      {
        content: require("./pages/bubble-types.js"),
        path: "/bubbles-types",
        title: "Bubble types"
      },
      {
        content: require("./pages/bubblegroups.js"),
        path: "/bubblegroups",
        title: "Bubble groups"
      }
    ]
  },
  {
    content: require("./pages/containers.js"),
    path: "/containers",
    title: "Containers"
  },
  {
    title: "Contextuals",
    pages: [
      {
        content: require("./pages/contextuals-dropdowns.js"),
        path: "/dropdowns",
        title: "Dropdowns"
      },
      {
        content: require("./pages/contextuals-tips.js"),
        path: "/contextuals-tips",
        title: "Tips"
      }
    ]
  },
  {
    title: "Forms",
    pages: [
      {
        content: require("./pages/form-elements.js"),
        path: "/forms/elements",
        title: "Elements"
      },
      {
        content: require("./pages/form-items.js"),
        path: "/forms/items",
        title: "Form items"
      }
    ]
  },
  {
    content: require("./pages/icons.js"),
    path: "/icons",
    title: "Icons"
  },
  {
    content: require("./pages/messages.js"),
    path: "/messages",
    title: "Messages"
  },
  {
    content: require("./pages/modals.js"),
    path: "/modals",
    title: "Modals"
  },
  {
    content: require("./pages/preloaders.js"),
    path: "/preloaders",
    title: "Preloaders"
  },
  {
    content: require("./pages/separators.js"),
    path: "/separators",
    title: "Separators"
  },
  {
    content: require("./pages/tabs.js"),
    path: "/tabs",
    title: "Tabs"
  },
  {
    title: "Text",
    pages: [
      {
        path: "text/titles",
        title: "Titles",
        content: require("./pages/text-titles.js")
      },
      {
        path: "text/body",
        title: "Body text",
        content: require("./pages/text-body.js")
      },
      {
        path: "text/extends",
        title: "Extends",
        content: require("./pages/text-extends.js")
      }
    ]
  },
  {
    content: require("./pages/tours.js"),
    path: "/tours",
    title: "Tours"
  }
];

ReactDOM.render(
  <Catalog
    logoSrc={InterviewJSLogo}
    pages={pages}
    responsiveSizes={[
      { name: "phone", width: 360, height: 640 },
      { name: "tablet", width: 1024, height: 768 },
      { name: "desktop", width: 1440, height: 900 }
    ]}
    theme={theme}
    title="InterviewJS UI Library"
  />,
  document.getElementById("catalog")
);
