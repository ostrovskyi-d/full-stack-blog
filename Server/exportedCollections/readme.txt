→ To export collection:

Need to "cd .../mongodb/bin"

> .../mongodb/bin/: 	./mongoexport.exe -d test -c users -o db_test_c_users.json
			./mongoexport.exe -d test -c posts -o db_test_c_posts.json

► To import collection:

> .../mongodb/bin/: ./mongoimport.exe -d dbName -c collectionName --file fileName.json