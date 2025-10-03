export function formatDate(dateStr: string | null): string {
  if (!dateStr) {return '';}
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function formatPrice(cost: string | number | null, isFree: boolean): string {
  if (isFree) {return 'Free';}
  if (cost == null || cost === '') {return 'N/A';}

  if (typeof cost === 'number') {
    return `${cost}`;
  }
  return cost;
}


export function truncate(text: string, maxLength = 100): string {
  if (!text) {return '';}
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
}


export function formatUrl(url: string | null): string {
  if (!url) {return '#';}
  return url.startsWith('http') ? url : `https://${url}`;
}

export function formatFoursquareImgUrl(photo: any, size: string = 'original'): string | null {
  if (!photo) {return null;}
  return `${photo.prefix}${size}${photo.suffix}`;
}
