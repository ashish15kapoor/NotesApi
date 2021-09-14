const Ajv = require("ajv");

const ajv = new Ajv();

const NoteValidateSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    content: { type: "string" },
    priority: { type: "integer", maximum: 3 },
  },
  required: ["content", "priority"],
  additionalProperties: false,
};

module.exports = NoteValidateSchema;
