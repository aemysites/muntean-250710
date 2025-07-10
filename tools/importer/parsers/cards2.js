/* global WebImporter */
export default function parse(element, { document }) {
  // Table rows: start with block name header (must match example)
  const rows = [['Cards (cards2)']];

  // Find the grid that holds all cards
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Cards: The layout is:
  // 1. Large card: first direct child <a>
  // 2. Small cards with images: inside first .flex-horizontal, each <a>
  // 3. Text-only cards: inside second .flex-horizontal, each <a>

  // 1. Large card
  const children = Array.from(grid.children);
  let childIdx = 0;
  // Find the first <a> card
  let firstCard = null;
  for (; childIdx < children.length; childIdx++) {
    if (children[childIdx].tagName.toLowerCase() === 'a') {
      firstCard = children[childIdx];
      break;
    }
  }
  if (firstCard) {
    // Image: find first <img> inside first div
    let img = null;
    const imgDiv = firstCard.querySelector('div');
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }
    // Text: tag group, heading, paragraph
    const tag = firstCard.querySelector('.tag-group');
    const heading = firstCard.querySelector('h3');
    const para = firstCard.querySelector('p');
    const textContent = [];
    if (tag) textContent.push(tag);
    if (heading) textContent.push(heading);
    if (para) textContent.push(para);
    rows.push([
      img ? img : '',
      textContent.length ? textContent : ''
    ]);
  }

  // 2. Small cards with images: first .flex-horizontal
  let flexes = Array.from(grid.querySelectorAll(':scope > div.flex-horizontal'));
  if (flexes[0]) {
    const smallCards = Array.from(flexes[0].querySelectorAll('a.utility-link-content-block'));
    smallCards.forEach(card => {
      // Image
      let img = null;
      const imgDiv = card.querySelector('div');
      if (imgDiv) {
        img = imgDiv.querySelector('img');
      }
      // Text: tag group, heading, paragraph
      const tag = card.querySelector('.tag-group');
      const heading = card.querySelector('h3');
      const para = card.querySelector('p');
      const textContent = [];
      if (tag) textContent.push(tag);
      if (heading) textContent.push(heading);
      if (para) textContent.push(para);
      rows.push([
        img ? img : '',
        textContent.length ? textContent : ''
      ]);
    });
  }

  // 3. Text-only mini cards: second .flex-horizontal
  if (flexes[1]) {
    const textCards = Array.from(flexes[1].querySelectorAll('a.utility-link-content-block'));
    textCards.forEach(card => {
      const heading = card.querySelector('h3');
      const para = card.querySelector('p');
      const textContent = [];
      if (heading) textContent.push(heading);
      if (para) textContent.push(para);
      rows.push([
        '',
        textContent.length ? textContent : ''
      ]);
    });
  }

  // Replace original element with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
