import type { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "incident_report",
    type: "tableNode",
    position: { x: -760, y: 20 },
    data: {
      label: "incident_report",
      fields: [
        { name: "date", type: "integer" },
        { name: "type", type: "text" },
        { name: "description", type: "text" },
        { name: "module", type: "text" },
      ],
    },
  },
  {
    id: "interrogation_log",
    type: "tableNode",
    position: { x: 260, y: 260 },
    data: {
      label: "interrogation_log",
      fields: [
        { name: "id", type: "integer", isPrimary: true },
        { name: "person_id", type: "integer", isForeign: true, handlePosition: "left" },
        { name: "transcript", type: "text" },
      ],
    },
  },
  {
    id: "personnel",
    type: "tableNode",
    position: { x: -120, y: 260 },
    data: {
      label: "personnel",
      fields: [
        { name: "id", type: "integer", isPrimary: true, handlePosition: "right" },
        { name: "name", type: "text" },
        { name: "role", type: "text" },
        { name: "module", type: "text" },
      ],
    },
  },
  {
    id: "access_log",
    type: "tableNode",
    position: { x: 260, y: 20 },
    data: {
      label: "access_log",
      fields: [
        { name: "person_id", type: "integer", isForeign: true, handlePosition: "left" },
        { name: "module", type: "text" },
        { name: "timestamp", type: "integer" },
        { name: "action", type: "text" },
      ],
    },
  },
  {
    id: "shipment",
    type: "tableNode",
    position: { x: -760, y: 520 },
    data: {
      label: "shipment",
      fields: [
        { name: "id", type: "integer", isPrimary: true, handlePosition: "right" },
        { name: "intake_time", type: "integer" },
        { name: "bay", type: "text" },
        { name: "reference", type: "text" },
      ],
    },
  },
  {
    id: "cargo_item",
    type: "tableNode",
    position: { x: -420, y: 520 },
    data: {
      label: "cargo_item",
      fields: [
        { name: "id", type: "integer", isPrimary: true },
        { name: "shipment_id", type: "integer", isForeign: true, handlePosition: "left" },
        { name: "label", type: "text" },
        { name: "item_type", type: "text" },
        { name: "quantity", type: "integer" },
      ],
    },
  },
  {
    id: "work_order",
    type: "tableNode",
    position: { x: 260, y: 520 },
    data: {
      label: "work_order",
      fields: [
        { name: "id", type: "integer", isPrimary: true },
        { name: "person_id", type: "integer", isForeign: true, handlePosition: "left" },
        { name: "module", type: "text" },
        { name: "work_type", type: "text" },
        { name: "date", type: "integer" },
        { name: "shipment_id", type: "integer", isForeign: true, handlePosition: "left" },
      ],
    },
  },
  {
    id: "override_approval",
    type: "tableNode",
    position: { x: 640, y: 520 },
    data: {
      label: "override_approval",
      fields: [
        { name: "id", type: "integer", isPrimary: true },
        { name: "approver_id", type: "integer", isForeign: true, handlePosition: "left" },
        { name: "module", type: "text" },
        { name: "override_type", type: "text" },
        { name: "date", type: "integer" },
      ],
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "personnel-interrogation_log",
    source: "personnel",
    target: "interrogation_log",
    sourceHandle: "id",
    targetHandle: "person_id",
  },
  {
    id: "personnel-access_log",
    source: "personnel",
    target: "access_log",
    sourceHandle: "id",
    targetHandle: "person_id",
  },
  {
    id: "shipment-cargo_item",
    source: "shipment",
    target: "cargo_item",
    sourceHandle: "id",
    targetHandle: "shipment_id",
  },
  {
    id: "personnel-work_order",
    source: "personnel",
    target: "work_order",
    sourceHandle: "id",
    targetHandle: "person_id",
  },
  {
    id: "shipment-work_order",
    source: "shipment",
    target: "work_order",
    sourceHandle: "id",
    targetHandle: "shipment_id",
  },
  {
    id: "personnel-override_approval",
    source: "personnel",
    target: "override_approval",
    sourceHandle: "id",
    targetHandle: "approver_id",
  },
];
