import {
  TabPanels as HeadlessTabPanels,
  TabPanelsProps as HeadlessTabPanelsProps,
} from "@headlessui/react";
import { ComponentRef, ElementType, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTabContext } from "./context";
import { usePrevious } from "@/hooks/use-previous";
import { forwardRefWithAs } from "@/lib/utils/render";
import type { HasDisplayName, RefProp } from "@/lib/utils/render";

const DEFAULT_PANEL_TAG = "div";

export type TabPanelsProps<
  TTag extends ElementType = typeof DEFAULT_PANEL_TAG,
> = HeadlessTabPanelsProps<TTag>;

function PanelsFn<TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
  props: TabPanelsProps<TTag>,
  ref: Ref<ComponentRef<TTag>>,
) {
  const {
    as = "div",
    className,
    children,
    ...otherProps
  } = props as TabPanelsProps<"div">;

  const { selectedIndex, onChange } = useTabContext();
  const prevSelectedIndex = usePrevious(selectedIndex);
  const swipeDirection = selectedIndex > (prevSelectedIndex || 0);

  return (
    <HeadlessTabPanels
      as={as}
      ref={ref as Ref<HTMLDivElement>}
      className={(bag) =>
        cn(
          "translate-y-[0px] overflow-hidden",
          typeof className === "function" ? className(bag) : className,
        )
      }
      {...otherProps}
    >
      {(bag) => {
        let resolvedChildren =
          typeof children === "function" ? children(bag) : children;

        const resolvedChildrenArray = (
          Array.isArray(resolvedChildren)
            ? resolvedChildren
            : [resolvedChildren]
        ) as ReactNode[];

        return (
          <AnimatePresence
            initial={false}
            mode="popLayout"
            custom={swipeDirection}
          >
            <motion.div
              key={selectedIndex}
              custom={swipeDirection}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              drag="x"
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipeConfidenceThreshold = 10000;

                const swipePower = (offset: number, velocity: number) => {
                  return Math.abs(offset) * velocity;
                };

                const swipe = swipePower(offset.x, velocity.x);

                if (swipe > swipeConfidenceThreshold) {
                  if (selectedIndex > 0) onChange(selectedIndex - 1);
                } else if (swipe < -swipeConfidenceThreshold) {
                  if (selectedIndex < resolvedChildrenArray.length - 1)
                    onChange(selectedIndex + 1);
                }
              }}
              className="w-full"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 22,
              }}
              {...otherProps}
            >
              {(() => {
                if (selectedIndex >= resolvedChildrenArray.length) return null;
                return resolvedChildrenArray[selectedIndex];
              })()}
            </motion.div>
          </AnimatePresence>
        );
      }}
    </HeadlessTabPanels>
  );
}

interface _internal_ComponentTabPanels extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
    props: TabPanelsProps<TTag> & RefProp<typeof PanelsFn<TTag>>,
  ): ReactNode;
}

const Panels = forwardRefWithAs(
  PanelsFn,
) as unknown as _internal_ComponentTabPanels;

export { Panels };

const variants = {
  enter: (direction: boolean) => {
    return {
      x: direction ? "100%" : "-100%",
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: boolean) => {
    return {
      x: direction ? "-100%" : "100%",
      opacity: 0,
    };
  },
};
