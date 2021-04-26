const fs = require("fs");
const XXH = require("xxhashjs");

const queryHashTable = (term, path) => {
  const raw = fs.readFileSync(path);
  const hashTable = JSON.parse(raw);
  const terms = term.split(" ");
  const results = [];
  terms.forEach((word) => {
    const index =
      XXH.h32(0xabcd).update(word).digest().toNumber() % hashTable.length;
    results.push(hashTable[index]);
  });
  return results.length > 1 ? intersectMany(...results) : results;
};

const querySearchTerms = (term, path) => {
  const raw = fs.readFileSync(path);
  const searchTerms = JSON.parse(raw);
  const terms = term.split(" ");
  const results = [];
  terms.forEach((word) => {
    if (searchTerms[word] !== undefined) {
      results.push(searchTerms[word].movies);
    }
  });
  return results.length > 1 ? intersectMany(...results) : results;
};

const intersection = (arr1, arr2) => {
  return arr1.filter((item) => arr2.includes(item));
};

const intersectMany = (...arrays) => {
  let result = arrays[0].slice();
  for (let i = 1; i < arrays.length; i++) {
    result = intersection(result, arrays[i]);
  }
  return result;
};

module.exports = {
  queryHashTable,
  querySearchTerms,
};
