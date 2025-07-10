/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one column as required by the example
  const headerRow = ['Columns (columns16)'];

  // Find the two main columns (headline/eyebrow and supporting content)
  const container = element.querySelector(':scope > .container');
  const mainGrid = container && container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let mainCols = [];
  if (mainGrid) {
    const mainGridChildren = mainGrid.querySelectorAll(':scope > div');
    if (mainGridChildren.length >= 2) {
      mainCols = [mainGridChildren[0], mainGridChildren[1]];
    }
  }

  // Find the visuals/images grid (same two column structure)
  const visualsGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let visualsCols = [];
  if (visualsGrid) {
    const imgDivs = visualsGrid.querySelectorAll(':scope > div');
    if (imgDivs.length >= 2) {
      visualsCols = [imgDivs[0], imgDivs[1]];
    }
  }

  // Compose the cells array to ensure first row is single-header, subsequent rows are two columns
  const cells = [
    headerRow, // one column in header
    mainCols, // two columns
    visualsCols // two columns
  ];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
