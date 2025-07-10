/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid of images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children of the grid (these are the wrappers for each image)
  const gridChildren = Array.from(grid.children);

  // For each, extract the <img> if it exists
  const images = gridChildren.map((col) => col.querySelector('img')).filter(Boolean);

  // Build the header and content row as required
  const cells = [
    ['Columns (columns30)'], // Header row: exactly one column
    images                  // Images row: as many columns as images
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
