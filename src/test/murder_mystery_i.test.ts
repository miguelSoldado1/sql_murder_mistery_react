import fs from "fs";
import path from "path";

import initSqlJs from "sql.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Murder Mystery I", () => {
  let db: initSqlJs.Database;

  beforeAll(async () => {
    const SQL = await initSqlJs();
    // Load the murder mystery database
    const dbPath = path.join(__dirname, "../../public/database/murder_mystery.db");
    const filebuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(filebuffer);
  });

  afterAll(() => {
    if (db) {
      db.close();
    }
  });

  it("step 1: should find exactly one crime scene report for the murder", () => {
    const res = db.exec(`
      SELECT * FROM crime_scene_report
      WHERE type = 'murder' AND date = 20180115 AND city = 'SQL City'
    `);
    expect(res[0].values).toHaveLength(1);
  });

  it("step 2: should find exactly one witness named Annabel on Franklin Ave", () => {
    const result = db.exec(`
      SELECT * FROM person
      WHERE name LIKE 'Annabel%' AND address_street_name = 'Franklin Ave'
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0]).toContain("Annabel Miller");
  });

  it("step 3: should find exactly one witness at the last house on Northwestern Dr", () => {
    const result = db.exec(`
      SELECT * FROM person
      WHERE address_street_name = 'Northwestern Dr'
      ORDER BY address_number DESC
      LIMIT 1
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0]).toContain("Morty Schapiro");
  });

  it("step 4: should retrieve interviews from both witnesses", () => {
    const result = db.exec(`
      SELECT * FROM interview
      WHERE person_id IN (16371, 14887)
    `);
    expect(result[0].values).toHaveLength(2);
  });

  it("step 5: should find exactly one murderer based on witness clues", () => {
    // Query based on witness descriptions: Get Fit Now Gym bag with membership starting with "48Z", gold member, plate number including "H42W"
    const result = db.exec(`
      SELECT p.name
      FROM person p
      INNER JOIN get_fit_now_member m ON m.person_id = p.id
      INNER JOIN drivers_license dl ON dl.id = p.license_id
      WHERE m.id LIKE '48Z%'
        AND m.membership_status = 'gold'
        AND dl.plate_number LIKE '%H42W%'
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Jeremy Bowers");
  });

  it("step 6: should find exactly one mastermind behind the murder", () => {
    // Query based on Jeremy Bowers' interview clues: red hair, 65-67 inches tall, drives Tesla Model S, attended SQL Symphony Concert 3 times in Dec 2017
    const result = db.exec(`
      SELECT p.name
      FROM person p
      INNER JOIN drivers_license dl ON dl.id = p.license_id
      INNER JOIN facebook_event_checkin ci ON ci.person_id = p.id
      WHERE dl.height >= 65
        AND dl.height <= 67
        AND dl.hair_color = 'red'
        AND dl.car_model = 'Model S'
        AND ci.event_name = 'SQL Symphony Concert'
      GROUP BY p.id
      HAVING COUNT(ci.event_id) = 3
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Miranda Priestly");
  });
});
