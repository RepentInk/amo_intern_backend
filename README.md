# Isaac Nyarko
* Note: All branch names should be lowercaps
* run npm install when you pull from new branch
* start the app with: npm run start
* with js file -> *npx typeorm migration:run -d dist/database/datasource.config*
* run dummy data with: *typeorm migration:run*





# Razak Ayariga
## Dummy data
Create a seeds folder that contains the dummy data file of each entity.

## dummy data migration file
create a dummy data migration file in the migrations folder using:
`typeorm migration:create path-to-output-file/your-file-name`

In this case
* run
`typeorm migration:create src/migrations/dummyData`

## run dummy data migration file
Write a script for the migration command in the package.json
"migration:run": `npx typeorm-ts-node-esm migration:run  --dataSource path-to-datasource-file`

in this case
"migration:run": `npx typeorm-ts-node-esm migration:run  --dataSource src/database/datasource.config.ts`

* run
`npm run migration:run`


# Razak Adams
## enttity index.ts file
imports all entities and exports the array to the dbConfig.ts in database folder.
Allowing all entities to be passed as a single array variable.
## migrations
### generate migration for all entities
`typeorm migration:generate path-to-output-file -d path-to-datasource-config`

In this instance
* run
compile ts to js
`npm run start`
* run 
`typeorm migration:generate src/migrations/dbmigration -d dist/database/datasource.config` 


### run migrations file
import migration file into migration array in the `datasource.confiig.ts`
`npx typeorm migration:run -d path-to-datasource-config`

in this instance
* run
compile ts to js
`npm run start`
* run 
` npx typeorm migration:run -d dist/database/datasource.config` -> this work better


* imports all entities and exports the array to the dbConfig.ts in database folder.
* Allowing all entities to be passed as a single array variable.





# Swanzy



