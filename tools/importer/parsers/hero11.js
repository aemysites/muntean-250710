/* global WebImporter */
export default function parse(element, { document }) {
  // The header row, per block requirements
  const headerRow = ['Hero (hero11)'];

  // Get all immediate grid images (should be direct children, possibly wrapped in divs)
  // Per the spec, only the first image is used as the background.
  // Defensive: if no image, fallback to empty cell.
  let backgroundImage = '';
  const firstImg = element.querySelector('img');
  if (firstImg) {
    backgroundImage = firstImg;
  }

  // There is no text/cta content in the input; insert empty string for the text row
  const textRow = [''];

  // Assemble table
  const cells = [
    headerRow,
    [backgroundImage],
    textRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
