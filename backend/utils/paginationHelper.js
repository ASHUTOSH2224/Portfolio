// Helper class for handling pagination
export class PaginationHelper {
  constructor(query) {
    this.query = query;
    this.page = parseInt(query.page) || 1;
    this.limit = parseInt(query.limit) || 10;
    this.skip = (this.page - 1) * this.limit;
  }

  getPagination() {
    return {
      page: this.page,
      limit: this.limit,
      skip: this.skip
    };
  }
} 