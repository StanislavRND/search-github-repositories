// Преобразование даты в формат DD.MM.YYYY
export const transformationDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month}.${day}.${year}`;
};
