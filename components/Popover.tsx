"use client";

import React from "react";
import { createPortal } from "react-dom";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useInteractions,
  FloatingArrow,
  Placement,
} from "@floating-ui/react";

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  referenceElement: HTMLElement | null;
  placement?: Placement;
}

export default function Popover({
  isOpen,
  onClose,
  children,
  className = "",
  referenceElement,
  placement = "top",
}: PopoverProps) {
  const arrowRef = React.useRef(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
    placement,
    middleware: [
      offset(12),
      flip({
        fallbackPlacements: ["top", "bottom", "left", "right"],
        fallbackStrategy: "bestFit",
      }),
      shift({
        padding: 8,
        crossAxis: true,
      }),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
    elements: {
      reference: referenceElement,
    },
  });

  const hover = useHover(context);
  const { getFloatingProps } = useInteractions([hover]);

  if (!isOpen || !mounted) return null;

  const content = (
    <div
      ref={refs.setFloating}
      style={{
        ...floatingStyles,
        zIndex: 1000,
        position: "absolute",
      }}
      {...getFloatingProps()}
      className={className}
    >
      <div className="bg-brand-gray-6 text-white rounded-xl p-6 relative">
        <FloatingArrow
          ref={arrowRef}
          context={context}
          className="fill-brand-gray-6"
          width={12}
          height={6}
        />
        {children}
      </div>
    </div>
  );

  const portalContainer = document.getElementById("popover-container");
  if (!portalContainer) return content;

  return createPortal(content, portalContainer);
}
