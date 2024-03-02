export class PageInfo {
  private hasNextPage: boolean;
  private endCursor: string | null;
  private totalCount: number;
  constructor() {}

  setTotalCount(totalCount: number): void {
    this.totalCount = totalCount;
  }

  getTotalCount(): number {
    return this.totalCount;
  }

  setHasNextPage(hasNextPage: boolean): void {
    this.hasNextPage = hasNextPage;
  }

  setEndCursor(endCursor: string | null): void {
    this.endCursor = endCursor;
  }

  getHasNextPage(): boolean {
    return this.hasNextPage;
  }

  getEndCursor(): string {
    return this.endCursor;
  }
}
