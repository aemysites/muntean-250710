/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table header as in the example
  const cells = [['Cards (cards20)']];

  // Try to find the card body (structure may vary, so be robust)
  // There may be multiple wrappers, so search for .card-body inside the element
  const cardBody = element.querySelector('.card-body');

  if (cardBody) {
    // Find the image (img inside cardBody)
    const img = cardBody.querySelector('img');
    // Find the title ('.h4-heading' inside cardBody)
    const title = cardBody.querySelector('.h4-heading');
    const textCellContent = [];
    if (title) textCellContent.push(title);
    // No description or CTA found in provided HTML
    // If both image and title exist, add the row
    if (img && textCellContent.length) {
      cells.push([
        img,
        textCellContent
      ]);
    }
  }

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
