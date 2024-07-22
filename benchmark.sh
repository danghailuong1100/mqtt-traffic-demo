#!/bin/bash

NUMBER_OF_MESSAGE_TO_CLIENT=100
MESSAGE_PAYLOAD_SIZE=100
NUMBER_OF_CLIENTS=100

mqtt-benchmark --broker tcp://host.docker.internal:7777 \
    --count $NUMBER_OF_MESSAGE_TO_CLIENT \
    --size $MESSAGE_PAYLOAD_SIZE \
    --clients $NUMBER_OF_CLIENTS --qos 2 --format text
