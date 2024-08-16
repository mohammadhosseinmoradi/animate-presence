import { TabList as HeadlessTabList, TabListProps } from "@headlessui/react";
import { Swiper, SwiperClass } from "swiper/react";
import { forwardRef, ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTabContext } from "./context";
import { cva } from "cva";

const list = cva({
  base: "flex justify-start overflow-hidden",
  variants: {
    variant: {
      underline: "border-b",
      highlight:
        "bg-white rounded-full py-1 px-4 shadow-[0_0_4px_rgba(0,0,0,0.2)]",
      none: "",
    },
  },
});

const List = forwardRef<HTMLDivElement, TabListProps<"div">>((props, ref) => {
  const { className, children, ...otherProps } = props;
  const { selectedIndex, variant, onChange } = useTabContext();
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;
  }, [swiperRef.current]);

  useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slideTo(selectedIndex);
  }, [selectedIndex]);

  const resolvedChildrenArray = (
    Array.isArray(children) ? children : [children]
  ) as ReactNode[];

  return (
    <HeadlessTabList
      className={(bag) =>
        cn(
          list({
            variant,
          }),
          typeof className === "function" ? className(bag) : className,
        )
      }
      {...otherProps}
    >
      {(bag) => (
        <Swiper
          initialSlide={selectedIndex}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onResize={(swiper) => swiper.slideTo(selectedIndex)}
          slidesPerView="auto"
          centeredSlides
          centeredSlidesBounds
          loop={false}
          keyboard={true}
          className={cn("!m-0 !max-w-full !overflow-visible")}
        >
          {typeof children === "function" ? children(bag) : children}
        </Swiper>
      )}
    </HeadlessTabList>
  );
});

List.displayName = HeadlessTabList.displayName;

export { List };
