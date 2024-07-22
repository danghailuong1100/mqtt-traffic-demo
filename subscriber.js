const mqtt = require("mqtt");
const { sampleTimes, getRandomInt } = require("./shared");
const client = mqtt.connect("mqtt://localhost:7777");

const timeStampForThisSubscriber =
  sampleTimes[getRandomInt(0, sampleTimes.length - 1)];

const topic = `time/${timeStampForThisSubscriber}`;

client.on("connect", function () {
  client.subscribe(topic, (error) => {
    if (!error) {
      console.log(`Subscribed to topic ${topic}`);
    }
  });
});

client.on("message", function (topicSent, message) {
  if (topicSent === topic) {
    // message is Buffer
    const payload = JSON.parse(message.toString());
    console.log(
      `Received message ${payload.key}, length: ${payload.content.length}`
    );
  }
});

const stdin = process.openStdin();
stdin.on("data", function (chunk) {
  if (chunk.toString().includes("unsubscribe")) {
    client.unsubscribe(topic, (error) => {
      if (!error) {
        console.log("Unsubscribed successfully");
      }
    });
  } else if (chunk.toString().includes("subscribe")) {
    client.subscribe(topic, (error) => {
      if (!error) {
        console.log(`Subscribed to topic ${topic}`);
      }
    });
  } else if (chunk.toString().includes("quit")) {
    client.end((error) => {
      if (!error) {
        console.log("Terminating!");
        process.exit(0);
      }
    });
  } else {
    console.log(`Unknown: ${chunk.toString().trim()}`);
  }
});
