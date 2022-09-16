#!/bin/bash
query=""

for filename in scripts/sql/seed/*.seed.sql; do
 query=${query}"$(< ${filename})";
done

npm run typeorm query "${query}";