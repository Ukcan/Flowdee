import React from 'react';

/**
 * Layout/StickySplit — narrative two-column layout.
 *
 * The `aside` rail holds the section's statement and stays pinned while the
 * `children` column scrolls through its own content. Used when a section needs
 * to read as a *progression* rather than as a grid of equivalent items.
 *
 * Mobile: no sticky, no absolute positioning — the rail simply stacks above the
 * content so the reading order stays linear and matches the DOM order.
 */
interface StickySplitProps {
  /** Left rail — pinned from `lg` up, stacked on top below that breakpoint. */
  aside: React.ReactNode;
  children: React.ReactNode;
  /** Offset from the viewport top when pinned (clears the fixed header). */
  stickyTopClassName?: string;
  className?: string;
}

export function StickySplit({
  aside,
  children,
  stickyTopClassName = 'lg:top-32',
  className = '',
}: StickySplitProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 xl:gap-24 ${className}`}
    >
      <div className={`lg:sticky lg:self-start ${stickyTopClassName}`}>{aside}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
