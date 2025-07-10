/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns17)'];

  // Find the grid layout container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const children = grid.querySelectorAll(':scope > *');
  if (children.length < 3) return;
  
  // The three children: [info div, contact ul, image]
  const infoDiv = children[0];
  const contactUl = children[1];
  const image = children[2];

  // Left cell: infoDiv + contactUl
  const leftCell = document.createElement('div');
  leftCell.appendChild(infoDiv);
  leftCell.appendChild(contactUl);
  // Right cell: image only (not wrapped in a div with contact)
  const rightCell = image;

  const tableRows = [
    headerRow,
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
