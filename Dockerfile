FROM golang:1.17

RUN go install github.com/krylovsk/mqtt-benchmark@main

COPY benchmark.sh benchmark.sh
RUN chmod +x benchmark.sh
