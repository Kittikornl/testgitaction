FROM golang:alpine
ENV GIN_MODE=release

WORKDIR /go/src/app
COPY . .

RUN go mod vendor
RUN go build

EXPOSE 8080

CMD ["./backend"]
