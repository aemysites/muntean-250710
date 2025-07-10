/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row should contain exactly one cell (single column), as per the example
  const headerRow = ['Columns (columns14)'];

  // Content row: all columns in a single array (each cell is one column in the table)
  // The WebImporter.DOMUtils.createTable will render the headerRow as a single <th> spanning all columns below

  const tableRows = [headerRow, columns];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the table block
  element.replaceWith(table);
}
