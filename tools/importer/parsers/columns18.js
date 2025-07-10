/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header
  const headerRow = ['Columns (columns18)'];

  // Gather all column divs (each is a feature)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Determine column count (2 columns as in the markdown example)
  const columnsPerRow = 2;
  const contentRows = [];

  // Chunk the column divs into rows of 2 columns each
  for (let i = 0; i < columnDivs.length; i += columnsPerRow) {
    // Each row is an array of 2 columns (or less for last row)
    const row = columnDivs.slice(i, i + columnsPerRow);
    // If the last row has fewer than needed, pad with empty string for proper column alignment
    while (row.length < columnsPerRow) row.push('');
    contentRows.push(row);
  }

  // Build table data
  const cells = [headerRow, ...contentRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
