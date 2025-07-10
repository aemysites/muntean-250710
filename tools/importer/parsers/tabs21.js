/* global WebImporter */
export default function parse(element, { document }) {
  // Get tab label links
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];
  // Get tab content panes
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // Each row after the header is [label, content], so we'll always have 2 columns
  const cells = [];
  // Header row: single cell, but create with two columns to ensure it spans both; use empty string for 2nd cell
  cells.push(['Tabs', '']);
  const numTabs = Math.max(tabLinks.length, tabPanes.length);
  for (let i = 0; i < numTabs; i++) {
    // Label text (prefer div, fallback to link text)
    let label = '';
    if (tabLinks[i]) {
      const labelEl = tabLinks[i].querySelector('*');
      label = labelEl ? labelEl.textContent.trim() : tabLinks[i].textContent.trim();
    }
    let content = '';
    if (tabPanes[i]) {
      content = Array.from(tabPanes[i].children);
    }
    cells.push([label, content]);
  }
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
