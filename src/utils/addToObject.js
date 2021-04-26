const addToObject = (obj, term, title) => {
  if (obj[term] !== undefined) {
    const movieSet = obj[term].movieSet;
    const movieArray = obj[term].movies;
    if (!movieSet.has(title)) {
      movieSet.add(title);
      movieArray.push(title);
    }
  } else {
    obj[term] = { movieSet: new Set([title]), movies: [title] };
  }
};

const addArrayToObject = (obj, term, array) => {
  if (obj[term] !== undefined) {
    const movieArray = obj[term].movies;
    movieArray.push(...array);
  } else {
    obj[term] = { movies: [...array] };
  }
};

module.exports = {
  addToObject,
  addArrayToObject,
};
