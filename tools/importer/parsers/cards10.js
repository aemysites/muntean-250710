/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards10)'];

  // Find all direct child <a> elements (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  const rows = cards.map(card => {
    // --- Image cell ---
    // Find the first image in the card (inside the .utility-aspect-3x2)
    const imageWrapper = card.querySelector('.utility-aspect-3x2');
    let imageElement = null;
    if (imageWrapper) {
      imageElement = imageWrapper.querySelector('img'); // reference existing element
    }

    // --- Text cell ---
    // Find the text container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    // Compose the cell content as an array of existing elements (if present)
    const cellContent = [];
    if (textContainer) {
      // Tag (usually in .tag-group)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        cellContent.push(tagGroup);
      }
      // Heading
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading) {
        cellContent.push(heading);
      }
      // Paragraph (description)
      const para = textContainer.querySelector('p');
      if (para) {
        cellContent.push(para);
      }
      // No CTA/link in the card text content in provided HTML
    }

    return [imageElement, cellContent];
  });

  // Build cells array for createTable
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
