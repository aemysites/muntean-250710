/* global WebImporter */
export default function parse(element, { document }) {
  // Columns (columns26) block: 2 columns, 1 row of content, header matches exactly
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Extract direct children of the grid (should be two: left column and right image column)
  const directColumns = Array.from(grid.children);
  if (directColumns.length < 2) return;

  // The left column: all text, headings, paragraphs, and button
  const leftCol = directColumns[0];
  // The right column: the image (entire element)
  const rightCol = directColumns[1];

  // Table structure: header row, then a row with leftCol and rightCol as cells
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns26)'],
    [leftCol, rightCol]
  ], document);

  // Replace original element with the block table
  element.replaceWith(table);
}
