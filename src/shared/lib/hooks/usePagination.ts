import { useState } from "react";

const usePagination = <T>(items: T[], itemsPerPage: number) => {
  const [current, setCurrent] = useState(0);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pageItems = items.slice(current * itemsPerPage, (current + 1) * itemsPerPage);

  const handlePrev = () => setCurrent(prev => Math.max(0, prev - 1));
  const handleNext = () => setCurrent(prev => Math.min(totalPages - 1, prev + 1));

  return { current, totalPages, pageItems, handlePrev, handleNext };
};

export default usePagination;
