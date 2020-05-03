function DBSetter() {
    this.getDynamoDB = function() {
        configure();
        let dynamoDB = new AWS.DynamoDB();
        return dynamoDB;
    };
    
    function configure() {
        AWS.config.update({
            region: "us-west-2",
            endpoint: "http://localhost:8000",
            //"fakeXXX" are for downloadable version of DynamoDB
            accessKeyId: "fakeMyKeyId",
            secretAccessKey: "fakeSecretAccessKey"            
            
            // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
        });
    }
}

export {
    DBSetter
};