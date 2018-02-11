#!/bin/bash
rm -rf dist # clear

check=on webpack --config ./node_modules/@talentui/external-components-webpack-config/webpack.config.js #执行构建