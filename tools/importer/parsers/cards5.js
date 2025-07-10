/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards5)'];

  // Each card is a direct child div containing an image
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];
  cardDivs.forEach((cardDiv) => {
    // The card image is expected to be a direct child (or inside an aspect-ratio wrapper)
    let img = cardDiv.querySelector('img');
    // Defensive: If no image, create an empty cell
    if (!img) {
      rows.push(['', '']);
      return;
    }
    // For this block, text content is not present in the HTML, so use empty cell for second column
    rows.push([img, '']);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}