/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout inside the container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid - these are the columns
  const columns = Array.from(grid.children);

  // Compose the block header row (must match the required header)
  const headerRow = ['Columns (columns3)'];

  // Compose the row(s) for the columns block
  // In the provided HTML, there are two columns inside the grid: text+desc and button group
  // Reference the original elements as cells for resilience
  const row = columns;

  // Build the table with the header and columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace the original section with the new table
  element.replaceWith(table);
}
