import React from "react";
import SchemaBuilder from "./components/SchemaBuilder";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-center text-3xl font-bold py-6">JSON Schema Builder</h1>
      <SchemaBuilder />
    </div>
  );
}

export default App;
