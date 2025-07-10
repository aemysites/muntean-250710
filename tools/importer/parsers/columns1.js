/* global WebImporter */
export default function parse(element, { document }) {
  // Get the container and grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get columns (children of grid)
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // Build the table: header row, then columns row
  const cells = [
    ['Columns (columns1)'],
    cols
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
