import config from "../../../config.json";

function DBConnection() {
    this.getDBApi = () => {
        try {
            AWS.config.update(getConfig());
            const dynamoDB = new AWS.DynamoDB();
            return dynamoDB;
        } catch(e) {
            console.log(e);
        }
    };

    function getConfig() {
        const config = {
            region: getRegion(),
            credentials: getCredentials()
        };

        console.log({config});
        
        return config;
    }

    function getRegion() {
        const region = config.cognito.RESION;
        
        return region;
    }

    function getCredentials() {
        const credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
        });

        return credentials;
    }
}

export {
    DBConnection
};