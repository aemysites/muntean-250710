/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main two-column grid
  const grid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!grid) return;
  
  // Children: typically two items, one div (with content), one img
  // leftCol: content div; rightCol: image
  let leftCol = null;
  let rightCol = null;
  const cols = Array.from(grid.children);
  for (const col of cols) {
    if (col.tagName === 'IMG' && !rightCol) {
      rightCol = col;
    } else if (col.tagName === 'DIV' && !leftCol) {
      leftCol = col;
    }
  }

  // Defensive: if either is missing, fallback to empty cell
  const cells = [
    ['Columns (columns23)'],
    [leftCol || '', rightCol || '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
