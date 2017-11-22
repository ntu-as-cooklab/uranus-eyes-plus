#!/usr/bin/env sh
if [ $1 = 'auto' ]
then
    cd website
    npm run-script build
    cd ..
    rm -rf server/dist
    mv website/dist/ server/dist/
    cd server
    npm start
fi
if [ $1 = 'run' ]
then
    cd server
    npm start
fi
if [ $1 = 'build' ]
then 
    cd website
    npm run-script build
    cd ..
    rm -rf server/dist
    mv website/dist/ server/dist/
fi
if [ $1 = 'test' ]
then 
    cd server
    npm test
fi
if [ $1 = 'install' ]
then 
  cd ./website && npm install && cd ..
  cd ./server && npm install && cd ..
fi
