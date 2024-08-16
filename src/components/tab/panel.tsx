import {
  TabPanel as HeadlessTabPanel,
  TabPanelProps as HeadlessPanelProps,
} from "@headlessui/react";
import { ComponentRef, ElementType, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";
import { forwardRefWithAs, HasDisplayName, RefProp } from "@/lib/utils/render";

const DEFAULT_PANEL_TAG = "div";

export type TabPanelProps<TTag extends ElementType = typeof DEFAULT_PANEL_TAG> =
  HeadlessPanelProps<TTag>;

function PanelFn<TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
  props: TabPanelProps<TTag>,
  ref: Ref<ComponentRef<TTag>>,
) {
  const { className, unmount, as, ...otherProps } =
    props as TabPanelProps<"div">;

  return (
    <HeadlessTabPanel
      ref={ref as Ref<ComponentRef<"div">>}
      as={as}
      static
      className={cn("w-full", className)}
      {...otherProps}
    />
  );
}

interface _internal_ComponentTabPanel extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
    props: TabPanelProps<TTag> & RefProp<typeof PanelFn<TTag>>,
  ): ReactNode;
}

const Panel = forwardRefWithAs(
  PanelFn,
) as unknown as _internal_ComponentTabPanel;

export { Panel };
