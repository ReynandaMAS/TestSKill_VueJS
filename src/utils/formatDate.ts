const formatDate = (inputDate: string) => {
  const months: string[] = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
  ];
  const days: string[] = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const date = new Date(inputDate);
  const day = days[date.getDay()];
  const monthsIndex = date.getMonth();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const dayIndex = date.getDay();
  const dayName = days[dayIndex];

  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = hours < 10 ? '0' + minutes : minutes;

  return `${dayName}, ${day} ${months[monthsIndex]} ${year} ${formattedHours}.${formattedMinutes}`;
}

export default formatDate;