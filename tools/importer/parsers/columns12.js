/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each "column", extract the main content: image (and overlay text, if present)
  function extractCell(col) {
    const img = col.querySelector('img');
    const textBlock = col.querySelector('.utility-padding-all-2rem');
    if (img && textBlock) {
      const wrapper = document.createElement('div');
      wrapper.appendChild(img);
      wrapper.appendChild(textBlock);
      return wrapper;
    }
    if (textBlock) return textBlock;
    if (img) return img;
    return col;
  }

  // Group into two rows of three columns each (as in the example)
  const row1 = columns.slice(0, 3).map(extractCell);
  const row2 = columns.slice(3, 6).map(extractCell);

  // Table: header is one cell, then two content rows with three columns each
  const tableArray = [
    ['Columns (columns12)'],
    row1,
    row2
  ];

  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}
