export const getDDay = (deadline?: string | null) => {
  if (!deadline) return "-";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(deadline);

  if (Number.isNaN(target.getTime())) return "-";

  target.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return diff >= 0 ? `D-${diff}` : "-";
};

export const formatSubmitDeadline = (deadline?: string | null) => {
  if (!deadline) return "-";

  const date = new Date(deadline);

  if (Number.isNaN(date.getTime())) return "-";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = date.getHours() >= 12 ? "pm" : "am";
  const hours = date.getHours() % 12 || 12;

  return `${year}.${month}.${day} ${hours}:${minutes}${period}`;
};
