import React from "react";
import PropTypes from "prop-types";
import HeaderTitle from "./ShardDocsSidebarHeaderTitle";
import HeaderToggle from "./ShardDocsSidebarHeaderToggle";
import "./ShardDocsSidebarHeader.scss";

type HeaderProps = {
  title:string,
  basePath:string,
  onToggleMenu: () => void;
}

const Header = ({ title, basePath, onToggleMenu, ...props }: HeaderProps) => {
  return (
    <header className="shard-docs-header" {...props}>
      {title && <HeaderTitle title={title} path={basePath} />}
      <HeaderToggle onClick={onToggleMenu} />
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  basePath: PropTypes.string,
  onToggleMenu: PropTypes.func
};

Header.defaultProps = {
  title: "",
  description: "",
  basePath: "/",
  onToggleMenu: () => {}
};

export default Header;