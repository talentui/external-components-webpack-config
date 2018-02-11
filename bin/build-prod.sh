#!/bin/bash
rm -rf dist # clear
NODE_ENV=production webpack --config
./node_modules/@talentui/external-components-webpack-config/webpack.config.js # build-prod