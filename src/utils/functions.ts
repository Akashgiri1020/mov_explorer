export const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // Short month (e.g., Jan, Feb, etc.)
      day: "2-digit",
    });
  };