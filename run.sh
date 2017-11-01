#!/bin/bash
cd website
npm run-script build
cd ..
rm -rf server/dist
mv website/dist/ server/dist/
cd server
npm start