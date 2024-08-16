import { Tab as HeadlessTab, TabProps } from "@headlessui/react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useTabContext } from "./context";
import { cva } from "cva";

const tab = cva({
  base: cn(
    "relative w-auto transition-all duration-300",
    "flex gap-2 justify-center items-center",
    "px-4 py-2 text-sm data-[selected]:font-bold",
    "text-neutral-600 data-[selected]:text-primary",
    "cursor-pointer",
  ),
  variants: {
    variant: {
      highlight: "py-1",
      underline: "",
      none: "",
    },
    selected: {
      true: "",
      false: "z-10",
    },
  },
  compoundVariants: [
    {
      variant: "highlight",
      selected: false,
      className: "text-neutral-500",
    },
  ],
});

const tabIndicator = cva({
  base: "absolute bottom-0 inset-x-0 h-0.5 bg-neutral-600",
  variants: {
    variant: {
      highlight: "bg-neutral-200 h-full z-[-1]",
      underline: "",
      none: "h-[0px] bg-[transparent]",
    },
  },
});

const Tab = forwardRef<HTMLDivElement, TabProps<"div">>((props, ref) => {
  const { className, children, ...otherProps } = props;
  const { id, variant } = useTabContext();

  return (
    <SwiperSlide className='w-auto'>
      <HeadlessTab
        ref={ref}
        className={(bag) =>
          cn(
            variant !== "none" &&
              tab({
                variant,
                selected: bag.selected,
              }),
            typeof className === "function" ? className(bag) : className,
          )
        }
        {...otherProps}
      >
        {(bag) => {
          return (
            <>
              {typeof children === "function" ? children(bag) : children}
              {variant !== "none" && bag.selected && (
                <motion.div
                  className={cn(
                    tabIndicator({
                      variant,
                    }),
                  )}
                  style={{ borderRadius: 9999 }}
                  layoutId={id}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                />
              )}
            </>
          );
        }}
      </HeadlessTab>
    </SwiperSlide>
  );
});

Tab.displayName = SwiperSlide.displayName;

export { Tab };
