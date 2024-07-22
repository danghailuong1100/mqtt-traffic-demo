const mqtt = require("mqtt");
const fs = require("fs");
const { sampleTimes, getRandomInt } = require("./shared");
const client = mqtt.connect("mqtt://localhost:7777");

client.on("connect", function () {
  const interval = 1000;
  setInterval(() => {
    const timeStampForThisPublish =
      sampleTimes[getRandomInt(0, sampleTimes.length - 1)];
    const topic = `time/${timeStampForThisPublish}`;
    // Below is an example topic
    // const topic = 'time/1577528308'
    const contentOfTopic = fs.readFileSync(
      `./sample_data/${timeStampForThisPublish}.json`
    );
    client.publish(
      topic,
      JSON.stringify({
        key: new Date().toISOString(),
        content: contentOfTopic.toString(),
      }),
      () => {
        console.log(`Sent new data to topic ${topic}`)
      }
    );
  }, interval);
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
});
