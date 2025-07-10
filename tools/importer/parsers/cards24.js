/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row
  const headerRow = ['Cards (cards24)'];

  // Get all card links (immediate children)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map(card => {
    // First column: image (reference the <img> element directly)
    let img = card.querySelector('img');
    // Second column: text content
    const textCell = document.createElement('div');

    // Tag and Date (if present)
    const tagAndDate = card.querySelector('.flex-horizontal');
    if (tagAndDate) {
      // Tag (if present)
      const tag = tagAndDate.querySelector('.tag');
      if (tag) {
        textCell.appendChild(tag);
      }
      // Date (if present)
      const date = tagAndDate.querySelector('.paragraph-sm');
      if (date) {
        if (tag) {
          // add a space between tag and date if both exist
          textCell.appendChild(document.createTextNode(' '));
        }
        textCell.appendChild(date);
      }
    }
    // Heading
    const heading = card.querySelector('.h4-heading, h3, h4');
    if (heading) {
      textCell.appendChild(document.createElement('br'));
      textCell.appendChild(heading);
    }
    // No further description or CTA in the sample HTML
    return [img, textCell];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
