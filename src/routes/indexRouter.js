const express = require("express");
const path = require("path");
const { existsSync } = require("fs");

const { createData } = require("../utils/createData");
const { queryHashTable, querySearchTerms } = require("../utils/queryData");

const router = express.Router();

router.get("/", (req, res) => res.send());

router.get("/data-scrape", async (req, res) => {
  const hashTablePath = path.join(global.APP_ROOT, "data/hashTable.json");
  try {
    if (existsSync(hashTablePath)) {
      res.send("Scrape already parsed.");
    } else {
      await createData();
      res.send("Scrape successful!");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

router.get("/search-hash", (req, res) => {
  const hashTablePath = path.join(global.APP_ROOT, "data/hashTable.json");
  if (!existsSync(hashTablePath)) {
    res
      .status(400)
      .send(
        "Please run scraper before searching for movies. (/imdb-scraper/data-scrape)"
      );
  }
  const {
    query: { term },
  } = req;
  const response = queryHashTable(term, hashTablePath);
  res.send(response);
});

router.get("/search", (req, res) => {
  const searchTermsPath = path.join(global.APP_ROOT, "data/searchTerms.json");
  if (!existsSync(searchTermsPath)) {
    res
      .status(400)
      .send(
        "Please run scraper before searching for movies. (url: /imdb-scraper/data-scrape)"
      );
  }
  const {
    query: { term },
  } = req;
  const response = querySearchTerms(term, searchTermsPath);
  res.send(response);
});

module.exports = {
  indexRouter: router,
};
