"use strict";

System.register([], function (_export, _context) {
  "use strict";

  function DBConnection() {
    this.getDBApi = function () {
      var config = getConfig();
      AWS.config.update(config);
      var dynamoDB = new AWS.DynamoDB();
      return dynamoDB;
    };

    function getConfig() {
      var config = {
        region: "us-west-2",
        endpoint: "http://localhost:8000",
        accessKeyId: "fakeKeyId",
        secretAccessKey: "fakeSecretKey"
      };
      return config;
    }
  }

  _export("DBConnection", DBConnection);

  return {
    setters: [],
    execute: function () {}
  };
});