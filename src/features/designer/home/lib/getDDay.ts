const parseDeadlineDate = (deadline: string) => {
  const dateMatch = deadline.match(/^(\d{4})[.-](\d{1,2})[.-](\d{1,2})/);

  if (!dateMatch) {
    return new Date(deadline);
  }

  const [, year, month, day] = dateMatch;

  return new Date(Number(year), Number(month) - 1, Number(day));
};

export const getDDay = (deadline: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = parseDeadlineDate(deadline);
  targetDate.setHours(0, 0, 0, 0);

  if (Number.isNaN(targetDate.getTime())) {
    return "-";
  }

  const diff = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return diff >= 0 ? `D-${diff}` : "-";
};
