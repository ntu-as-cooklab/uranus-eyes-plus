# Uranus Eyes Plus

Web service for cloud classification.

This is a research project that want to collect more classified photos of atmosphere cloud. Via the collecting data, we can train better models to classify cloud photos. Currently the model is traind by simple deep learnign with the [this data](https://github.com/tigercosmos/Uranus-Eyes/releases/download/v0.0.1/photo.tar.gz), which is collected from atmosphere organizations.

## Demo

<img alt="Demo" src="https://raw.githubusercontent.com/tigercosmos/uranus-eyes-plus/master/assets/demo.png" height="800">

## Setup

`NodeJs` with `npm` and `MongoDB` are required.

```bash
git clone https://github.com/tigercosmos/uranus-eyes-plus.git
cd uranus-eyes-plus
sudo apt-get install python-pip python-dev build-essential
sudo pip install --upgrade pip
sudo pip install --ignore-installed --upgrade tensorflow
chmod +x ./tool
./tool install
```

## Develop

### Introduce

Website uses Angular, and server use NodeJS.

### Setting

Modify `server/config.js` to change `port`, `DB`, and `data`

### Build

only build the frontend website

```bash
./tool build
```

### Run

run the server on `127.0.0.1:3000`. need build first.

```bash
./tool run
```

### Auto

build the website and run the server on `127.0.0.1:3000`.

```bash
./tool auto
```

### Test

server unit test on `127.0.0.1:8888`.

```bash
./tool test
```

## Publish

Run product serivce on `127.0.0.1:8000`. You can use `nginx` service to pass it to `80` port.

```bash
./tool publish
```

Recieved image data will save at `server/data`