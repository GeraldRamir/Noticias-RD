import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "";
  return format(new Date(date), "d MMM yyyy", { locale: es });
}

export function formatRelative(date: Date | string | null | undefined) {
  if (!date) return "";
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es });
}

export function truncate(text: string, length = 140) {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}…`;
}
