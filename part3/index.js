const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());

morgan.token("body", (request) => JSON.stringify(request.body));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("dist"));

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendick", number: "39-23-6423122" },
];

// getting all persons
app.get("/api/persons", (request, response) => {
  return response.json(persons);
});

// info page
app.get("/info", (request, response) => {
  const now = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people <br>${now}`
  );
});

// get person by id
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// delete person
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const morgan_post = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);
app.post("/api/persons", morgan_post, (request, response, next) => {
  const body = request.body;

  if (!body.name) return response.status(400).json({ error: "name missing" });
  if (!body.number)
    return response.status(400).json({ error: "number missing" });
  if (persons.map((person) => person.name).includes(body.name))
    return response
      .status(400)
      .json({ error: "name is already added to phonebook" });

  const person = {
    id: Math.floor(Math.random() * 5000),
    name: body.name,
    number: body.number,
  };

  persons = [...persons, person];
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
