import { CommonVar } from "./common-var.js";

class InputParser {
    /*
        (output)
        ConditionExpression: 
            "#name0 = :value0 AND #name1 = :value1"
        ReturnConsumedCapacity:
            "TOTAL"
    */
    static getDeleteParams(params) {
        const commonParams = this.getUpdateCommonParams(params);
        const ReturnConsumedCapacity = "TOTAL";
        const ConditionExpression = this.getCondExp("", Object.keys(commonParams.ExpressionAttributeNames).length, "AND");
        const parsedParams = {
            ...commonParams,
            ReturnConsumedCapacity,
            ConditionExpression
        };
        
        return parsedParams;
    }
    
    /*
        input:
            tableName =>
                "TestTable"
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY" },
                    { name: "D", type: "S", keyType: "NON-KEY" }
                ]
            attrCondition =>
                { "A": "A1", "B": "100", "C": "Y"/"true", "D": "Test" }
        output:
            [
                {
                    Key: {
                        "A": {
                            S: "A1"
                        },
                        "B": {
                            N: "100"
                        }
                    },
                    TableName: "TestTable",
                    ExpressionAttributeNames: {
                        "#name0": "C",
                        "#name1": "D"
                    },
                    ExpressionAttributeValues: {
                        ":value0": { BOOL: true },
                        ":value1": { "S": "Test" }
                    }
                }
            ]
    */
    static getUpdateCommonParams(params) {
        const {tableName, attrDefs, attrCondition} = params;
        
        const Key = this.getKeyConditions(attrDefs, attrCondition);
        const TableName = tableName;
        const [ExpressionAttributeNames, ExpressionAttributeValues] = this.getExpAttrNamesAndValues(attrDefs, attrCondition);
        
        const parsedParams = {
            Key,
            TableName,
            ExpressionAttributeNames,
            ExpressionAttributeValues
        };
        
        return parsedParams;
    }
    
    /*
        input:
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY" },
                    { name: "D", type: "S", keyType: "NON-KEY" }
                ]
            attrCondition =>
                { "A": "A1", "B": "100", "C": "Y"/"true", "D": "Test" }
        output:
            Key: {
                "A": {
                    S: "A1"
                },
                "B": {
                    N: "100"
                }
            }
    */
    static getKeyConditions(attrDefs, attrCondition) {
        const keyAttrDefs = this.getKeyAttrDefs(attrDefs);
        const keyConditions = this.getAttrNameTypeValueObj(keyAttrDefs, attrCondition);
        
        return keyConditions;
    }
    
    /*
        input:
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY" },
                    { name: "D", type: "S", keyType: "NON-KEY" }
                ]
        output:
            [
                { name: "A", type: "S", keyType: "HASH" },
                { name: "B", type: "N", keyType: "RANGE" }
            ]
    */
    static getKeyAttrDefs(attrDefs) {
        return attrDefs.filter(attrDef => attrDef.keyType != KEY_TYPE.NON_KEY);
    }
    
    /*
        input:
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY" },
                    { name: "D", type: "S", keyType: "NON-KEY" }
                ]
            attrCondition =>
                { "A": "A1", "B": "100", "C": "Y"/"true", "D": "Test" }
        output:
            {
                "A": {
                    S: "A1"
                },
                "B": {
                    N: "100"
                },
                "C": {
                    BOOL: true
                },
                "D": {
                    S: "Test"
                }
            }
    */
    static getAttrNameTypeValueObj(attrDefs, attrCondition) {
        const obj = attrDefs.reduce((acc, def) => {
            const name = def.name;
            const type = def.type;
            const value = this.getMappedValue(attrCondition[name], type);
            acc[name] = {
                [type]: value
            };
            return acc;
        }, {});
        
        return obj;
    }
    
