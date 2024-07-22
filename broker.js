const aedes = require("aedes");
const net = require("net");

const broker = aedes.Server();

broker.addListener("clientReady", (client) => {
  console.log(`New client id: ${client.id}`);
});

broker.addListener("clientDisconnect", (client) => {
  console.log(`Client id: ${client.id} disconnected`);
});

broker.addListener("subscribe", (subscriptions, client) => {
  const topics = subscriptions.map(({ topic }) => topic).join(",");
  console.log(`Client id: ${client.id} subscribed to topics: ${topics}`);
});

const brokerServer = net.createServer(broker.handle);

brokerServer.listen(7777);
