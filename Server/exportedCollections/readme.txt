→ To export collection:

Need to "cd .../mongodb/bin"

> .../mongodb/bin/: ./mongoexport.exe -d databaseName -c collectionName -o outputFileName.json

► To import collection:

> .../mongodb/bin/: ./mongoimport.exe -d dbName -c collectionName --file fileName.json