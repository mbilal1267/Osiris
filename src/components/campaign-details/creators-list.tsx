"use client";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export interface Creator {
  id: number;
  name: string;
  type: "Micro" | "Macro" | "Nano";
  views: number;
}

interface CreatorsListProps {
  creators: Creator[];
  onAddMore: () => void;
}

export function CreatorsList({ creators, onAddMore }: CreatorsListProps) {
  const getTypeColor = (type: Creator["type"]) => {
    switch (type) {
      case "Macro":
        return "bg-purple-100 text-purple-700";
      case "Micro":
        return "bg-blue-100 text-blue-700";
      case "Nano":
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-900">Creators</h2>

      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                Views
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {creators.map((creator) => (
              <tr
                key={creator.id}
                className="transition-colors hover:bg-slate-50 cursor-pointer"
              >
                <td className="px-4 py-3 text-sm text-slate-600">
                  {creator.id}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-900">
                  {creator.name}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getTypeColor(
                      creator.type
                    )}`}
                  >
                    {creator.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-900">
                  {creator.views.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        onClick={onAddMore}
        className="mt-4 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus className="mr-2 size-4" />
        Add More
      </Button>
    </div>
  );
}
