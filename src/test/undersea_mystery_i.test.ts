import fs from "fs";
import path from "path";

import initSqlJs from "sql.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Undersea Mystery I", () => {
  let db: initSqlJs.Database;

  beforeAll(async () => {
    const SQL = await initSqlJs();
    const fileBuffer = fs.readFileSync(path.join(__dirname, "../../public/undersea_mystery.db"));
    db = new SQL.Database(fileBuffer);
  });

  afterAll(() => {
    if (db) {
      db.close();
    }
  });

  it("description narrows to one incident for Undersea Mystery I", () => {
    const res = db.exec(`
      SELECT * FROM incident_report
      WHERE date = 20910718 AND description LIKE '%Type-K coolant crate%'
    `);
    expect(res[0].values).toHaveLength(1);
  });

  it("should find the onsite actor Mira Alcott using intake and access clues", () => {
    // Clues: Type-K coolant crate logged during 05:00–06:00 intake window in Intake Bay A;
    // the label swapper was a Cargo Handler assigned to Intake Bay A who swiped in during the window.
    const result = db.exec(`
      SELECT p.name
      FROM shipment s
      JOIN cargo_item ci ON s.id = ci.shipment_id
      JOIN access_log al ON al.module = s.bay
      JOIN personnel p ON p.id = al.person_id
      WHERE ci.label = 'Type-K coolant crate'
        AND s.bay = 'Intake Bay A'
        AND s.intake_time BETWEEN 209107180500 AND 209107180600
        AND al.timestamp BETWEEN 209107180500 AND 209107180600
        AND p.role = 'Cargo Handler'
        AND p.module = 'Intake Bay A'
      GROUP BY p.id, p.name
    `);

    expect(result).toHaveLength(1);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Mira Alcott");
  });

  it("should find the handler Jonas Pike using manifest edit clues", () => {
    // Clues (Mira's transcript): Logistics Tech in Module C-1 who filed a manifest edit for shipment 7002.
    const result = db.exec(`
      SELECT p.name
      FROM work_order wo
      JOIN personnel p ON p.id = wo.person_id
      WHERE wo.work_type = 'manifest edit'
        AND wo.shipment_id = 7002
        AND p.role = 'Logistics Tech'
        AND p.module = 'Module C-1'
      GROUP BY p.id, p.name
    `);

    expect(result).toHaveLength(1);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Jonas Pike");
  });

  it("should find the mastermind Dr. Selene Ward using override clues", () => {
    // Clues (Jonas's transcript): Senior Engineer who approved two expedite overrides for Intake Bay A that week.
    const result = db.exec(`
      SELECT p.name
      FROM override_approval oa
      JOIN personnel p ON p.id = oa.approver_id
      WHERE oa.module = 'Intake Bay A'
        AND oa.override_type = 'expedite'
        AND oa.date BETWEEN 20910715 AND 20910721
        AND p.role = 'Senior Engineer'
      GROUP BY p.id, p.name
      HAVING COUNT(oa.id) = 2
    `);

    expect(result).toHaveLength(1);
    expect(result[0].values).toHaveLength(1);
    expect(result[0].values[0][0]).toBe("Dr. Selene Ward");
  });
});
