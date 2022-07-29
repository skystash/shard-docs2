import slugify from "slugify";
import kebabCase from "lodash/kebabCase";

const getSlug = (name: string) => slugify(kebabCase(name), { lower: true });
const removeDuplicateSlashes = (path: string) => path.replace(/\/+$/, "").replace(/\/+/g, "/");

function normaliseContent(items: content): item[] {
  const itemTemplates = {
    category: { type: 'category', name: '', path: '', items: [], isEmpty: true, isActive: false, depth: 0 },
    document: { type: 'document', name: '', path: '', breadcrumbs: [], document: null, isEmpty: true, isActive: false, depth: 0 },
    link: { type: 'link', name: '', url: '', external: false, depth: 0 },
  }

  const output = [];

  for (const item of items) {
    if (!itemTemplates[item.type]) continue;

    const outputTemplate = itemTemplates[item.type];

    if (item.type === "category") {
      const items = normaliseContent((item.items || []) as content);
      output.push({ ...outputTemplate, name: item.name, items } as categoryItem);
    } else if (item.type === "document") {
      output.push({ ...outputTemplate, name: item.name, document: item.document } as documentItem);
    } else if (item.type === "link") {
      output.push({ ...outputTemplate, name: item.name, url: item.url, external: item.external } as linkItem);
    }
  }

  return output;
}

 function addPaths(items: item[], basePath = ''): item[] {
    const output = []
    for (const item of items) {
      const path = removeDuplicateSlashes(`${basePath}/${getSlug(item.name || '')}`);
      if (item.type === "category") {
        output.push({ ...item, path, items: addPaths(item.items || [], path) });
      } else if (item.type === "document") {
        output.push({ ...item, path });
      } else if (item.type === "link") {
        output.push(item);
      }
  }
  return output;
}

/**
 * Recursively loops through source tree adding breadcrumbs to all documents / categories.
 * @param  {array} items Expects result of parse / shapeItems().
 * @return {array}
 */
function addBreadcrumbs(items: item[], breadcrumbs: breadcrumb[]): item[] {
  const output = [];
  for (const item of items) {
    if (item.type === "category") {
      output.push({
        ...item,
        items: addBreadcrumbs(item.items || [], [...breadcrumbs, { name: item.name || '', path: item.path, isActive: false }]),
      })
    } else if (item.type === "document") {
      output.push({
        ...item,
        breadcrumbs: [...breadcrumbs, { name: item.name, path: item.path, isActive: false }],
      })
    } else if (item.type === "link") {
      output.push(item);
    }
  }
  return output;
}

/**
 * Loops through each item, child and grandchild shaping each item to the specs of its given type.
 * @param  {array} items Expects result of parse/combineTopLevelAdjacentDocuments().
 * @return {array}
 */
 function shapeItems(items: item[]): item[] {
  const output = [];
  for (const item of items) {
    if (item.type === "category") {
      const items = shapeItems(item.items || []);
      const isEmpty = !item.items?.length;
      output.push({ ...item, isEmpty, items })
    } else if (item.type === "document") {
      const isEmpty = !item.document;
      const depth = item.breadcrumbs?.length || 0;
      output.push({ ...item, isEmpty, depth })
    } else if (item.type === "link") {
      output.push(item)
    }
  }

  return output;
}

/**
 * Combine all top level adjacent items (except categories) into discrete categories.
 * @param  {array} items Requires types to have been added to array with addTypes().
 * @return {array}
 */
 function combineTopLevelAdjacentItems(items: item[]): item[] {
  const preparedItems = items.map(item => {
    if (item.type !== "category") {
      return { name: null, items: [item], type: "category"} as categoryItem;
    }
    return item
  });

  const output = [];
  for (const item of preparedItems) {
    const lastItem = output[output.length - 1] as item | undefined;
    if (lastItem?.type === 'category' && !lastItem.name && item.type === 'category' && !item.name) {
      lastItem.items = [...lastItem.items, ...item.items];
      output[output.length - 1] = lastItem;
    } else {
      output.push(item);
    }
  }

  return output;
}

/**
 * Recursively loops through source tree adding depth level to all items.
 * @param  {array} items Expects result of parse/ shapeItems().
 * @return {array}
 */
function addDepth(items: item[], depth = 0): item[] {
  const output = [];
  for (const item of items) {
    if (item.type === "category") {
      const items = addDepth(item.items || [], depth + 1);
      output.push({ ...item, items, depth })
    } else {
      output.push({ ...item, depth })
    }
  }
  return output;
}


/**
 * Loops through each item, child and grandchild grabbing each document.
 * @param  {array} source Expects source array to have been fed through addTypes..
 * @return {array} returns all documents in an array
 */
function getDocuments(items: item[], accumulator: (documentItem)[] = []) {
  for (const item of items) {
    if (item.type === "category") {
      accumulator = getDocuments((item.items || []), accumulator);
    } else if (item.type === "document") {
      accumulator = [...accumulator, item];
    }
  }
  return accumulator;
}

/**
 * Parse all user defined content and return a structured array.
 * @param items 
 * @param basePath 
 * @returns 
 */
function parse(items: content, basePath = "/") {
  let normalisedItems = normaliseContent(items);
  normalisedItems = addPaths(normalisedItems, basePath);
  normalisedItems = addBreadcrumbs(normalisedItems, [{ path: basePath, name: "~", isActive: false }]);
  normalisedItems = shapeItems(normalisedItems);
  normalisedItems = combineTopLevelAdjacentItems(normalisedItems);
  normalisedItems = addDepth(normalisedItems);

  return normalisedItems;
}

/**
 * Return documents that are equal too or descendants of path.
 * @param  {array} documents fed in from adapters/contentTool()
 * @param  {string} path current url
 * @return {array}
 */
function filterDocuments(documents: documentItem[] = [], path = "") {
  return documents.filter(document => document.path.startsWith(path));
}

/**
 * Loop through breadcrumb in document and set isActive on crumbs that match provided path.
 * @param  {array} breadcrumbs a field from document object
 * @param  {string} path current url
 * @return {array}
 */
function setActiveCrumb(document: documentItem, path = "") {
  document.breadcrumbs = document.breadcrumbs.map(crumb => ({
    ...crumb,
    isActive: crumb.path === path
  }));
  return document;
}

/**
 * Compare a path to each path in document / category items and set boolean result on isActive prop.
 * @param  {array} items fed in from adapters/contentTool()
 * @param  {string} currentPath current url
 * @return {array}
 */
function setActiveMenuItem(items: item[] = [], currentPath = "") {
  return items.map(item => {
    if (item.type === "category") {
      item.items = setActiveMenuItem(item.items, currentPath);
    }
    if (item.type === "category" || item.type === "document") {
      item.isActive = item.path === currentPath;
    }
    return item;
  });
}


export default {
  parse,
  getDocuments,
  filterDocuments,
  setActiveCrumb,
  setActiveMenuItem
}