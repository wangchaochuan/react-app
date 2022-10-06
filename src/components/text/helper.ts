export const getContainer = (container: HTMLElement): HTMLElement => {
  let node: HTMLElement | null = container;

  while (node && node !== document.body) {
    const { position, overflowX, overflowY } = getComputedStyle(node, null);

    if (overflowX === 'visible' && overflowY === 'visible' && position !== 'static') {
      return node;
    } else {
      node = node.parentElement;
    }
  }

  return document.body;
};
