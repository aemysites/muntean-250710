/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const gridDiv = element.querySelector(':scope > .w-layout-grid');
  let backgroundImgEl = null;
  let contentEl = null;

  if (gridDiv) {
    // Get immediate children divs of the grid
    const gridChildren = gridDiv.querySelectorAll(':scope > div');
    if (gridChildren.length >= 2) {
      // First child: image wrapper
      const imageWrapper = gridChildren[0];
      // Find the background image inside the image wrapper
      backgroundImgEl = imageWrapper.querySelector('img');
      // Second child: heading/content wrapper
      contentEl = gridChildren[1];
    } else {
      // Defensive: check if single child that has both image and content
      const possibleImage = gridDiv.querySelector('img');
      if (possibleImage) backgroundImgEl = possibleImage;
      // Just reference the gridDiv as content if no clear split
      contentEl = gridDiv;
    }
  }

  // Prepare the block table rows
  const headerRow = ['Hero (hero13)'];
  // Second row: background image (can be empty string if not found)
  const imageRow = [backgroundImgEl ? backgroundImgEl : ''];
  // Third row: headline, subheadline, cta, etc (can be empty string if not found)
  const contentRow = [contentEl ? contentEl : ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
