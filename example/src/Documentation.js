import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import raw from "raw.macro";
import ShardDocs, { MarkdownShard, IframeShard } from "shard-docs";

import BasicExample from "./docs/examples/basic-example";
import WithDescriptionExample from "./docs/examples/with-description";
import WithSectionsExample from "./docs/examples/with-sections";
import WithSidebarHeadingsExample from "./docs/examples/with-sidebar-headings";
import WithCustomStylesExample from "./docs/examples/with-custom-styles";

import "./sanitize.css";
import "shard-docs/dist/shard-docs.css";

const apiReferenceMarkdown = raw("./docs/api-reference.md");
const cssReferenceMarkdown = raw("./docs/css-reference.md");
const basicExampleMarkdown = raw("./docs/examples/basic-example.md");
const withDescriptionMarkdown = raw("./docs/examples/with-description.md");
const withSectionsMarkdown = raw("./docs/examples/with-sections.md");
const withSidebarHeadingsMarkdown = raw("./docs/examples/with-sidebar-headings.md");
const withCustomStylesMarkdown = raw("./docs/examples/with-custom-styles.md");
const getStartedMarkdown = raw("./docs/get-started.md");

/**
 * ShardDocs
 */

const Documentation = props => (
  <>
    <Route
      path="/"
      exact
      render={props => <NavLink to="/shard-docs">Go to documentation</NavLink>}
    />
    <Route
      path="/shard-docs"
      render={props => (
        <ShardDocs
          title="ShardDocs"
          description="A concise / extendable react component for handling documentation"
          basePath="/docs"
          structure={[
            {
              type: "page",
              title: "Get started",
              composition: [<MarkdownShard markdown={getStartedMarkdown} />]
            },
            {
              type: "page",
              title: "API reference",
              composition: [<MarkdownShard markdown={apiReferenceMarkdown} />]
            },
            {
              type: "page",
              title: "CSS reference",
              composition: [<MarkdownShard markdown={cssReferenceMarkdown} />]
            },
            {
              type: "collection",
              title: "Examples",
              children: [
                {
                  type: "page",
                  title: "Basic example",
                  composition: [
                    <MarkdownShard markdown={basicExampleMarkdown} />,
                    <IframeShard path="/examples/basic-example" />
                  ]
                },
                {
                  type: "page",
                  title: "With a description",
                  composition: [
                    <MarkdownShard markdown={withDescriptionMarkdown} />,
                    <IframeShard path="/examples/with-description" />
                  ]
                },
                {
                  type: "page",
                  title: "With sidebar headings",
                  composition: [
                    <MarkdownShard markdown={withSidebarHeadingsMarkdown} />,
                    <IframeShard path="/examples/with-sidebar-headings" />
                  ]
                },
                {
                  type: "page",
                  title: "With sections",
                  composition: [
                    <MarkdownShard markdown={withSectionsMarkdown} />,
                    <IframeShard path="/examples/with-sections" />
                  ]
                },
                {
                  type: "page",
                  title: "With custom styles",
                  composition: [
                    <MarkdownShard markdown={withCustomStylesMarkdown} />,
                    <IframeShard path="/examples/with-custom-styles" />
                  ]
                }
              ]
            }
          ]}
        />
      )}
    />
    <Route
      path="/examples"
      render={props => (
        <Switch>
          <Route path="/examples/basic-example" children={<BasicExample />} />
          <Route path="/examples/with-description" children={<WithDescriptionExample />} />
          <Route path="/examples/with-sidebar-headings" children={<WithSidebarHeadingsExample />} />
          <Route path="/examples/with-sections" children={<WithSectionsExample />} />
          <Route path="/examples/with-custom-styles" children={<WithCustomStylesExample />} />
        </Switch>
      )}
    />
  </>
);

Documentation.propTypes = {};
Documentation.defaultProps = {};

export default Documentation;
