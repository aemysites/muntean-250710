/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab panel (the one with class w--tab-active)
  const activeTab = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activeTab) return;
  // Find the grid inside the active tab
  const grid = activeTab.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all immediate child nodes (columns/cards)
  const columns = Array.from(grid.children);
  if (!columns.length) return;
  // For each column, collect all child nodes that are element nodes or meaningful text
  const columnContents = columns.map((col) => {
    let nodes = [];
    // If this is a link/card, get all its children; otherwise get the node itself
    if (col.childNodes && col.childNodes.length) {
      nodes = Array.from(col.childNodes).filter(node =>
        node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())
      );
    }
    return nodes.length === 1 ? nodes[0] : nodes;
  });
  // Determine column count per row based on grid class (default 3)
  let colsPerRow = 3;
  const classList = grid.className;
  if (/desktop-([0-9]+)-column/.test(classList)) {
    const match = /desktop-([0-9]+)-column/.exec(classList);
    colsPerRow = parseInt(match[1], 10) || 3;
  } else if (columnContents.length < 3) {
    colsPerRow = columnContents.length;
  }
  // Table header must match example exactly and be a single cell
  const headerRow = ['Columns (columns22)'];
  // Build data rows (maintain same number of columns per row)
  const blockRows = [];
  for (let i = 0; i < columnContents.length; i += colsPerRow) {
    blockRows.push(columnContents.slice(i, i + colsPerRow));
  }
  // Compose table
  const cells = [headerRow, ...blockRows];
  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
