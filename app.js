const express = require("express");
const app = express();

// app.get
// app.get

app.all("/*", (req, res) => {
	res.status(404).send({ msg: "not found" });
});

// app.use errors ...

module.exports = app;
