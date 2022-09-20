const mongoose = require("mongoose");

function connectDB(server, port) {
  mongoose
    .connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      server.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
      })
    )
    .catch((err) => console.log(err));
}

module.exports = { connectDB };
