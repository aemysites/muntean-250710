/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout that contains columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get the immediate children of the grid (columns)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if there are at least two columns
  if (columns.length < 2) return;

  // Table header exactly as in the spec
  const headerRow = ['Columns (columns31)'];
  // Table content: one row with both columns
  const contentRow = [columns[0], columns[1]];
  
  // Create and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
