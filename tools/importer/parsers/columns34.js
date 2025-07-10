/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the column content
  const grid = element.querySelector('.grid-layout');
  let rowCells = [];
  if (grid) {
    // Get all direct children (columns)
    rowCells = Array.from(grid.children);
  }
  // Ensure there is at least 1 cell even if grid is empty
  if (rowCells.length === 0) {
    rowCells = [''];
  }

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns34)'], // Header row, single cell as per requirement
    rowCells,                // Content row, as many columns as found
  ], document);

  // Set colspan on the header row so it spans all content columns
  const th = table.querySelector('tr:first-child th');
  if (th && rowCells.length > 1) {
    th.setAttribute('colspan', rowCells.length);
  }

  element.replaceWith(table);
}
