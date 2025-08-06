#!/bin/bash
set -e

# Create the production and Airflow databases.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE airflow;
    CREATE DATABASE unholy;
EOSQL
