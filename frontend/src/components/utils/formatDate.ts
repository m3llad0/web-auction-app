export default function formatDate(dateString: string): string {
    // Convert the input date string to a Date object
    const date = new Date(dateString);
  
    // Format the date using Intl.DateTimeFormat for a more readable output
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    }).format(date);
  
    return formattedDate;
  }

