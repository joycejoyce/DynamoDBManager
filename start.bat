set DB_DATA_MGR_PATH="C:\Users\Joyce\Documents\GitRepo_DynamoDBManager\source codes"
set DYNAMO_DB_PATH="D:\Tools\dynamodb_local_latest"
set APACHE_SVR_PATH="D:\Tools\XAMPP\apache\bin"

rem === 1. Webpack ===
start /d %DB_DATA_MGR_PATH% npm run watch

rem === 2.launch DynamoDB ===
start "DynamoDB" /d %DYNAMO_DB_PATH% dynamo-db.bat

rem === 3. Launch Apache server ===
start "Apache" /d %APACHE_SVR_PATH% httpd -k restart

exit