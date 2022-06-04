class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        return this;
        
    }

    filter() {
        return this;
    }

    sort() {
        return this;
    }

    paginate() {

        return this;
    }

}

module.exports = APIFeatures;