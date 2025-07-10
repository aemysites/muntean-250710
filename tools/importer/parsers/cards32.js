/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const cells = [['Cards (cards32)']];

  // 2. Collect all card anchors (each card is an <a>)
  const cardAnchors = Array.from(element.querySelectorAll(':scope > a'));

  cardAnchors.forEach((anchor) => {
    // Get the card's image (first <img>)
    const img = anchor.querySelector('img');

    // Get the inner grid (first child div) and its second child (content)
    const cardGrid = anchor.querySelector(':scope > div');
    let contentDiv = null;
    if (cardGrid) {
      // The grid has two children: first is img, second is content div
      const divs = Array.from(cardGrid.children).filter(c => c.tagName.toLowerCase() === 'div');
      if (divs.length > 0) contentDiv = divs[0];
    }

    // Compose content block
    const contentParts = [];
    if (contentDiv) {
      // Optional: tag/time row (the .flex-horizontal div)
      const tagTime = contentDiv.querySelector('.flex-horizontal');
      if (tagTime) contentParts.push(tagTime);
      // Heading (h3 or .h4-heading)
      const heading = contentDiv.querySelector('h3, .h4-heading');
      if (heading) contentParts.push(heading);
      // Description paragraph
      const desc = contentDiv.querySelector('p');
      if (desc) contentParts.push(desc);
      // Remove any trailing "Read" div
      const divList = contentDiv.querySelectorAll(':scope > div');
      if (divList.length > 0) {
        const lastDiv = divList[divList.length - 1];
        if (lastDiv && lastDiv.textContent.trim().toLowerCase() === 'read') {
          lastDiv.remove();
        }
      }
    }
    // CTA: always add a link to the card's href labeled 'Read'
    if (anchor.href) {
      const cta = document.createElement('a');
      cta.href = anchor.href;
      cta.textContent = 'Read';
      contentParts.push(cta);
    }
    // Compose the row (image, text content array)
    cells.push([
      img,
      contentParts
    ]);
  });

  // 3. Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
