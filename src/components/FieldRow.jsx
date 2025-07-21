import React from "react";

const FieldRow = ({ field, onChange, onDelete, onAdd, level = 0 }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(field.id, { ...field, [name]: value });
  };

  const handleAddChild = () => {
    onAdd(field.id);
  };

  const handleChildChange = (childId, newChild) => {
    const newChildren = field.children.map((child) =>
      child.id === childId ? newChild : child
    );
    onChange(field.id, { ...field, children: newChildren });
  };

  const handleDeleteChild = (childId) => {
    const newChildren = field.children.filter((child) => child.id !== childId);
    onChange(field.id, { ...field, children: newChildren });
  };

  return (
    <div className="ml-4 mt-2">
      <div className="flex items-center gap-2">
        <input
          name="key"
          value={field.key}
          onChange={handleChange}
          placeholder="Field name"
          className="border rounded px-2 py-1 w-40"
        />
        <select
          name="type"
          value={field.type}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        >
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="nested">nested</option>
        </select>
        <div className="w-10 h-5 rounded-full bg-gray-300 flex items-center px-1">
          <div className="w-4 h-4 rounded-full bg-white shadow" />
        </div>
        <button
          className="text-red-500 text-xl"
          onClick={() => onDelete(field.id)}
        >
          X 
        </button>
      </div>

      {field.type === "nested" && (
        <div className="ml-4 mt-2">
          {field.children.map((child) => (
            <FieldRow
              key={child.id}
              field={child}
              onChange={handleChildChange}
              onDelete={handleDeleteChild}
              onAdd={onAdd}
              level={level + 1}
            />
          ))}
          <button
            onClick={handleAddChild}
            className="bg-blue-600 text-white px-4 py-1 rounded mt-2 text-sm"
          >
            + Add Item
          </button>
        </div>
      )}
    </div>
  );
};

export default FieldRow;
