import {TABLE_NAME, TBL_TRACK_COLUMN} from "../constants/db-info.js";
import {DBSetter} from "../tools/db-setter.js";
import {Message} from "../tools/message.js";
import {PROCESS} from "./table-processor.js";

function TableCreator(tableName) {
    let dynamoDB = new DBSetter().getDynamoDB();
    
    this.process = function() {
        switch(tableName) {
            case TABLE_NAME.track:
                createTrackTable();
                break;
            default:
                throw `Unexpected tableName [${tableName}]`;
                break;
        }
    };
    
    function createTrackTable() {
        const params = {
            TableName: TABLE_NAME.track,
            KeySchema: [{
                    AttributeName: TBL_TRACK_COLUMN.userId,
                    KeyType: "HASH"
                },
                {
                    AttributeName: TBL_TRACK_COLUMN.habitId,
                    KeyType: "RANGE"
                }
            ],
            AttributeDefinitions: [{
                    AttributeName: TBL_TRACK_COLUMN.userId,
                    AttributeType: "S"
                },
                {
                    AttributeName: TBL_TRACK_COLUMN.habitId,
                    AttributeType: "N"
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };
        
        createTableByDynamoDB(params);
    }
    
    function createTableByDynamoDB(params) {
        dynamoDB.createTable(params, function(err, data) {
            if(err) {
                Message.showTableProcessFailMessage(err, PROCESS.create);
            }
            else {
                Message.showTableProcessSuccessMessage(data, PROCESS.create);
            }
        });
    }
}

export {
    TableCreator
};