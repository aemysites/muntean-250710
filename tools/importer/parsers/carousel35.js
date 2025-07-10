/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the two columns
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get the two main sides of the grid
  const [textSide, imagesSide] = mainGrid.querySelectorAll(':scope > div');
  if (!textSide || !imagesSide) return;

  // Find the grid that contains the images (right side)
  const imagesGrid = imagesSide.querySelector('.w-layout-grid');
  if (!imagesGrid) return;
  const images = Array.from(imagesGrid.querySelectorAll('img'));

  // Compose the text content from the left side
  const heading = textSide.querySelector('h1');
  const desc = textSide.querySelector('p');
  const buttonGroup = textSide.querySelector('.button-group');

  // Gather text cell content (reference document elements!)
  const textCell = [];
  if (heading) {
    const h2 = document.createElement('h2');
    h2.innerHTML = heading.innerHTML;
    textCell.push(h2);
  }
  if (desc) textCell.push(desc);
  if (buttonGroup) textCell.push(buttonGroup);

  // Prepare block rows: first row is header, then one per image
  const rows = [['Carousel']];
  images.forEach((img, idx) => {
    if (idx === 0) {
      // first slide: image + text
      rows.push([
        img,
        textCell.length === 1 ? textCell[0] : textCell
      ]);
    } else {
      // just image, blank text column
      rows.push([img, '']);
    }
  });

  // Create and insert the Carousel table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
