const router = require("express").Router();
const db = require("../src/db");

//create a book
router.post("/book", function (req, res) {
  let book_title = req.body.book_title;
  let book_description = req.body.book_description;
  let book_author = req.body.book_author;

  if (!book_title || !book_description || !book_author)
    return res.status(400).send({
      error: true,
      message: "Please provide book title, description and author",
    });

  db.query(
    "INSERT INTO books (book_title, book_description, book_author) VALUES (?,?,?)",
    [book_title, book_description, book_author],
    function (error, results, fields) {
      if (error) {
        return res.send({ status: 500, error: error.sqlMessage, data: null });
      } else {
        return res.send({
          error: false,
          data: results,
          message: "New book has been created successfully.",
        });
      }
    }
  );
});

//get all books

router.get("/books", async function (req, res) {
  await db.query("SELECT * FROM books", function (error, results, fields) {
    if (error) {
      return res.send({ status: 500, error: error.sqlMessage, data: null });
    } else {
      let message = "";
      if (results === undefined || results.length === 0)
        message = "No books were found";
      else message = "Books successfully retrieved";

      return res.send({ error: false, data: results, message: message });
    }
  });
});

//get a book by id

router.get("/book/:id", async function (req, res) {
  const { id } = req.params;

  await db.query("SELECT * FROM books WHERE book_id = ?", [id], function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.send({ status: 500, error: error.sqlMessage, data: null });
    } else {
      Object.keys(results).forEach(function (key) {
        var row = results[key];
        console.log(row.book_title);
      });

      let message = "";
      if (results === undefined || results.length === 0)
        message = `Book with id ${id} was not found`;
      else message = `Successfully retrieved book with id ${id}`;

      return res.send({
        error: false,
        data: results,
        message: message,
      });
    }
  });
});

//update book details

router.put("/book/:id", async function (req, res) {
  const { id } = req.params;

  let book_title = req.body.book_title;
  let book_description = req.body.book_description;
  let book_author = req.body.book_author;

  if (!book_title || !book_description || !book_author)
    res.status(400).send({
      error: true,
      message: "Please provide book title, description and author",
    });

  await db.query(
    "UPDATE books SET book_title = ?, book_description = ?, book_author = ? WHERE book_id = ?",
    [book_title, book_description, book_author, id],
    function (error, results, fields) {
      if (error) {
        return res.send({ status: 500, error: error.sqlMessage, data: null });
      } else {
        let message = "";
        if (results.changedRows === 0)
          message = `Book with id ${id} not found or data is the same`;
        else message = `Book with id ${id} was successfully updated.`;

        return res.send({
          error: false,
          data: results,
          message: message,
        });
      }
    }
  );
});

//delete a book

router.delete("/book/:id", async function (req, res) {
  let { id } = req.params;

  db.query("DELETE FROM books where book_id = ?", [id], function (
    error,
    results,
    fields
  ) {
    if (error) {
      return res.send({ status: 500, error: error.sqlMessage, data: null });
    } else {
      let message = "";
      if (results.affectedRows === 0)
        message = `Book with id ${id} was not found.`;
      else message = `Book with id ${id} was succeffully deleted.`;

      return res.send({ error: false, data: results, message: message });
    }
  });
});

module.exports = router;
