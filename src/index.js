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
} from 'date-fns'
import de from 'date-fns/locale/de/index.js'
import en from 'date-fns/locale/en-US/index.js'

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
} from 'date-fns'

const locales = {
  de: {
    ...de,
    formatRelative: token =>
      ({
        lastWeek: "'letzten' eeee",
        nextWeek: 'eeee',
        other: 'P',
        today: "'heute",
        tomorrow: "'morgen",
        yesterday: "'gestern",
      }[token]),
  },
  en,
}

const locale = locales.de

export const format = (date, formatStr, options) =>
  dateFnsFormat(date, formatStr, { locale, ...options })

export const formatRelative = (date, baseDate, options) =>
  dateFnsFormatRelative(date, baseDate, { locale, ...options })

export const startOfWeek = (date, options) =>
  dateFnsStartOfWeek(date, { locale, ...options })

export const getWeekOfMonth = date => Math.floor((getDate(date) - 1) / 7)

export const eachWeekOfInterval = (interval, options) =>
  dateFnsEachWeekOfInterval(interval, { locale, ...options })

export const isSameOrAfter = (date, dateToCompare) =>
  isEqual(date, dateToCompare) || isAfter(date, dateToCompare)

export const isLastWeekOfMonth = date =>
  getMonth(addDays(date, 7)) !== getMonth(date)

export const monthCalendarRange = month => {
  const firstOfMonth = startOfMonth(month)

  const start = startOfDay(
    firstOfMonth.getDay() === 1 ? firstOfMonth : startOfWeek(firstOfMonth)
  )

  return {
    end: endOfDay(addDays(start, 34)),
    start,
  }
}
