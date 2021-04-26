const getUncommonWords = (str) => {
  const common = [
    "the",
    "el",
    "la",
    "del",
    "de",
    "y",
    "los",
    "las",
    "o",
    "que",
    "un",
    "una",
    "en",
    "it",
    "is",
    "we",
    "all",
    "a",
    "lo",
    "an",
    "by",
    "to",
    "you",
    "me",
    "he",
    "she",
    "they",
    "we",
    "how",
    "it",
    "i",
    "are",
    "to",
    "for",
    "of",
    "and",
  ];
  const strArray = str.toLowerCase().split(" ");
  return strArray.filter((word) => !common.includes(word));
};

module.exports = {
  getUncommonWords,
};
