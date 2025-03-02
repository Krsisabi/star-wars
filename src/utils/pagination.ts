export const DOTS = '...';

type PageItem = number | typeof DOTS;

type PageRangeOptions = {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
};

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export function pageRange({
  totalCount,
  pageSize,
  siblingCount,
  currentPage,
}: PageRangeOptions): PageItem[] {
  const last = Math.ceil(totalCount / pageSize);
  const edgeCount = 3 + 2 * siblingCount;

  if (edgeCount + 2 >= last) return range(1, last);

  const left = Math.max(currentPage - siblingCount, 1);
  const right = Math.min(currentPage + siblingCount, last);

  if (left <= 2) return [...range(1, edgeCount), DOTS, last];
  if (right >= last - 2) return [1, DOTS, ...range(last - edgeCount + 1, last)];
  return [1, DOTS, ...range(left, right), DOTS, last];
}
