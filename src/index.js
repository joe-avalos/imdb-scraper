const { app } = require("./app");

const NODE_PORT = process.env.NODE_PORT || "3420";

app.listen(NODE_PORT, () => console.log(`Listening on port: ${NODE_PORT}`));
