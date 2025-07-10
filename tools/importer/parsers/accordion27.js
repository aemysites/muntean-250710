/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all accordion items (each .divider)
  const rows = [];
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  dividers.forEach(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      const children = Array.from(grid.children);
      if (children.length >= 2) {
        rows.push([children[0], children[1]]);
      } else if (children.length === 1) {
        rows.push([children[0], '']);
      }
    }
  });

  // Build the header row with a cell that will span 2 columns
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Accordion (accordion27)';
  headerCell.setAttribute('colspan', '2');
  const headerRow = [headerCell];

  // Compose table rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
