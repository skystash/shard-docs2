import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Menu from "./ShardDocsSidebarMenu";
import contentTool, { contentItemCategory } from "../utils/contentTool";

const { tree } = contentTool.parseContent([
  { type: 'document', name: "Doc A", document: <h1>Doc A</h1> }
]);

describe("<Menu />", () => {
  const mountMenu = ({ tree, showOnMobile } = {} as {tree?: tree, showOnMobile?:boolean}) => {
    const onNavigate = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <Menu onNavigate={onNavigate} tree={tree} showOnMobile={showOnMobile} />
      </MemoryRouter>
    );

    return { wrapper, onNavigate }
  }

  it("renders with default props", () => {
    const { wrapper } = mountMenu();

    expect(wrapper.exists()).toBe(true)
  });

  it("renders Menu", () => {
    const { wrapper } = mountMenu({ tree });

    expect(wrapper.find('.shard-docs-menu ul li').exists()).toBe(true)
  });

  it("can show menu on mobile devices", () => {
    const { wrapper } = mountMenu({ tree, showOnMobile: true });

    expect((wrapper.find('.shard-docs-menu').props() as any)['data-show-on-mobile']).toBe(true)
  });

  it("can show menu on mobile devices", () => {
    const { wrapper } = mountMenu({ tree, showOnMobile: false });

    expect((wrapper.find('.shard-docs-menu').props() as any)['data-show-on-mobile']).toBe(false)
  });

  it("calls onNavigate", () => {
    const { wrapper, onNavigate } = mountMenu({ tree });

    wrapper.find('.shard-docs-menu ul li a').first().simulate('click');

    expect(onNavigate.mock.calls.length).toBe(1)
  });
});