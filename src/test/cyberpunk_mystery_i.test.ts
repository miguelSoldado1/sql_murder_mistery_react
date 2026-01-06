import fs from "fs";
import path from "path";

import initSqlJs from "sql.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Cyberpunk Mystery I", () => {
  let db: initSqlJs.Database;

  beforeAll(async () => {
    const SQL = await initSqlJs();
    const fileBuffer = fs.readFileSync(path.join(__dirname, "../../public/cyberpunk_mystery.db"));
    db = new SQL.Database(fileBuffer);
  });

  afterAll(() => {
    if (db) {
      db.close();
    }
  });

  it("should find the hacker Jax Nova using incident report clues", () => {
    // Query based on incident report: hacker with 5 neural implants, Neural Deck, >3 anomalies, in Sector 7 on 21470220
    const result = db.exec(`
      SELECT p.name
      FROM person p
      JOIN neural_implant ni ON p.id = ni.person_id
      JOIN device d ON p.id = d.person_id
      JOIN digital_log dl ON d.id = dl.device_id
      JOIN location_log ll ON p.id = ll.person_id
      WHERE d.device_type = 'Neural Deck'
      AND dl.anomaly_count > 3
      AND ll.sector = 'Sector 7'
      AND ll.timestamp = 21470220
      GROUP BY p.id, p.name
      HAVING COUNT(ni.id) = 5
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Jax Nova");
  });

  it("should find the insider Lira Kane from payment and implant clues", () => {
    const result = db.exec(`
      SELECT p.name
      FROM person p
      INNER JOIN crypto_transaction ct ON ct.person_id = p.id
      INNER JOIN neural_implant ni ON ni.person_id = p.id
      WHERE ct.amount = '30000'
        AND ct.crypto_type = 'CryptoByte'
        AND ni.cyberware_type = 'Access Implant'
    `);
    expect(result).toHaveLength(1);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Lira Kane");
  });

  it("should find the insider Lira Kane using interrogation clues", () => {
    // Query based on Jax's interrogation: insider who paid 30000 CryptoByte, used Access Implant, spotted in Sector 7
    const result = db.exec(`
      SELECT p.name
      FROM person p
      JOIN neural_implant ni ON p.id = ni.person_id
      JOIN crypto_transaction ct ON p.id = ct.person_id
      JOIN location_log ll ON p.id = ll.person_id
      WHERE ni.cyberware_type = 'Access Implant'
      AND ct.amount = 30000
      AND ct.crypto_type = 'CryptoByte'
      AND ll.sector = 'Sector 7'
      AND ll.timestamp = 21470220
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Lira Kane");
  });

  it("should find the mastermind Dr. Vex using interrogation clues", () => {
    // Query based on Lira's interrogation: boss with 4 neural implants, paid hacker 50000 NeoCoin, operating from Corporate on 21470220
    const result = db.exec(`
      SELECT p.name
      FROM person p
      JOIN neural_implant ni ON p.id = ni.person_id
      JOIN crypto_transaction ct ON p.id = ct.person_id
      JOIN location_log ll ON p.id = ll.person_id
      WHERE ct.amount = 50000
      AND ct.crypto_type = 'NeoCoin'
      AND ll.sector = 'Corporate'
      AND ll.timestamp = 21470220
      GROUP BY p.id, p.name
      HAVING COUNT(ni.id) = 4
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Dr. Vex");
  });
});
