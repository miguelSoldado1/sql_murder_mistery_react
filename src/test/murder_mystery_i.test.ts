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

  it("description narrows to one incident for Murder Mystery I", () => {
    const res = db.exec(`
      SELECT * FROM crime_scene_report
      WHERE type = 'murder' AND date = 20180115 AND city = 'SQL City'
    `);
    expect(res[0].values).toHaveLength(1);
  });

  it("should find the murderer Jeremy Bowers", () => {
    // Query based on witness descriptions: Get Fit Now Gym bag with membership starting with "48Z", gold member, plate number including "H42W"
    const result = db.exec(`
      SELECT p.name
      FROM person p
      INNER JOIN drivers_license dl ON dl.id = p.license_id
      INNER JOIN get_fit_now_member gfnm ON gfnm.person_id = p.id
      WHERE dl.plate_number LIKE '%H42W%'
        AND gfnm.membership_status = 'gold'
        AND gfnm.id LIKE '48Z%'
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Jeremy Bowers");
  });

  it("should find the mastermind Miranda Priestly", () => {
    // Query based on Jeremy Bowers' interview clues: red hair, 65-67 inches tall, drives Tesla Model S, attended SQL Symphony Concert 3 times in Dec 2017
    const result = db.exec(`
      SELECT p.name
      FROM person p
      JOIN drivers_license dl ON p.license_id = dl.id
      JOIN facebook_event_checkin fec ON p.id = fec.person_id
      WHERE dl.hair_color = 'red'
        AND dl.height BETWEEN 65 AND 67
        AND dl.car_make = 'Tesla'
        AND dl.car_model = 'Model S'
        AND fec.event_name = 'SQL Symphony Concert'
        AND fec.date BETWEEN 20171201 AND 20171231
      GROUP BY p.name
      HAVING COUNT(*) = 3
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Miranda Priestly");
  });
});
