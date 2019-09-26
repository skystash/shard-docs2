import React from "react";
import MarkdownShard from "@fa-repo/shard-docs/dist/shards/markdown-shard";

/**
 * Get started page
 */

const GetStartedPage = [
  <MarkdownShard
    markdown={`
## Install
\`\`\`bash
npm install @fa-repo/shard-docs
\`\`\`

## Dependencies

ShardDocs makes use of React Router V4. Ensure that an instance of this component is wrapped
by a router provider further up the tree. Example:

\`\`\`jsx
import { BrowserRouter } from "react-router-dom";

render(
  <BrowserRouter>
    <ShardDocs title="Documentation title" />
  </BrowserRouter>,
  document.getElementById("app")
);
\`\`\`

## Basic usage

\`\`\`jsx
ReactDOM.render(
  <ShardDocs
    title="Documentation title"
    structure={[
      { heading: "Essentials" },
      { title: "Get started", shards: [ <h1>Get started</h1> ] }
    ]}
  />,
    document.getElementById('app')
);
\`\`\`
`}
  />
];

GetStartedPage.propTypes = {};
GetStartedPage.defaultProps = {};

export default GetStartedPage;
