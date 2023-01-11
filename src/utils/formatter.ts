const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const convertLocalDateTimeFormat = (date: string) => {
  return new Date(date).toLocaleString("ko-KR", { timeZone: clientTimezone });
};

export default {
  convertLocalDateTimeFormat,
};
