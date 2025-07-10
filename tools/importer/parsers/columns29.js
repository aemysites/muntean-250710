/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let columnCells = [];

  if (grid) {
    // Use all immediate children of the grid as the columns
    columnCells = Array.from(grid.children);
  } else {
    // Fallback: treat all direct children as columns
    columnCells = Array.from(element.children);
  }

  // Only proceed if we have columns (at least 1)
  if (columnCells.length === 0) {
    return;
  }

  // Block header row: exactly one column per requirements
  const headerRow = ['Columns (columns29)'];

  // Compose the table rows: header (1 cell), then row with all columns
  const cells = [
    headerRow,
    columnCells // this will be the second row, with one cell per column
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
