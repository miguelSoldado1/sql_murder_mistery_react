import { memo } from "react";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import type { Edge, Node, NodeProps } from "@xyflow/react";

export interface TableField {
  name: string;
  type: string;
  isPrimary?: boolean;
  isForeign?: boolean;
  handlePosition?: "left" | "right";
}

interface TableNodeData extends Record<string, unknown> {
  label: string;
  fields: TableField[];
  selected?: boolean;
}

type TableNodeType = Node<TableNodeData, "tableNode">;

interface TableNodeProps extends NodeProps<TableNodeType> {
  initialEdges: Edge[];
}

function TableNodeComponent({ data, id, initialEdges }: TableNodeProps) {
  // Find all source connections for this node
  const sourceConnections = initialEdges.filter((edge) => edge.source === id).map((edge) => edge.sourceHandle);

  // Find all target connections for this node
  const targetConnections = initialEdges.filter((edge) => edge.target === id).map((edge) => edge.targetHandle);

  return (
    <div
      className={cn(
        "w-66 rounded-xl bg-card font-mono shadow-[0_1px_1px_rgba(0,0,0,0.02),_0_2px_2px_rgba(0,0,0,0.02),_0_4px_4px_rgba(0,0,0,0.02),_0_8px_8px_rgba(0,0,0,0.02),_0_16px_16px_rgba(0,0,0,0.02),_0_32px_32px_rgba(0,0,0,0.02)]",
        data.selected ? "ring-2 ring-primary ring-offset-2" : ""
      )}
    >
      <div className="flex items-center justify-between border-b border-border/80 bg-gradient-to-t from-background/70 px-4 py-3 dark:from-background/30">
        <div className="text-[13px]">
          <span className="font-medium">{data.label}</span>
        </div>
      </div>
      <div className="py-2 text-xs">
        {data.fields.map((field: TableField) => (
          <div key={field.name} className="group relative px-4">
            <div className="group-not-last:border-b flex items-center justify-between gap-2 border-dashed py-2">
              <span className="truncate font-medium">{field.name}</span>
              <span className="text-muted-foreground/60">{field.type}</span>

              {/* Field handles */}
              {((field.isPrimary && sourceConnections.includes(field.name)) ||
                (field.isForeign && targetConnections.includes(field.name))) && (
                <Handle
                  type={field.isPrimary ? "source" : "target"}
                  position={
                    (field.handlePosition ?? (field.isPrimary ? "left" : "right")) === "left"
                      ? Position.Left
                      : Position.Right
                  }
                  id={field.name}
                  className="size-2.5 rounded-full border-2 border-background"
                  isConnectable={false}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const TableNode = memo(TableNodeComponent);
