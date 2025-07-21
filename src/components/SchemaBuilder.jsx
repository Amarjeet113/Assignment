import React, { useState } from "react";
import FieldRow from "./FieldRow";
import { v4 as uuidv4 } from "uuid";
import { generateJSON } from "../utils/generateJSON";

const SchemaBuilder = () => {
  const [fields, setFields] = useState([
    {
      id: uuidv4(),
      key: "name",
      type: "string",
      children: [],
    },
  ]);

  const handleFieldChange = (id, updatedField) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? updatedField : f))
    );
  };

  const handleDeleteField = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleAddField = () => {
    setFields((prev) => [
      ...prev,
      {
        id: uuidv4(),
        key: "",
        type: "string",
        children: [],
      },
    ]);
  };

  const handleAddNestedField = (parentId) => {
    const addNested = (items) =>
      items.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [
              ...(item.children || []),
              {
                id: uuidv4(),
                key: "",
                type: "string",
                children: [],
              },
            ],
          };
        } else if (item.type === "nested") {
          return {
            ...item,
            children: addNested(item.children),
          };
        }
        return item;
      });

    setFields((prev) => addNested(prev));
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        {fields.map((field) => (
          <FieldRow
            key={field.id}
            field={field}
            onChange={handleFieldChange}
            onDelete={handleDeleteField}
            onAdd={handleAddNestedField}
          />
        ))}
        <button
          onClick={handleAddField}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          + Add Item
        </button>
      </div>
      <div className="flex-1 bg-gray-100 p-4 rounded-md h-fit">
        <h2 className="font-semibold mb-2">JSON Preview</h2>
        <pre>{JSON.stringify(generateJSON(fields), null, 2)}</pre>
      </div>
    </div>
  );
};

export default SchemaBuilder;
