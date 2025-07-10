/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match the block name as in the example
  const rows = [['Cards (cards8)']];

  // Each immediate child div represents a card
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(div => {
    // Each card: get the (mandatory) image element
    const img = div.querySelector('img');
    // The second cell is blank (no text in this HTML)
    rows.push([img, '']);
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
