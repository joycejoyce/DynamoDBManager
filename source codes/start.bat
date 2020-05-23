set DB_DATA_MGR_PATH="C:\Users\Joyce\Documents\GitRepo_DynamoDBManager\source codes"
set DYNAMO_DB_PATH="D:\Tools\dynamodb_local_latest"
set APACHE_SVR_PATH="D:\Tools\XAMPP\apache\bin"

rem === 1. Compile JavaSscript files ===
start /d %DB_DATA_MGR_PATH% npm run watch-babel

rem === 2. Compile SCSS files ===
start /d %DB_DATA_MGR_PATH% npm run watch-sass

rem === 3.launch DynamoDB ===
start "DynamoDB" /d %DYNAMO_DB_PATH% dynamo-db.bat

rem === 4. Launch Apache server ===
start "Apache" /d %APACHE_SVR_PATH% httpd -k restart

exit