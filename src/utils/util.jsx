export function formatDateTime(dateString) {
    // Step 1: Parse the date and time
    const [datePart, timePartWithZone] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const timePart = timePartWithZone.split('+')[0]; // Remove timezone
    const [hour, minute] = timePart.split(':');
  
    // Step 2: Convert month number to name
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = months[parseInt(month, 10) - 1];
  
    // Step 3: Format time to 12-hour format
    let formattedHour = parseInt(hour, 10);
    let period = "AM";
    if (formattedHour === 0) {
      formattedHour = 12; // Midnight
    } else if (formattedHour === 12) {
      period = "PM"; // Noon
    } else if (formattedHour > 12) {
      formattedHour -= 12;
      period = "PM";
    }
  
    // Step 4: Combine into final format
    const formattedDate = `${monthName} ${parseInt(day, 10)}, ${year}`;
    const formattedTime = `${formattedHour}:${minute} ${period}`;
    return `${formattedDate}, ${formattedTime}`;
  }
  
//   // Example usage
//   const dateString = "2024-03-01T15:30:00+05:30";
//   console.log(formatDateTime(dateString));
  