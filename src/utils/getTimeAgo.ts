interface GetTimeAgoOptions {
  withSuffix?: boolean;
}

export function getTimeAgo(dateStr: string, options: GetTimeAgoOptions = {}): string {
  const now = Date.now();
  const date = new Date(dateStr);
  const diffMs = now - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  const suffix = options.withSuffix ? ' trước' : '';

  if (diffDays > 30) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear === year ? `${day} Th${month}` : `${day} Th${month}, ${year}`;
  }

  if (diffDays > 0) {
    return `${diffDays} ngày${suffix}`;
  }

  if (diffHours > 0) {
    return `${diffHours} giờ${suffix}`;
  }

  return 'Vừa xong';
}
