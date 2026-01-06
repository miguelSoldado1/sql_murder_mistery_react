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

  it("should list the gym witness from the camera description", () => {
    // Camera witness: gym member, brown hair, 70 inches tall, drives a Honda Civic
    const result = db.exec(`
      SELECT p.name
      FROM person p
      INNER JOIN drivers_license dl ON dl.id = p.license_id
      INNER JOIN get_fit_now_member gfn ON gfn.person_id = p.id
      WHERE dl.hair_color = 'brown'
        AND dl.height = 70
        AND dl.car_make = 'Honda'
        AND dl.car_model = 'Civic'
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Marcus Williams");
  });

  it("should list the license-plate witness from the camera description", () => {
    // Camera witness: license plate WHT789
    const result = db.exec(`
      SELECT p.name
      FROM person p
      INNER JOIN drivers_license dl ON dl.id = p.license_id
      WHERE dl.plate_number = 'WHT789'
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Sophie Chen");
  });

  it("should find the murderer Derek Johnson", () => {
    // Query based on witness descriptions: black hair, 68 inches tall, drives a Dodge Charger
    const result = db.exec(`
      SELECT p.name
      FROM person p
      INNER JOIN drivers_license dl ON dl.id = p.license_id
      WHERE dl.height = 68
        AND dl.hair_color = 'black'
        AND dl.car_model = 'Charger'
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Derek Johnson");
  });

  it("should find the mastermind Victoria Stone", () => {
    // Query based on Derek Johnson's interview clues: Elm Street resident, attended Business Networking Mixer, drives a BMW
    const result = db.exec(`
      SELECT p.name
      FROM person p
      INNER JOIN drivers_license dl ON dl.id = p.license_id
      INNER JOIN facebook_event_checkin ci ON ci.person_id = p.id
      WHERE dl.car_make = 'BMW'
        AND p.address_street_name = 'Elm Street'
        AND ci.event_name = 'Business Networking Mixer'
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Victoria Stone");
  });
});
