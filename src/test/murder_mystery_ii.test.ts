import fs from "fs";
import path from "path";

import initSqlJs from "sql.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Murder Mystery II", () => {
  let db: initSqlJs.Database;

  beforeAll(async () => {
    const SQL = await initSqlJs();
    // Load the murder mystery database
    const dbPath = path.join(__dirname, "../../public/murder_mystery.db");
    const filebuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(filebuffer);
  });

  afterAll(() => {
    if (db) {
      db.close();
    }
  });

  it("should find the murderer Derek Johnson", () => {
    // Query based on witness descriptions: black hair, 68 inches tall, drives a Dodge Charger, checked in the night of the murder
    const result = db.exec(`
      SELECT p.name
      FROM person p
      JOIN drivers_license dl ON p.license_id = dl.id
      JOIN get_fit_now_member gfnm ON p.id = gfnm.person_id
      JOIN get_fit_now_check_in gfnci ON gfnm.id = gfnci.membership_id
      WHERE dl.hair_color = 'black'
        AND dl.height = 68
        AND dl.car_make = 'Dodge'
        AND dl.car_model = 'Charger'
        AND gfnci.check_in_date = 20180114
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Derek Johnson");
  });

  it("should find the mastermind Victoria Stone", () => {
    // Query based on Derek Johnson's interview clues: Elm Street resident, attended Business Networking Mixer, drives a BMW
    const result = db.exec(`
      SELECT p.name
      FROM person p
      JOIN drivers_license dl ON p.license_id = dl.id
      JOIN facebook_event_checkin fec ON p.id = fec.person_id
      JOIN income inc ON p.ssn = inc.ssn
      WHERE p.address_street_name = 'Elm Street'
        AND fec.event_name = 'Business Networking Mixer'
        AND dl.car_make = 'BMW'
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Victoria Stone");
  });
});
