import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

interface UseDragScrollbarProps {
  scrollRef: RefObject<HTMLElement | null>;
}

export const useDragScrollbar = ({ scrollRef }: UseDragScrollbarProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl || isDragging) return;

    const syncProgress = () => {
      const max = scrollEl.scrollWidth - scrollEl.clientWidth;
      setProgress(max > 0 ? scrollEl.scrollLeft / max : 0);
    };

    syncProgress();
    scrollEl.addEventListener("scroll", syncProgress);
    return () => scrollEl.removeEventListener("scroll", syncProgress);
  }, [scrollRef, isDragging]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollEl.scrollLeft += e.deltaY;
    };

    scrollEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollEl.removeEventListener("wheel", handleWheel);
  }, [scrollRef]);

  const moveToClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      const scrollEl = scrollRef.current;
      if (!track || !scrollEl) return;

      const { left, width } = track.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - left) / width, 0), 1);
      const max = scrollEl.scrollWidth - scrollEl.clientWidth;

      setProgress(ratio);
      scrollEl.scrollLeft = ratio * max;
    },
    [scrollRef],
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => moveToClientX(e.clientX);
    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, moveToClientX]);

  const handleTrackMouseDown = (clientX: number) => {
    setIsDragging(true);
    moveToClientX(clientX);
  };

  return { trackRef, progress, handleTrackMouseDown };
};
