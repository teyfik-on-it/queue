# queue

a simple NestJS application as an example to use queues on an HTTP Endpoint

## quick start with docker

```shell
cp .example.env .env
cp .example.env.local .env.local # to run application outside container
docker-compose up
```

## test if it falls into a race condition

```shell
npm run test:race
```
