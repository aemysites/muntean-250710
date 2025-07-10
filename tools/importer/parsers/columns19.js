/* global WebImporter */
export default function parse(element, { document }) {
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  const imageArea = grid.children[0];
  const textArea = grid.children[1];

  // Extract images for the first column
  let imagesColumn = '';
  if (imageArea) {
    const imagesGrid = imageArea.querySelector('.grid-layout.desktop-3-column');
    if (imagesGrid) {
      const imgs = Array.from(imagesGrid.querySelectorAll('img'));
      if (imgs.length) {
        const imagesDiv = document.createElement('div');
        imgs.forEach(img => imagesDiv.appendChild(img));
        imagesColumn = imagesDiv;
      }
    }
  }

  // Extract text content for the second column
  let contentColumn = '';
  if (textArea) {
    const container = textArea.querySelector('.container');
    if (container) {
      contentColumn = container;
    }
  }

  // Build the header row with two cells, as required
  const headerRow = ['Columns (columns19)', ''];
  const contentRow = [imagesColumn, contentColumn];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
