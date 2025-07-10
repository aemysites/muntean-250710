/* global WebImporter */
export default function parse(element, { document }) {
  // Get the cards grid: find the grid with two children (first is main/large card, second is grid of smaller cards)
  const outerGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!outerGrid) return;
  // The first child is the large/feature card, the second child is a grid of smaller cards
  const cardEls = [];
  const children = Array.from(outerGrid.children);
  if (children.length > 0) {
    cardEls.push(children[0]);
  }
  if (children.length > 1 && children[1].classList.contains('grid-layout')) {
    cardEls.push(...Array.from(children[1].children));
  }

  const rows = [];
  // Header row
  rows.push(['Cards (cards36)']);

  // For each card, extract [image, text content]
  cardEls.forEach(card => {
    // Get the main image for the card
    let img = card.querySelector('img');
    let imgCell = img || '';

    // Collect heading, paragraphs, and any CTA/button (all as references)
    const textNodes = [];
    // Heading
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textNodes.push(heading);
    // Paragraphs
    const paragraphs = Array.from(card.querySelectorAll('p'));
    textNodes.push(...paragraphs);
    // CTA/Button
    // Use only immediate .button, .btn, or button, as sometimes the card has a .button div
    const button = card.querySelector('.button, .btn, button, a.button');
    if (button) textNodes.push(button);

    rows.push([imgCell, textNodes]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
