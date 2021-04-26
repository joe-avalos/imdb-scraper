const fs = require("fs");

const { addToObject } = require("./addToObject");
const { getUncommonWords } = require("./getUncommonWords");

const getPeople = (moviesArray, peoplePath) => {
  if (fs.existsSync(peoplePath)) {
    const raw = fs.readFileSync(peoplePath);
    return JSON.parse(raw);
  }
  const people = {};
  try {
    moviesArray.forEach((movie) => {
      movie.directors.forEach((director) => {
        addToObject(people, director, movie.title);
      });
      movie.stars.forEach((star) => {
        addToObject(people, star, movie.title);
      });
    });
  } catch (e) {
    console.error(e);
  }
  const resultArray = [];
  Object.entries(people).forEach((person) => {
    resultArray.push({
      name: person[0],
      searchTerms: getUncommonWords(person[0]),
      movies: person[1].movies,
    });
  });
  const data = JSON.stringify(resultArray);
  fs.writeFileSync(peoplePath, data);
  return resultArray;
};

module.exports = {
  getPeople,
};
