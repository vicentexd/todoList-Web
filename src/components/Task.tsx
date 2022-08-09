import { CheckCircle, Circle, Trash } from "phosphor-react";
import React from "react";

type Props = {
  id: number;
  description: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onCompleted: (id: number) => void;
};

export function Task({
  completed,
  description,
  onDelete,
  id,
  onCompleted,
}: Props) {
  return (
    <div
      key={id}
      className="flex rounded-lg border border-[#333333] bg-[#262626] items-center p-3 h-16"
    >
      {!completed ? (
        <Circle
          size={24}
          color={"#4EA8DE"}
          style={{ flex: 0.1 }}
          onClick={() => onCompleted(id)}
        />
      ) : (
        <CheckCircle
          size={24}
          color={"#5E60CE"}
          style={{ flex: 0.1 }}
          onClick={() => onCompleted(id)}
        />
      )}

      <p className="flex-1 text-base text-[#F2F2F2]">{description}</p>

      <Trash size={24} color={"#808080"} onClick={() => onDelete(id)} />
    </div>
  );
}
