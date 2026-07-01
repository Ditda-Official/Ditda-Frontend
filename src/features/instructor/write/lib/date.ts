export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

export const getFirstAvailableDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 12);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getMinFirstDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 11);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getMinFinalDate = (date: Date) => {
  const minFinal = new Date(date);
  minFinal.setDate(minFinal.getDate() + 14);
  return minFinal;
};

export const toApiDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};
