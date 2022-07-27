import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { setActiveMenuItem, filterDocuments, setActiveCrumb } from "../utils";
import withRouter from "../hoc/withRouter";

import AppMain from "./AppMain";
import AppSidebar from "./AppSidebar";
import contentTool from "../utils/contentTool";

import { ContentPropType } from "../prop-types";

import "../assets/sanitize.css";
import "./App.scss";

export type props = {
  title?: string,
  content?: content,
  basePath?: string,
  hideBuiltWithShardDocs?: boolean,
  routerType?: "hash" | "browser",
  currentPath?: string
}

const App = (props: props) => {
  const [basePath] = useState(props.basePath);
  const [currentPath, setCurrentPath] = useState(props.currentPath);
  const [content, setContent] = useState({ items: [], documents: [] } as { items: item[], documents: documentItem[] });
  const [menu, setMenu] = useState([] as item[]);
  const [documents, setDocuments] = useState([] as documentItem[]);
  const [prevPage, setPrevPage] = useState(null as documentItem | null);
  const [nextPage, setNextPage] = useState(null as documentItem | null);

  useEffect(() => {
    const content = contentTool.parseContent(props.content || [], basePath)
    setContent(content)
    setMenu(content.items);
    setDocuments(content.documents);
  }, []);

  useEffect(() => {
    const prevPath = currentPath;

    if (props.currentPath !== prevPath) {
      setCurrentPath(props.currentPath);

      const currentDocuments = filterDocuments(content.documents, props.currentPath).map(document => setActiveCrumb(document, props.currentPath));
      const currentActiveMenuItem = setActiveMenuItem(content.items, props.currentPath) as categoryItem[]

      setDocuments(currentDocuments)
      setMenu(currentActiveMenuItem)

      const prevIndex = currentDocuments.findIndex((document: documentItem) => document.path === props.currentPath) - 1;
      setPrevPage(currentDocuments[prevIndex] ? currentDocuments[prevIndex] : null);
      
      const nextIndex = currentDocuments.findIndex((document: documentItem) => document.path === props.currentPath) + 1;
      setNextPage(currentDocuments[nextIndex] ? currentDocuments[nextIndex] : null);

      window.scrollTo(0, 0);
    }
  }, [props.currentPath])

  return (
    <div className="sd-App">
      <AppSidebar
        title={props.title}
        basePath={props.basePath}
        items={menu as categoryItem[]}
        hideBuiltWithShardDocs={props.hideBuiltWithShardDocs}
      />
      <AppMain documents={documents} prevPage={prevPage as paginationPage} nextPage={nextPage as paginationPage} />
    </div>
  );
}

App.propTypes = {
  title: PropTypes.string,
  content: ContentPropType,
  basePath: PropTypes.string,
  hideBuiltWithShardDocs: PropTypes.bool,
  routerType: PropTypes.string,
  currentPath: PropTypes.string,
};

App.defaultProps = {
  title: "",
  content: [],
  basePath: "/",
  hideBuiltWithShardDocs: false,
  routerType: "hash",
  currentPath: ''
};

export default withRouter<props>(App);