const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");
app.use(cors());

const Person = require("./models/person");

morgan.token("body", (request) => JSON.stringify(request.body));
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan("tiny"));

// // let persons = [
// //   { id: 1, name: "Arto Hellas", number: "040-123456" },
// //   { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
// //   { id: 3, name: "Dan Abramov", number: "12-43-234345" },
// //   { id: 4, name: "Mary Poppendick", number: "39-23-6423122" },
// // ];

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// getting all persons
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

// info page
app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    const now = new Date();
    response.send(
      `<p>Phonebook has info for ${persons.length} people <br>${now}`
    );
  });
});

// get person by id
app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

// delete person
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const morgan_post = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);
app.post("/api/persons", morgan_post, (request, response, next) => {
  const body = request.body;

  if (!body.name) return response.status(400).json({ error: "name missing" });
  if (!body.number)
    return response.status(400).json({ error: "number missing" });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  // const body = request.body;
  // const person = {
  //   name: body.name,
  //   number: body.number,
  // };
  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
