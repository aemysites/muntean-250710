/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row
  const headerRow = ['Hero (hero7)'];

  // Identify background image: first column of grid-layout
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }

  // Second row: background image only (can be null if not found)
  const rowBgImg = [bgImg ? bgImg : ''];

  // Identify content: find card with heading/subheading/buttons
  let contentCell = '';
  if (gridDivs.length > 1) {
    // Try to find the .card (with .utility-padding-all-3rem)
    const card = gridDivs[1].querySelector('.card');
    if (card) {
      contentCell = card;
    }
  }
  const rowContent = [contentCell];

  // Assemble rows for the block table
  const cells = [
    headerRow,
    rowBgImg,
    rowContent,
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
