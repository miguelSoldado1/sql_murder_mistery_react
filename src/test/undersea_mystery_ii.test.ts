import fs from "fs";
import path from "path";

import initSqlJs from "sql.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Undersea Mystery II", () => {
  let db: initSqlJs.Database;

  beforeAll(async () => {
    const SQL = await initSqlJs();
    const fileBuffer = fs.readFileSync(path.join(__dirname, "../../public/database/undersea_mystery.db"));
    db = new SQL.Database(fileBuffer);
  });

  afterAll(() => {
    if (db) {
      db.close();
    }
  });

  it("step 1: should find exactly one incident report for the sabotage", () => {
    const res = db.exec(`
      SELECT * FROM incident_report
      WHERE date = 20910825 AND type = 'sabotage' AND module = 'Module D-7'
    `);
    expect(res[0].values).toHaveLength(1);
  });

  it("step 2: should find exactly one first witness (Maintenance Tech with highest access count)", () => {
    // First witness: Maintenance Tech in Module D-7 who had the highest number of accesses between 03:00 and 04:00
    const result = db.exec(`
      SELECT p.name
      FROM person p
      JOIN access_log al ON al.person_id = p.id
      WHERE p.role = 'Maintenance Tech'
        AND p.module = 'Module D-7'
        AND al.date = 20910825
        AND al.timestamp BETWEEN 300 AND 400
        AND al.module = 'Module D-7'
      GROUP BY p.id, p.name
      ORDER BY COUNT(al.id) DESC
      LIMIT 1
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Kira Voss");
  });

  it("step 3: should find exactly one second witness (Systems Engineer with 2 diagnostic reports)", () => {
    // Second witness: Systems Engineer in Module E-2 who filed exactly 2 diagnostic reports for Module D-7 on August 25
    const result = db.exec(`
      SELECT p.name
      FROM person p
      JOIN work_order wo ON wo.person_id = p.id
      WHERE p.role = 'Systems Engineer'
        AND p.module = 'Module E-2'
        AND wo.work_type = 'diagnostic'
        AND wo.module = 'Module D-7'
        AND wo.date = 20910825
      GROUP BY p.id, p.name
      HAVING COUNT(wo.id) = 2
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Ren Nakamura");
  });

  it("step 4: should retrieve interviews from both witnesses", () => {
    const result = db.exec(`
      SELECT * FROM interrogation_log
      WHERE person_id IN (2333, 2322)
    `);
    expect(result[0].values).toHaveLength(2);
  });

  it("step 5: should find exactly one perpetrator based on witness clues", () => {
    // Complex query combining clues from both witnesses:
    // - Senior Tech role
    // - Accessed Security Hub on Aug 24 at 22:00
    // - Exactly 4 override approvals for safety systems in Module D-7 during Aug 20-26
    // - Exactly 3 equipment requisition work orders for Module D-7 during Aug 20-26
    const result = db.exec(`
      SELECT p.name
      FROM person p
      JOIN access_log al ON al.person_id = p.id
      JOIN override_approval oa ON oa.person_id = p.id
      JOIN work_order wo ON wo.person_id = p.id
      WHERE p.role = 'Senior Tech'
        AND al.module = 'Security Hub'
        AND al.date = 20910824
        AND al.timestamp = 2200
        AND oa.module = 'Module D-7'
        AND oa.override_type = 'safety'
        AND oa.date BETWEEN 20910820 AND 20910826
        AND wo.module = 'Module D-7'
        AND wo.work_type = 'equipment requisition'
        AND wo.date BETWEEN 20910820 AND 20910826
      GROUP BY p.id, p.name
      HAVING COUNT(DISTINCT oa.id) = 4 AND COUNT(DISTINCT wo.id) = 3
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Felix Crane");
  });

  it("step 6: should find exactly one mastermind based on perpetrator's confession", () => {
    // Complex query based on Felix Crane's clues:
    // - Station Director role
    // - Exactly 5 critical system overrides for Module D-7 between Aug 15-25
    // - Exactly 2 emergency protocol work orders for Command Center during Aug 15-25
    const result = db.exec(`
      SELECT p.name
      FROM person p
      JOIN override_approval oa ON oa.person_id = p.id
      JOIN work_order wo ON wo.person_id = p.id
      WHERE p.role = 'Station Director'
        AND oa.module = 'Module D-7'
        AND oa.override_type = 'critical'
        AND oa.date BETWEEN 20910815 AND 20910825
        AND wo.module = 'Command Center'
        AND wo.work_type = 'emergency protocol'
        AND wo.date BETWEEN 20910815 AND 20910825
      GROUP BY p.id, p.name
      HAVING COUNT(DISTINCT oa.id) = 5 AND COUNT(DISTINCT wo.id) = 2
    `);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Dr. Iris Kane");
  });
});
