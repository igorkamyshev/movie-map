import * as l from "lodash";
import { MongoClient } from "mongodb";
import { writeFile } from "node:fs/promises";

import { COUNTRY_MAP } from "./country_map.js";

const _ = l.default;

const client = new MongoClient("mongodb://localhost:27017");

await client.connect();

const STEP = 10;

const awards = new Set();
const finalData = {};

for (const year of _.range(1920, 2030, STEP)) {
  const result = await client
    .db("kinopoisk")
    .collection("movies_award")
    .aggregate([
      {
        $match: { "nomination.award.year": { $gte: year, $lt: year + STEP } },
      },
      {
        $lookup: {
          from: "movies",
          localField: "movieId",
          foreignField: "id",
          as: "movie",
        },
      },
    ])
    .toArray();

  for (const item of result) {
    awards.add(item.nomination.award.title);
  }

  const aggregated = result.map((item) => ({
    countries: item.movie
      .at(0)
      ?.countries.map((c) => COUNTRY_MAP.get(c.name))
      .filter(Boolean)
      .flat(),
    award: item.nomination.award.title,
    win: item.winning,
  }));

  finalData[year] = {};

  for (const { countries, award, win } of aggregated) {
    for (const country of countries) {
      console.log(country);
      if (!finalData[year][country]) {
        finalData[year][country] = {};
      }
      if (!finalData[year][country][award]) {
        finalData[year][country][award] = { win: 0, nomination: 0 };
      }

      if (win) {
        finalData[year][country][award].win++;
      } else {
        finalData[year][country][award].nomination++;
      }
    }
  }
}

await client.close();

await writeFile("data/countries.json", JSON.stringify(finalData, null, 2));
await writeFile(
  "data/awards.json",
  JSON.stringify(Array.from(awards.values()), null, 2)
);
