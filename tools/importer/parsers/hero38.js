/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero38)'];

  // Get immediate grid children (should be two: image/bg and text)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  let imgCell = '';
  let infoCell = '';

  if (mainGrid) {
    // Find grid columns
    const gridChildren = mainGrid.querySelectorAll(':scope > div');
    // First column: look for background image (img)
    if (gridChildren.length > 0) {
      const img = gridChildren[0].querySelector('img');
      if (img) {
        imgCell = img;
      }
    }
    // Second column: contains all the info
    if (gridChildren.length > 1) {
      // The container with all the text/buttons
      const infoContainer = gridChildren[1];
      if (infoContainer) {
        // It might contain wrappers, but we want the whole block as one cell
        infoCell = infoContainer;
      }
    }
  }

  // Construct the table
  const cells = [
    headerRow,
    [imgCell],
    [infoCell],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
