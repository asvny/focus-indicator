import * as React from 'react';
import focusIndicator from 'focus-indicator';

interface FocusIndicatorProps {
  offset?: number;
  style?: React.CSSProperties;
}

function FocusIndicator({ offset = 0, style }: FocusIndicatorProps) {
  const nodeRef = React.useRef(null);

  const styleString = React.useMemo(() => JSON.stringify(style), [style]);

  React.useEffect(() => {
    const unsubscribeFocusIndicator = focusIndicator({
      offset,
      style,
      node: nodeRef.current,
    });

    return unsubscribeFocusIndicator;
  }, [nodeRef, offset, styleString]);

  return <div ref={nodeRef} />;
}

export default FocusIndicator;
