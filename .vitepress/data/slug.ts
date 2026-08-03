export function anchorSlug(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[+\-~]/g, "")
    .replace(/[\s_.]/g, "-");
}
