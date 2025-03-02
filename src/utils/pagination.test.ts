import { DOTS, pageRange } from './pagination';

const pages = (totalPages: number, currentPage: number) =>
  pageRange({
    totalCount: totalPages * 10,
    pageSize: 10,
    siblingCount: 1,
    currentPage,
  });

describe('pageRange', () => {
  it('offers every page when there are few', () => {
    expect(pages(7, 4)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('puts the dots after the current page near the start', () => {
    expect(pages(20, 2)).toEqual([1, 2, 3, 4, 5, DOTS, 20]);
  });

  it('puts the dots before the current page near the end', () => {
    expect(pages(20, 19)).toEqual([1, DOTS, 16, 17, 18, 19, 20]);
  });

  it('puts dots on both sides in the middle', () => {
    expect(pages(20, 10)).toEqual([1, DOTS, 9, 10, 11, DOTS, 20]);
  });

  it('counts a last page that is not full', () => {
    expect(
      pageRange({
        totalCount: 82,
        pageSize: 10,
        siblingCount: 1,
        currentPage: 1,
      })
    ).toEqual([1, 2, 3, 4, 5, DOTS, 9]);
  });
});
