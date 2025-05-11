import { useRef } from "react";
import SchemaEdge from "@/components/schema-edge";
import TableNode from "@/components/table-node";
import { Background, BackgroundVariant, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState } from "@xyflow/react";
import type { Edge, Node } from "@xyflow/react";

import "@xyflow/react/dist/base.css";

interface SchemaVisualizerProps {
  initialNodes: Node[];
  initialEdges: Edge[];
}

export function SchemaVisualizer({ initialNodes, initialEdges }: SchemaVisualizerProps) {
  return (
    <div className="flex h-[36rem] flex-col">
      <ReactFlowProvider>
        <SchemaVisualizerInner initialNodes={initialNodes} initialEdges={initialEdges} />
      </ReactFlowProvider>
    </div>
  );
}

function SchemaVisualizerInner({ initialNodes, initialEdges }: SchemaVisualizerProps) {
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, _setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const edgeTypes = {
    custom: SchemaEdge,
  };

  const nodeTypes = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tableNode: (props: any) => <TableNode {...props} initialEdges={initialEdges} />,
  };

  return (
    <div className="flex flex-1 items-stretch">
      <div className="w-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          minZoom={0.5}
          maxZoom={0.85}
          defaultEdgeOptions={{ type: "custom" }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={2} />
        </ReactFlow>
      </div>
    </div>
  );
}
