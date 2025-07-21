export const generateJSON = (fields) => {
  const result = {};
  for (let field of fields) {
    if (!field.key) continue;
    if (field.type === "nested") {
      result[field.key] = generateJSON(field.children || []);
    } else {
      result[field.key] = field.type === "string" ? "STRING" : "number";
    }
  }
  return result;
};
