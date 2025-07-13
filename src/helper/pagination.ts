const paginatedResults = function (model: any) {
  return (req: any, res: any, next: any) => {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 8;
    const startIndex: number = (page - 1) * limit;
    const endIndex: number = page * limit;
    const results: any = {};

    if (endIndex < model.length) {
      results.next = { page: page + 1, limit: limit };
    }

    if (startIndex > 0) {
      results.previous = { page: page - 1, limit: limit };
    }

    model.reverse();
    results.totalPages = model.length / limit;
    results.results = model.slice(startIndex, endIndex);
    res.paginatedResults = results;
    next();
  };
};

export default paginatedResults