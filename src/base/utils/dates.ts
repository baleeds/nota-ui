import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);
dayjs.extend(relativeTime);

export const toDateTime = (
  date: string | Date,
  format: string | undefined = 'M/D/YYYY - h:mm A'
) => {
  if (!date) {
    return undefined;
  }

  const inputTime = dayjs(date);
  const formattedDate = inputTime.format(format);

  if (formattedDate === 'Invalid Date') {
    return undefined;
  }
  return formattedDate;
};

export const toSimpleDate = (date: string | Date) => {
  const currentTime = dayjs();
  const inputTime = dayjs(date);

  if (currentTime.isSame(inputTime, 'day')) {
    return 'Today';
  }
  if (currentTime.week() === inputTime.week()) {
    return inputTime.from(currentTime);
  }
  if (currentTime.year() === inputTime.year()) {
    return inputTime.format('MMM D');
  }

  return inputTime.format('MMM D, YYYY');
};

// export const toDate = (date: string | Date) => {
//   if (!date) return null;
//   const inputTime = dayjs(date);
//   return inputTime.isValid() ? inputTime.format('MMM D, YYYY') : 'invalid date';
// };

// export const unixToDate = (date: number) => {
//   if (!date) return null;
//   return dayjs.unix(date).format('MMM D, YYYY');
// };
