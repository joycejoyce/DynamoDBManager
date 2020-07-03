function LocalDBConnection() {
    this.getDBApi = () => {
        const config = getConfig();
        AWS.config.update(config);
        const dynamoDB = new AWS.DynamoDB();
        return dynamoDB;
    };
    
    function getConfig() {
        let config = {
            region: "us-west-2",
            endpoint: "http://localhost:8000",
            accessKeyId: "fakeKeyId",
            secretAccessKey: "fakeSecretKey"
        };
        
        return config;
    }
}

export {
    LocalDBConnection
};