const XXH = require("xxhashjs");
const fs = require("fs");
const path = require("path");

const { addToObject, addArrayToObject } = require("./addToObject");

const getSearchTerms = (movies, people) => {
  const searchTerms = {};
  movies.forEach((movie) => {
    movie.searchTerms.forEach((term) => {
      addToObject(searchTerms, term, movie.title);
    });
  });
  people.forEach((person) => {
    person.searchTerms.forEach((term) => {
      addArrayToObject(searchTerms, term, person.movies);
    });
  });
  const entries = Object.entries(searchTerms);
  const entriesLength = entries.length;
  const hashTable = new Array(entriesLength * 3);
  const hashTablePath = path.join(global.APP_ROOT, "data/hashTable.json");
  const searchTermsPath = path.join(global.APP_ROOT, "data/searchTerms.json");
  entries.forEach((term) => {
    const index =
      XXH.h32(0xabcd).update(term[0]).digest().toNumber() % (entriesLength * 3);
    hashTable[index] = term[1].movies;
  });
  const HTData = JSON.stringify(hashTable);
  const STData = JSON.stringify(searchTerms);
  fs.writeFileSync(hashTablePath, HTData);
  fs.writeFileSync(searchTermsPath, STData);
};

module.exports = {
  getSearchTerms,
};
