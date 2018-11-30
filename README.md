# React Example

A little app that uploads files and runs a python script.


## Setup

Make sure there is an `./uploads` directory in the project root.

### Client

- Change to the `./client` directory
- Copy env.tmp to `.env`
- Replace values in `.env` to match your system

### Server

- Change to the `./server` directory
- Copy env.tmp to `.env`
- Replace values in `.env` to match your system


## Dev Mode

```bash
make dev-build
make dev-start
# or
make dev-run
```

This will open your browser to http://localhost:3000/


## Containerized

### Build and run it

```bash
make build
make start
```

Now open your browser to http://localhost/

### Kill and destroy

```bash
make stop
make rmi
```
