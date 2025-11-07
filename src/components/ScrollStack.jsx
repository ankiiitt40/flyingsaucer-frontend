import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={`scroll-stack-card relative w-full my-8 p-6 md:p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.2)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.04,
  itemStackDistance = 40,
  stackPosition = "25%",
  scaleEndPosition = "10%",
  baseScale = 0.88,
  useWindowScroll = true,
}) => {
  const scrollerRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const tickingRef = useRef(false);

  const calculateProgress = (scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  };

  const parsePercentage = (value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  };

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    cardsRef.current.forEach((card, i) => {
      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      const translateY =
        Math.max(0, scrollTop - cardTop + stackPositionPx + itemStackDistance * i) * 0.95;

      const newTransform = {
        translateY,
        scale,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const changed =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.2 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.002;

      if (changed) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
        lastTransformsRef.current.set(i, newTransform);
      }
    });
  }, [
    baseScale,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    getScrollData,
    getElementOffset,
  ]);

  // ✅ Perfect smooth scroll loop (Lenis + RAF)
  useLayoutEffect(() => {
    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll(".scroll-stack-card")
        : scrollerRef.current.querySelectorAll(".scroll-stack-card")
    );
    cardsRef.current = cards;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
      lerp: 0.08,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          updateCardTransforms();
          tickingRef.current = false;
        });
      }
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    updateCardTransforms();

    return () => {
      lenis.destroy();
    };
  }, [updateCardTransforms, useWindowScroll]);

  return (
    <div
      ref={scrollerRef}
      className={`relative w-full ${
        useWindowScroll ? "" : "overflow-y-auto"
      } ${className}`}
      style={{
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="scroll-stack-inner pt-[20vh] px-6 md:px-20 pb-[60rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
