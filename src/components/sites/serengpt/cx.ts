/** Joins truthy class names (keeps the source site's class names untouched). */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
