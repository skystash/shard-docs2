import React from "react";
import IframeShard from "@fa-repo/shard-docs/dist/shards/iframe-shard";
import MarkdownShard from "@fa-repo/shard-docs/dist/shards/markdown-shard";
import ExampleShard from "@fa-repo/shard-docs/dist/shards/example-shard";
import SectionShard from "@fa-repo/shard-docs/dist/shards/section-shard";
import CodeExampleShard from "@fa-repo/shard-docs/dist/shards/code-example-shard";

/**
 * IframeShard
 */

export default [
  <SectionShard title="Import" persistState="93209">
    <CodeExampleShard
      lang="bash"
      noShadow
      sourceCode={`
import IframeShard from "@fa-repo/shard-docs/dist/shards/iframe-shard";
import "@fa-repo/shard-docs/dist/shards/iframe-shard.css";`}
    />
  </SectionShard>,
  <SectionShard title="Properties" persistState="32232">
    <MarkdownShard
      markdown={`
| Name | Type   | Default | Required | Description                 |
|------|--------|---------|----------|-----------------------------|
| path | string | \`""\`  | required | Point iframe to a URL. |
`}
    />
  </SectionShard>,
  <SectionShard title="Usage" persistState="12321">
    <ExampleShard
      title="Iframe shard"
      lang="jsx"
      sourceCode={`import ShardDocs from "@fa-repo/shard-docs"
import MarkdownShard from "@fa-repo/shard-docs/dist/shards/iframe-shard.js"
import "@fa-repo/shard-docs/dist/shards/iframe-shard.css"

<ShardDocs
  title="Iframe shard"
  structure={[
    {
      page: "Hello world",
      composition: [ <IframeShard path="#/docs/hello-world" /> ]
    }
  ]}
/>`}
    >
      <IframeShard path="#/docs/hello-world" />
    </ExampleShard>
  </SectionShard>
];
