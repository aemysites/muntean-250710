/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row (block name exactly as required)
  const headerRow = ['Hero (hero6)'];

  // 2. Background image (second row): find the outer .utility-position-relative > img.cover-image
  let bgImg = '';
  const bgImgWrapper = element.querySelector('.w-layout-grid > .utility-position-relative');
  if (bgImgWrapper) {
    const foundImg = bgImgWrapper.querySelector('img.cover-image');
    if (foundImg) bgImg = foundImg;
  }
  const bgImgRow = [bgImg];

  // 3. Content (headline, subheading, cta, etc.)
  let contentCell = '';
  const grid = element.querySelector('.w-layout-grid.grid-layout.desktop-1-column, .w-layout-grid.grid-layout');
  if (grid) {
    // The main 2-column grid: first child is the bg img, second is content
    const gridChildren = Array.from(grid.children);
    if (gridChildren.length > 1) {
      // Our content is within the second child: container > card > card-body > grid-layout
      const cardContainer = gridChildren[1];
      if (cardContainer) {
        const cardBody = cardContainer.querySelector('.card-body');
        if (cardBody) {
          // The inner grid-layout inside card-body typically holds left image + right text/button
          const innerGrid = cardBody.querySelector('.grid-layout');
          if (innerGrid) {
            // Get both children of innerGrid
            const innerChildren = Array.from(innerGrid.children);
            // Keep only the non-image child (skip the first if it's an img)
            if (innerChildren.length === 2 && innerChildren[1].matches('div')) {
              contentCell = innerChildren[1];
            } else {
              // fallback to the whole card-body if structure is different
              contentCell = cardBody;
            }
          } else {
            // fallback to cardBody
            contentCell = cardBody;
          }
        } else {
          // fallback to the cardContainer
          contentCell = cardContainer;
        }
      }
    }
  }
  const contentRow = [contentCell];

  // Build table
  const cells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
