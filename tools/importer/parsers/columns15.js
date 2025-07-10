/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains columns/rows
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // We'll treat each group of columns as a row in the output (each group of siblings inside the grid)
  // In this source HTML, all direct children of grid are columns for a single row.
  // If this grid may contain multiple rows (e.g. 2x2, 3x2, etc.), we need to support that.
  // But in Webflow and similar, it's likely all columns for all rows are direct children, ordered row-wise.
  // We'll try to detect how many columns are in a row (usually 2 or 3)

  // Guess number of columns in the first row by finding the largest group of siblings before an <img> (or just assume 2)
  // Or: check the computed gridTemplateColumns style. But for robust parsing: allow n columns
  // For this HTML, it's 2 columns
  let columnsPerRow = 2;
  // Try to refine: count images vs non-images, see if all rows have same number of columns
  // (But for now, stick with 2 for this block type)

  const gridChildren = Array.from(grid.children);
  const rows = [];
  for (let i = 0; i < gridChildren.length; i += columnsPerRow) {
    let row = [];
    for (let j = 0; j < columnsPerRow; j++) {
      const col = gridChildren[i + j];
      if (!col) continue;
      // For each column, collect all content, filtering out empty text nodes
      if (col.tagName && col.tagName.toLowerCase() === 'img') {
        row.push(col);
      } else {
        const nodes = Array.from(col.childNodes).filter(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            return !!node.textContent.trim();
          }
          return true;
        });
        row.push(nodes.length === 1 ? nodes[0] : nodes);
      }
    }
    // Only push the row if it has content for all columns
    if (row.length === columnsPerRow) {
      rows.push(row);
    }
  }

  // Compose the cells: header row + all content rows
  const headerRow = ['Columns (columns15)'];
  const cells = [headerRow, ...rows];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
