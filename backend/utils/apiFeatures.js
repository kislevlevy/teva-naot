export default class ApiFeatures {
  constructor(req, find) {
    this.req = req;
    this.find = find;
  }
  filter() {
    // Set fillter abbilaties:
    const nonFilterFields = [
      'sort',
      'page',
      'limit',
      'fields',
      'q',
      'availableSizes',
    ];
    const { q = '', availableSizes = '' } = this.req.query;

    // Create filter query object:
    this.filterQuery = JSON.parse(
      JSON.stringify(this.req.query).replace(
        /\b(gt|gte|lt|lte|eq)\b/g,
        (match) => `$${match}`
      )
    );
    nonFilterFields.forEach((ele) => delete this.filterQuery[ele]);

    // Add regex expretion for filter by query:
    if (q) this.filterQuery.name = new RegExp(q, 'i');

    // return:
    this.find.find(this.filterQuery);
    if (availableSizes)
      this.find.find({
        $and: [
          { 'availableSizes.0': { $lte: availableSizes } },
          { 'availableSizes.1': { $gte: availableSizes } },
        ],
      });

    return this;
  }

  sort() {
    const { sort = 'name' } = this.req.query;
    this.find.sort(sort.replaceAll(',', ' '));
    return this;
  }

  fields() {
    const { fields = '-__v' } = this.req.query;
    this.find.select(fields.replaceAll(',', ' '));
    return this;
  }

  pagination() {
    const { page = 1, limit = 5 } = this.req.query;
    const skip = (page - 1) * limit;
    this.find.skip(skip).limit(limit);
    return this;
  }
}
