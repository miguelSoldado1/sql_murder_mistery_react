import type { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "crime_scene_report",
    type: "tableNode",
    position: { x: -100, y: 150 },
    data: {
      label: "crime_scene_report",
      fields: [
        { name: "date", type: "integer" },
        { name: "type", type: "text" },
        { name: "description", type: "text" },
        { name: "city", type: "text" },
      ],
    },
  },
  {
    id: "interview",
    type: "tableNode",
    position: { x: 200, y: 175 },
    data: {
      label: "interview",
      fields: [
        { name: "person_id", type: "integer", isForeign: true },
        { name: "transcript", type: "text" },
      ],
    },
  },
  {
    id: "facebook_event_checkin",
    type: "tableNode",
    position: { x: 500, y: 150 },
    data: {
      label: "facebook_event_checkin",
      fields: [
        { name: "person_id", type: "integer", isForeign: true },
        { name: "event_id", type: "integer" },
        { name: "event_name", type: "text" },
        { name: "date", type: "integer" },
      ],
    },
  },
  {
    id: "get_fit_now_member",
    type: "tableNode",
    position: { x: 175, y: 500 },
    data: {
      label: "get_fit_now_member",
      fields: [
        { name: "id", type: "text", isPrimary: true },
        { name: "person_id", type: "integer", isForeign: true },
        { name: "name", type: "text" },
        { name: "membership_start_date", type: "integer" },
        { name: "membership_status", type: "text" },
      ],
    },
  },
  {
    id: "get_fit_now_check_in",
    type: "tableNode",
    position: { x: -100, y: 500 },
    data: {
      label: "get_fit_now_check_in",
      fields: [
        { name: "membership_id", type: "text", isForeign: true },
        { name: "check_in_date", type: "integer" },
        { name: "check_in_time", type: "integer" },
        { name: "check_out_time", type: "integer" },
      ],
    },
  },
  {
    id: "person",
    type: "tableNode",
    position: { x: 500, y: 450 },
    data: {
      label: "person",
      fields: [
        { name: "id", type: "integer", isPrimary: true },
        { name: "name", type: "text" },
        { name: "license_id", type: "integer", isForeign: true },
        { name: "address_number", type: "integer" },
        { name: "ssn", type: "char", isForeign: true },
      ],
    },
  },
  {
    id: "drivers_license",
    type: "tableNode",
    position: { x: 825, y: 150 },
    data: {
      label: "drivers_license",
      fields: [
        { name: "id", type: "integer", isPrimary: true },
        { name: "age", type: "integer" },
        { name: "height", type: "integer" },
        { name: "eye_color", type: "text" },
        { name: "hair_color", type: "text" },
        { name: "gender", type: "text" },
        { name: "plate_number", type: "text" },
        { name: "car_make", type: "text" },
        { name: "car_model", type: "text" },
      ],
    },
  },
  {
    id: "income",
    type: "tableNode",
    position: { x: 825, y: 575 },
    data: {
      label: "income",
      fields: [
        { name: "ssn", type: "char", isPrimary: true },
        { name: "annual_income", type: "integer" },
      ],
    },
  },
];

// Define the edges (relationships) between tables with specific column connections
export const initialEdges: Edge[] = [
  {
    id: "person-get_fit_now_member",
    source: "person",
    target: "get_fit_now_member",
    sourceHandle: "id",
    targetHandle: "person_id",
  },
  {
    id: "drivers_license-person",
    source: "drivers_license",
    target: "person",
    sourceHandle: "id",
    targetHandle: "license_id",
  },
  {
    id: "income-person",
    source: "income",
    target: "person",
    sourceHandle: "ssn",
    targetHandle: "ssn",
  },
  {
    id: "person-interview",
    source: "person",
    target: "interview",
    sourceHandle: "id",
    targetHandle: "person_id",
  },
  {
    id: "get_fit_now_member-get_fit_now_check_in",
    source: "get_fit_now_member",
    target: "get_fit_now_check_in",
    sourceHandle: "id",
    targetHandle: "membership_id",
  },
  {
    id: "person-facebook_event_checkin",
    source: "person",
    target: "facebook_event_checkin",
    sourceHandle: "id",
    targetHandle: "person_id",
  },
];
