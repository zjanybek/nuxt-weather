export function formatWeekdayDate(timezoneOffset) {
  const currentDate = new Date();
  
  const localDate = new Date(currentDate.getTime() + timezoneOffset * 1000);
  
  const options = { weekday: 'long', day: 'numeric' };
  const formattedDate = localDate.toLocaleDateString('en-US', options);

  const [dayOfWeek, dayOfMonth] = formattedDate.split(', ');

  return `${dayOfWeek}`;
}