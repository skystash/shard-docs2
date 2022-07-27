import React from "react";
import { NavLink } from "react-router-dom";
import { PagePropType } from "../prop-types";
import "./MainPagination.scss";

type MainPaginationProps = {
  prevPage?: paginationPage,
  nextPage?: paginationPage,
}

const MainPagination = (props: MainPaginationProps) => {
  return (
    <footer className="sd-MainPagination">
      {props.prevPage && (
        <NavLink className="sd-MainPagination__btn sd-MainPagination__btn--prev" to={props.prevPage.path} exact>⟵ {props.prevPage.name}</NavLink>
      )}
      {props.nextPage && (
        <NavLink className="sd-MainPagination__btn sd-MainPagination__btn--next" to={props.nextPage.path} exact>{props.nextPage.name} ⟶</NavLink>
      )}
    </footer>
  );
};

MainPagination.propTypes = {
  prevPage: PagePropType,
  nextPage: PagePropType
};

MainPagination.defaultProps = {
  prevPage: null,
  nextPage: null,
};

export default MainPagination;