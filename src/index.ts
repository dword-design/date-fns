import {
  addDays,
  eachWeekOfInterval as dateFnsEachWeekOfInterval,
  endOfDay,
  format as dateFnsFormat,
  formatRelative as dateFnsFormatRelative,
  getDate,
  getMonth,
  isAfter,
  isEqual,
  startOfDay,
  startOfMonth,
  startOfWeek as dateFnsStartOfWeek,
} from 'date-fns';
import de from 'date-fns/locale/de/index.js';
import en from 'date-fns/locale/en-US/index.js';

export {
  startOfDay,
  endOfDay,
  isSameDay,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  eachDayOfInterval,
  isAfter,
  max,
  addDays,
  parse,
  parseISO,
  differenceInDays,
  isSameMonth,
  getISOWeek,
  subDays,
  addHours,
  subHours,
  getYear,
  getMonth,
  getDate,
  subMonths,
  addMonths,
  setYear,
  setMonth,
  setDate,
  getISODay,
  areIntervalsOverlapping,
  isWithinInterval,
} from 'date-fns';

const locales = {
  de: {
    ...de,
    formatRelative: (token: string) =>
      ({
        lastWeek: "'letzten' eeee",
        nextWeek: 'eeee',
        other: 'P',
        today: "'heute",
        tomorrow: "'morgen",
        yesterday: "'gestern",
      })[token],
  },
  en,
};

const locale = locales.de;

export const format = <TOptions>(
  date: Date | number,
  formatStr: string,
  options: TOptions,
) => dateFnsFormat(date, formatStr, { locale, ...options });

export const formatRelative = <TOptions>(
  date: Date | number,
  baseDate: Date | number,
  options: TOptions,
) => dateFnsFormatRelative(date, baseDate, { locale, ...options });

export const startOfWeek = <TOptions>(date: Date | number, options: TOptions) =>
  dateFnsStartOfWeek(date, { locale, ...options });

export const getWeekOfMonth = (date: Date | number) =>
  Math.floor((getDate(date) - 1) / 7);

export const eachWeekOfInterval = <TOptions>(
  interval: Interval,
  options: TOptions,
) => dateFnsEachWeekOfInterval(interval, { locale, ...options });

export const isSameOrAfter = (
  date: Date | number,
  dateToCompare: Date | number,
) => isEqual(date, dateToCompare) || isAfter(date, dateToCompare);

export const isLastWeekOfMonth = (date: Date | number) =>
  getMonth(addDays(date, 7)) !== getMonth(date);

export const monthCalendarRange = (month: Date | number) => {
  const firstOfMonth = startOfMonth(month);

  const start = startOfDay(
    firstOfMonth.getDay() === 1 ? firstOfMonth : startOfWeek(firstOfMonth),
  );

  return { end: endOfDay(addDays(start, 34)), start };
};
