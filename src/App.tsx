import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SchemaBuilder from "./components/Schemabuilder";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type FieldType = "string" | "number" | "boolean" | "null" | "object" | "array" | "nested";

interface Field {
  id: string;
  name: string;
  type: FieldType;
  children?: Field[];
}

function generateJson(fields: Field[]): any {
  const obj: any = {};
  fields.forEach(field => {
    switch (field.type) {
      case "nested":
        obj[field.name] = generateJson(field.children || []);
        break;
      case "string":
        obj[field.name] = "example";
        break;
      case "number":
        obj[field.name] = 123;
        break;
      case "boolean":
        obj[field.name] = true;
        break;
      case "null":
        obj[field.name] = null;
        break;
      case "object":
        obj[field.name] = { key: "value" };
        break;
      case "array":
        obj[field.name] = ["item1", "item2"];
        break;
      default:
        obj[field.name] = "unknown";
    }
  });
  return obj;
}


function SchemaBuilderPage() {
  const defaultField = (): Field => ({
    id: crypto.randomUUID(),
    name: "",
    type: "string",
  });

  const [fields, setFields] = useState<Field[]>([defaultField()]);

  return (
    <div className="relative min-h-screen bg-[#1a1c1f] text-white p-6 overflow-hidden">

      {/* Decorative Random Boxes */}
      <div className="hidden md:block absolute top-10 left-60 w-24 h-24 bg-[#333] rounded-xl opacity-30 blur-xs animate-spin-slow"></div>
      <div className="hidden md:block absolute top-40 right-16 w-20 h-20 bg-[#444] rounded-xl opacity-30 blur-sm animate-bounce animate-spin-slow"></div>
      <div className="hidden md:block absolute bottom-10 right-40 w-28 h-28 bg-[#444] rounded-xl rotate-12 blur-xs opacity-30 animate-spin-slow"></div>
      <div className="hidden md:block absolute bottom-20 left-16 w-20 h-20 bg-[#333] rounded-xl opacity-30 blur-sm animate-bounce animate-spin-slow"></div>


      {/* Custom animation for slow spin */}
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
        `}
      </style>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto z-10">
        <h1 className="text-4xl mt-10 font-bold mb-8 text-center">JSON Schema Builder</h1>
        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="bg-transparent rounded-md p-1 mb-6 w-full flex justify-center gap-4">
            <TabsTrigger
              value="builder"
              className="text-white data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
            >
              Builder
            </TabsTrigger>
            <TabsTrigger
              value="json"
              className="text-white data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
            >
              JSON
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder">
            <SchemaBuilder fields={fields} setFields={setFields} />
          </TabsContent>

          <TabsContent value="json">
            <pre className="bg-[#0d0d0d] text-green-400 p-4 rounded-xl text-sm border border-gray-700 shadow-inner overflow-x-auto">
              {JSON.stringify(generateJson(fields), null, 2)}
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder" element={<SchemaBuilderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
