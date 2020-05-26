interface FocusIndicatorParams {
  // The global node which has focus ring styles and it is this node which is used as
  // focus indicator when a focusable element receives focus
  node: HTMLElement;
  // The offset from the element's container size
  offset?: number;
  // Default styles for the focus node
  style?: CSSStyleDeclaration | {};
}

function focusIndicator({
  node,
  offset = 0,
  style = {},
}: FocusIndicatorParams) {
  const defaultStyles = {
    position: 'absolute',
    zIndex: 9999,
    opacity: 0,
    borderRadius: '3px',
    pointerEvents: 'none',
    boxShadow: 'rgb(59, 152, 252) 0px 0px 0px 2px',
    ...style,
  };
  /**
   *
   * @param event - HTMLEvent
   *
   */
  const handleFocusIn = (event: FocusEvent) => {
    const noFocusIndicator = Boolean(
      (event.target as HTMLElement).dataset.noFocusIndicator
    );

    if (noFocusIndicator || node == null || !event.target) return;

    const target = event.target as HTMLElement;
    const bounds = target.getBoundingClientRect();
    const targetStyle = window.getComputedStyle(target);

    const x = bounds.left;
    const y = bounds.top;

    Object.assign(node.style, {
      ...defaultStyles,
      opacity: 1,
      width: bounds.width + offset + 'px',
      height: bounds.height + offset + 'px',
      left: x - offset / 2 + window.pageXOffset + 'px',
      top: y - offset / 2 + window.pageYOffset + 'px',
      borderRadius:
        targetStyle.getPropertyValue('border-radius') !== '0px'
          ? targetStyle.getPropertyValue('border-radius')
          : defaultStyles.borderRadius,
    });
  };

  /**
   *
   */
  const handleFocusOut = () => {
    if (node == null) return;

    Object.assign(node.style, {
      ...defaultStyles,
      opacity: 0,
    });
  };

  document.addEventListener('focusin', handleFocusIn);
  document.addEventListener('focusout', handleFocusOut);

  return () => {
    document.removeEventListener('focusin', handleFocusIn);
    document.removeEventListener('focusout', handleFocusOut);
  };
}

export default focusIndicator;
