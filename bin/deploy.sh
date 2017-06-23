#!/usr/bin/env bash

cp -v app.yaml apps/api/
cp -v production.yaml apps/api/config/

cd apps/api

gcloud app deploy
