const server = require("./server");
const { port } = require("./config");

server.listen(port, () => {
  console.log(`
  --------------------------------------------------
    SERVER IS LISTENING ON http://localhost:${port}
  --------------------------------------------------
  `);
});