    static getMappedValue(value, type) {
        switch(type) {
            case "BOOL":
                if(typeof value === "string") {
                    const v = value.toUpperCase();
                    if(v === "Y" || v === "TRUE"){
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                return value;
                break;
            default:
                return value;
        }
    }
    
    /*
        input:
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY" },
                    { name: "D", type: "S", keyType: "NON-KEY" }
                ]
            attrCondition =>
                { "A": "A1", "B": "100", "C": "Y"/"true", "D": "Test" }
        output:
            [
                ExpressionAttributeNames: {
                    "#name0": "C",
                    "#name1": "D"
                },
                ExpressionAttributeValues: {
                    ":value0": { "BOOL": true },
                    ":value1": { "S": "Test" }
                }
            ]
    */
    static getExpAttrNamesAndValues(attrDefs, attrCondition) {
        const nonKeyAttrDefs = this.getNonKeyAttrDefs(attrDefs);
        
        const ExpressionAttributeNames = nonKeyAttrDefs.reduce((acc, attrDef, index) => {
            acc["#name"+index.toString()] = attrDef.name;
            return acc;
        }, {});
        
        const ExpressionAttributeValues = nonKeyAttrDefs.reduce((acc, attrDef, index) => {
            const name = attrDef.name;
            const value = attrCondition[name];
            const type = attrDef.type;
            acc[":value"+index.toString()] = { [type]: this.getMappedValue(value, type) };
            return acc;
        }, {});
        
        return [ExpressionAttributeNames, ExpressionAttributeValues];
    }
    
    /*
        input:
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY" },
                    { name: "D", type: "S", keyType: "NON-KEY" }
                ]
        output:
            [
                { name: "C", type: "BOOL", keyType: "NON-KEY" },
                { name: "D", type: "S", keyType: "NON-KEY" }
            ]
    */
    static getNonKeyAttrDefs(attrDefs) {
        return attrDefs.filter(attrDef => attrDef.keyType === KEY_TYPE.NON_KEY);
    }
    
    /*
        input:
            num => 3
        output:
            "#name0 = :value0 AND #name1 = :value1 AND #name2 = :value2"
    */
    static getCondExp(start, num, delimiter) {
        let exp = (start.length > 0) ? `${start} ` : "";
        for(let i=0; i<num; i++) {
            if(i > 0) {
                exp += ` ${delimiter} `;
            }
            exp += `#name${i.toString()} = :value${i.toString()}`;
        }
        
        return exp;
    }
    
    /*
        (output)
        UpdateExpression: 
            "SET #name0 = :value0, #name1 = :value1"
        ReturnValues:
            "ALL_NEW"
    */
    static getUpdateParams(params) {
        const commonParams = this.getUpdateCommonParams(params);
        const ReturnValues = "ALL_NEW";
        const UpdateExpression = this.getCondExp("SET", Object.keys(commonParams.ExpressionAttributeNames).length, ",");
        const parsedParams = {
            ...commonParams,
            UpdateExpression,
            ReturnValues
        };

        return parsedParams;
    }
    
    /*
        input:
            tableName =>
                "TestTable"
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY" },
                    { name: "D", type: "S", keyType: "NON-KEY" }
                ]
            attrCondition =>
                { "A": "A1", "B": "100", "C": "Y"/"true", "D": "Test" }
        output:
            {
                RequestItems: {
                    "TestTable": [
                        {
                            PutRequest: {
                                Item: {
                                    "A": {
                                        S: "A1"
                                    },
                                    "B": {
                                        N: "100"
                                    },
                                    "C": {
                                        BOOL: true
                                    },
                                    "D": {
                                        S: "Test"
                                    }
                                }
                            }
                        }
                    ]
                },
                ReturnConsumedCapacity:
                    "TOTAL"
            }
    */
    static getAddParams(params) {
        const {tableName, attrDefs, attrCondition} = params;
        const attrNameTypeValueObj = this.getAttrNameTypeValueObj(attrDefs, attrCondition);
        const Item = {...attrNameTypeValueObj};
        const PutRequest = {Item};
        const RequestItems = {[tableName]: [{PutRequest}]};
        const ReturnConsumedCapacity = "TOTAL";
        const parsedParams = {RequestItems, ReturnConsumedCapacity};
        
        return parsedParams;
    }
    
    /*
        input:
            tableName =>
                "TestTable"
            attrDefs =>
                [
                    { name: "A", type: "S", keyType: "HASH" },
                    { name: "B", type: "N", keyType: "RANGE" },
                    { name: "C", type: "BOOL", keyType: "NON-KEY", delete: true },
                    { name: "D", type: "S", keyType: "NON-KEY", delete: true }
                ]
            attrCondition =>
                { "A": "A1", "B": "100", "C": "Y"/"true", "D": "Test" }
        output:
            [
                {
                    Key: {
                        "A": {
                            S: "A1"
                        },
                        "B": {
                            N: "100"
                        }
                    },
                    TableName: "TestTable",
                    UpdateExpression: 
                        "REMOVE C, D",
                    ReturnValues:
                        "ALL_NEW"
                }
            ]
    */
    static getRemoveAttrParams(params) {
        const commonParams = this.getUpdateCommonParams(params);
        const UpdateExpression = this.getRemoveAttrUpdExp(params.attrDefs);
        const ReturnValues = "ALL_NEW";
        const parsedParams = {
            TableName: commonParams.TableName,
            Key: commonParams.Key,
            UpdateExpression,
            ReturnValues
        };
        
        return parsedParams;
    }
    
    static getRemoveAttrUpdExp(attrDefs) {
        const attrNames = this.getAttrsToRemove(attrDefs);
        const exp = this.getRemoveAttrExp(attrNames);
        
        return exp;
    }
    
    static getAttrsToRemove(attrDefs) {
        const names = attrDefs
            .filter(attrDef => attrDef.delete)
            .map(attrDef => attrDef.name);
        
        return names;
    }
    
    static getRemoveAttrExp(attrNames) {
        const exp = attrNames.reduce((acc, name, index) => {
            if(index > 0) {
                acc += ", ";
            }
            acc += name;
            return acc;
        }, "REMOVE ");
        
        return exp;
    }
}

const KEY_TYPE = CommonVar.KEY_TYPE;

export {
    InputParser
}