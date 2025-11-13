import type { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "incident_report",
    type: "tableNode",
    position: { x: -100, y: 150 },
    data: {
      label: "incident_report",
      fields: [
        { name: "date", type: "integer" },
        { name: "type", type: "text" },
        { name: "description", type: "text" },
        { name: "sector", type: "text" },
      ],
    },
  },
  {
    id: "interrogation_log",
    type: "tableNode",
    position: { x: 125, y: 175 },
    data: {
      label: "interrogation_log",
      fields: [
        { name: "id", type: "integer", isPrimary: true },
        { name: "person_id", type: "integer", isForeign: true },
        { name: "transcript", type: "text" },
      ],
    },
  },
  {
    id: "digital_log",
    type: "tableNode",
    position: { x: 500, y: 150 },
    data: {
      label: "digital_log",
      fields: [
        { name: "device_id", type: "integer", isForeign: true },
        { name: "login_time", type: "integer" },
        { name: "anomaly_count", type: "integer" },
      ],
    },
  },
  {
    id: "person",
    type: "tableNode",
    position: { x: 645, y: 420 },
    data: {
      label: "person",
      fields: [
        { name: "id", type: "integer", isPrimary: true },
        { name: "name", type: "text" },
        { name: "sector", type: "text" },
        { name: "role", type: "text" },
      ],
    },
  },
  {
    id: "neural_implant",
    type: "tableNode",
    position: { x: 825, y: 150 },
    data: {
      label: "neural_implant",
      fields: [
        { name: "id", type: "integer", isPrimary: true },
        { name: "person_id", type: "integer", isForeign: true },
        { name: "cyberware_type", type: "text" },
        { name: "last_sync", type: "integer" },
      ],
    },
  },
  {
    id: "device",
    type: "tableNode",
    position: { x: 175, y: 500 },
    data: {
      label: "device",
      fields: [
        { name: "id", type: "integer", isPrimary: true },
        { name: "person_id", type: "integer", isForeign: true },
        { name: "device_type", type: "text" },
        { name: "firmware_version", type: "text" },
      ],
    },
  },
  {
    id: "crypto_transaction",
    type: "tableNode",
    position: { x: -100, y: 500 },
    data: {
      label: "crypto_transaction",
      fields: [
        { name: "id", type: "integer", isPrimary: true },
        { name: "person_id", type: "integer", isForeign: true },
        { name: "amount", type: "integer" },
        { name: "timestamp", type: "integer" },
        { name: "crypto_type", type: "text" },
      ],
    },
  },
  {
    id: "location_log",
    type: "tableNode",
    position: { x: 825, y: 575 },
    data: {
      label: "location_log",
      fields: [
        { name: "person_id", type: "integer", isForeign: true },
        { name: "sector", type: "text" },
        { name: "timestamp", type: "integer" },
      ],
    },
  },
];

// Define the edges (relationships) between tables with specific column connections
export const initialEdges: Edge[] = [
  {
    id: "person-interrogation_log",
    source: "person",
    target: "interrogation_log",
    sourceHandle: "id",
    targetHandle: "person_id",
  },
  {
    id: "person-neural_implant",
    source: "person",
    target: "neural_implant",
    sourceHandle: "id",
    targetHandle: "person_id",
  },
  {
    id: "device-digital_log",
    source: "device",
    target: "digital_log",
    sourceHandle: "id",
    targetHandle: "device_id",
  },
  {
    id: "person-device",
    source: "person",
    target: "device",
    sourceHandle: "id",
    targetHandle: "person_id",
  },
  {
    id: "person-crypto_transaction",
    source: "person",
    target: "crypto_transaction",
    sourceHandle: "id",
    targetHandle: "person_id",
  },
  {
    id: "person-location_log",
    source: "person",
    target: "location_log",
    sourceHandle: "id",
    targetHandle: "person_id",
  },
];
