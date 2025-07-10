/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the example exactly
  const headerRow = ['Accordion (accordion33)'];
  
  // Find all accordion items: immediate children with .accordion class
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));
  
  const rows = [headerRow];

  accordionItems.forEach((accordion) => {
    // Title cell: .w-dropdown-toggle > .paragraph-lg (if present), else .w-dropdown-toggle itself
    let titleEl = accordion.querySelector('.w-dropdown-toggle .paragraph-lg');
    if (!titleEl) {
      const toggle = accordion.querySelector('.w-dropdown-toggle');
      titleEl = toggle ? toggle : document.createElement('span');
    }
    // Content cell: .w-dropdown-list .rich-text (if present), else .w-dropdown-list itself
    let contentEl = accordion.querySelector('.w-dropdown-list .rich-text');
    if (!contentEl) {
      contentEl = accordion.querySelector('.w-dropdown-list') || document.createElement('div');
    }
    rows.push([titleEl, contentEl]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
