/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be exactly one cell (one-column row)
  const headerRow = ['Columns (columns37)'];

  // Collect all immediate children of the grid as column content
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: handle if no columns found
  if (columns.length === 0) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      [''],
    ], document);
    element.replaceWith(table);
    return;
  }

  // Table structure: header row is a single cell, content row is one cell per column
  const rows = [
    headerRow,         // ['Columns (columns37)']
    columns            // [col1Div, col2Div, col3Div]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
