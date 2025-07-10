/* global WebImporter */
export default function parse(element, { document }) {
  // Find columns (direct children)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Build cells array: header row must be single cell; content row contains each column
  const cells = [
    ['Columns (columns28)'],
    columns
  ];

  // Create table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix header cell colspan if more than one column
  if (columns.length > 1) {
    const headerRow = table.querySelector('tr:first-child');
    if (headerRow && headerRow.children.length === 1) {
      headerRow.children[0].setAttribute('colspan', columns.length);
    }
  }

  element.replaceWith(table);
}
