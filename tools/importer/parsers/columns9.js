/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns (columns9)'];

  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all the columns (direct children of grid)
  const columns = Array.from(grid.children);

  // Group columns into rows of 2 to match the example structure
  const columnsPerRow = 2;
  const contentRows = [];
  for (let i = 0; i < columns.length; i += columnsPerRow) {
    contentRows.push(columns.slice(i, i + columnsPerRow));
  }

  // Build the table cells (header + content rows)
  const cells = [headerRow, ...contentRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
