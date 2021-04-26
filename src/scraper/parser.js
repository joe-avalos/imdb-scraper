const cheerio = require("cheerio");
const { getUncommonWords } = require("../utils/getUncommonWords");

const getContentElement = ($, $el) => $($el).find("div.lister-item-content");
const getTitle = ($, content) =>
  $(content).find("h3.lister-item-header").find("a").text();
const getPeopleElement = ($, content) =>
  $(content).find("p:not(.text-muted .sort-num_votes-visible)");
const getDirectors = ($, people) =>
  $(people)
    .find("span.ghost")
    .prevAll("a")
    .map((idx, $director) => $($director).text())
    .get();
const getStars = ($, people) =>
  $(people)
    .find("span.ghost")
    .nextAll("a")
    .map((idx, $star) => $($star).text())
    .get();

const movieParser = (html) => {
  const $ = cheerio.load(html);
  const movies = [];
  $("div.lister-item.mode-advanced").each((idx, $el) => {
    const content = getContentElement($, $el);
    const title = getTitle($, content);
    const people = getPeopleElement($, content);
    const directors = getDirectors($, people);
    const stars = getStars($, people);
    movies.push({
      title,
      searchTerms: getUncommonWords(title),
      directors,
      stars,
    });
  });
  return movies;
};

const nextPage = (html) => {
  const $ = cheerio.load(html);
  return $("#main").find("a.lister-page-next.next-page")?.attr("href") || null;
};

module.exports = {
  movieParser,
  nextPage,
};
