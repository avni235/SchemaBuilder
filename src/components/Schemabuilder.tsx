import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FieldType = "string" | "number" | "boolean" | "null" | "object" | "array" | "nested";


interface Field {
  id: string;
  name: string;
  type: FieldType;
  children?: Field[];
}

const defaultField = (): Field => ({
  id: crypto.randomUUID(),
  name: "",
  type: "string",
});

const SchemaBuilder = ({ fields, setFields }: { fields: Field[], setFields: (f: Field[]) => void }) => {

  const handleChange = (id: string, key: keyof Field, value: string) => {
    const updateFields = (f: Field[]): Field[] =>
      f.map(field =>
        field.id === id
          ? { ...field, [key]: value }
          : field.type === "nested"
          ? { ...field, children: updateFields(field.children || []) }
          : field
      );
    setFields(updateFields(fields));
  };

  const handleAddField = (parentId?: string) => {
    const newField = defaultField();
    const updateFields = (f: Field[]): Field[] =>
      f.map(field => {
        if (field.id === parentId && field.type === "nested") {
          return {
            ...field,
            children: [...(field.children || []), newField],
          };
        } else if (field.type === "nested") {
          return { ...field, children: updateFields(field.children || []) };
        }
        return field;
      });

    setFields(parentId ? updateFields(fields) : [...fields, newField]);
  };

  const handleDelete = (id: string) => {
    const deleteRecursive = (f: Field[]): Field[] =>
      f
        .filter(field => field.id !== id)
        .map(field =>
          field.type === "nested"
            ? { ...field, children: deleteRecursive(field.children || []) }
            : field
        );
    setFields(deleteRecursive(fields));
  };

  const renderFields = (fields: Field[], _parentId?: string) =>
  fields.map(field => (
    <div
      key={field.id}
      className="ml-4 pl-4 border-l-2 border-gray-700 space-y-2 mb-4"
    >
      <div className="bg-[#0d0d0d] rounded-xl p-4 shadow-md flex flex-wrap gap-4 items-center">
        <Input
          className="bg-[#242323] text-white border-gray-600 placeholder-gray-400"
          value={field.name}
          onChange={e => handleChange(field.id, "name", e.target.value)}
          placeholder="Field name"
        />
        <Select
          onValueChange={(value: FieldType) =>
            handleChange(field.id, "type", value)
          }
          value={field.type}
        >
          <SelectTrigger className="w-[140px] bg-[#2c2c2c] border-gray-600 text-white">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-[#2c2c2c] text-white border border-gray-600">
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="boolean">Boolean</SelectItem>
            <SelectItem value="null">Null</SelectItem>
            <SelectItem value="object">Object</SelectItem>
            <SelectItem value="array">Array</SelectItem>
            <SelectItem value="nested">Nested</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          className="text-red-400 hover:text-red-300"
          onClick={() => handleDelete(field.id)}
        >
          Delete
        </Button>
        {field.type === "nested" && (
          <Button
            className="bg-[#333] text-white hover:bg-[#444]"
            onClick={() => handleAddField(field.id)}
          >
            + Nested
          </Button>
        )}
      </div>
      {field.type === "nested" && field.children && renderFields(field.children, field.id)}
    </div>
  ));


  return (
  <div className="p-6 bg-[#1a1c1f] text-white">
    <div className="space-y-4">
      {renderFields(fields)}
      <div className="text-center">
        <Button
          className="bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
          onClick={() => handleAddField()}
        >
          + Add Field
        </Button>
      </div>
    </div>
  </div>
);

};

export default SchemaBuilder;
