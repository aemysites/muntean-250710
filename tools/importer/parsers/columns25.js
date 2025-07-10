/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const container = element.querySelector('.container');
  if (!container) return;

  // There may be several grids, target the main one (first with 'grid-layout')
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The first two children of the mainGrid are the heading and the paragraph (quote)
  const heading = mainGrid.querySelector('.h2-heading');
  const paragraph = mainGrid.querySelector('.paragraph-lg');

  // The next child is the nested grid that has the bottom row info (avatar+name, logo)
  // We select the nested grid by looking for a .w-layout-grid inside mainGrid (that's not mainGrid itself)
  const nestedGrids = Array.from(mainGrid.querySelectorAll('.w-layout-grid'));
  // Exclude mainGrid itself
  const lowerGrid = nestedGrids.find(g => g !== mainGrid);

  // lowerGrid children: divider, flex-horizontal (avatar+author+role), and logo
  let lowerLeft = null, lowerRight = null;
  if (lowerGrid) {
    // The second child is avatar/name/role, the third is the logo
    const lowerChildren = Array.from(lowerGrid.children).filter((el) => el.nodeType === 1);
    if (lowerChildren.length >= 3) {
      lowerLeft = lowerChildren[1];
      lowerRight = lowerChildren[2];
    }
  }
  // Defensive: fallback empty elements if missing
  if (!heading && !paragraph) return; // must have content
  if (!lowerLeft) lowerLeft = document.createElement('div');
  if (!lowerRight) lowerRight = document.createElement('div');

  // Construct the top left cell: heading and paragraph
  const topLeftCell = document.createElement('div');
  if (heading) topLeftCell.appendChild(heading);
  if (paragraph) topLeftCell.appendChild(paragraph);

  // The top right cell is empty (no content in this layout)
  const topRightCell = document.createElement('div');

  // Block table header row
  const headerRow = ['Columns (columns25)'];
  // Block second row: two columns (heading+paragraph | empty)
  // Block third row: two columns (avatar+name/role | logo)
  const cells = [
    headerRow,
    [topLeftCell, topRightCell],
    [lowerLeft, lowerRight]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
