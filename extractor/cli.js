import * as l from "lodash";
import { MongoClient } from "mongodb";
import { writeFile } from "node:fs/promises";

import { COUNTRY_MAP } from "./country_map.js";

const _ = l.default;

const client = new MongoClient("mongodb://localhost:27017");

await client.connect();

const STEP = 10;

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

  const countries = _.mapValues(
    _.groupBy(
      result
        .map((item) => item.movie.at(0)?.countries.map((c) => c.name))
        .flat()
        .map((c) => COUNTRY_MAP.get(c))
        .flat()
        .filter(Boolean)
    ),
    (list) => list.length
  );

  finalData[year.toString()] = countries;
}

await client.close();

await writeFile("data/unfiltered.json", JSON.stringify(finalData, null, 2));
