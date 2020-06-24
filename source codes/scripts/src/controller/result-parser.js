import { CommonVar } from "./common-var.js";

class ResultParser {
    /*
        Input:
            [
                { "actor": { "S": "John" }, "popular": { "BOOL": true } },
                { "actor": { "S": "John" }, "popular": { "BOOL": false } }
            ]
        Output:
            [
                { id: 0, updateMethod: "", attrs: {"actor": "John", "popular": true} },
                { id: 1, updateMethod: "", attrs: {"actor": "John", "popular": false} }
            ]
    */
    static getItemsOfView(items) {
        const itemsOfView = items.reduce((accumulator, item, index) => {
            const obj = {
                id: index,
                updateMethod: "",
                attrs: this.getAttrNameValueMap(item)
            }
            accumulator.push(obj);
            return accumulator;
        }, []);
        
        return itemsOfView;
    }
    
    /*
        Input:
            { "A": { "S": "A1" }, "B": { "BOOL": true }, "C": { "N": "1" } }
        Output:
            { "A": "A1", "B": true, "C": "1" }
    */
    static getAttrNameValueMap(item) {
        const map = Object.entries(item).reduce((accumulator, entry) => {
            const [attrName, typeToValue] = entry;
            const attrValue = Object.values(typeToValue)[0];
            accumulator[attrName] = attrValue;
            return accumulator;
        }, {});
        
        return map;
    }
    
    /*
        Input:
            items =>
                [
                    { "A": { "S": "A1" }, "B": { "BOOL": true }, "C": { "N": "1" } },
                    { "A": { "S": "A2" }, "B": { "BOOL": false }, "C": { "N": "2" } }
                ]
            keySchema => 
                [
                    {"AttributeName": "A1", "KeyType": "HASH"},
                    {"AttributeName": "A2", "KeyType": "RANGE"}
                ]
        Output:
            [
                { id: 0, name: "A", type: "S", keyType: "HASH" },
                { id: 1, name: "B", type: "BOOL", keyType: "RANGE" },
                { id: 2, name: "C", type: "N", keyType: "NON-KEY" }
            ]
    */
    static getAttrsOfView(items, keySchema) {
        const attrNameKeyMap = this.getAttrNameKeyMap(keySchema);
        
        const attrNameTypeMap = this.getAttrNameTypeMap(items);
        
        const unsortedAttrs = Object.entries(attrNameTypeMap).map((attrNameTypeMap, index) => {
            const [name, type] = attrNameTypeMap;
            const keyType = Object.keys(attrNameKeyMap).includes(name) ? attrNameKeyMap[name] : "NON-KEY";
            const attr = {
                name: name,
                type: type,
                keyType: keyType
            }
            return attr;
        });
        
        const sortedAttrs = unsortedAttrs.sort(this.sortAttrs);
        
        const attrs = sortedAttrs.map((attr, index) => ({id: index, ...attr}));
        
        return attrs;
    }
    
    static sortAttrs(v1, v2) {
        return KEY_TYPE_VALUE[v1.keyType] < KEY_TYPE_VALUE[v2.keyType] ? 1 : -1;
    }
    
    /*
        Input:
            [
                {"AttributeName": "A1", "KeyType": "HASH"},
                {"AttributeName": "A2", "KeyType": "RANGE"}
            ],
        Output:
            { "A1": "HASH", "A2": "RANGE" }
    */
    static getAttrNameKeyMap(keySchema) {
        const map = keySchema.reduce((accumulator, schema) => {
            accumulator[schema.AttributeName] = schema.KeyType;
            return accumulator;
        }, {});
        
        return map;
    }
    
    /*
        Input:
            [
                { "Key1": { "S": "K1" }, "Key2": { "BOOL": true }, "NonKey1": { "S": "NK1" } },
                { "Key1": { "S": "K2" }, "Key2": { "BOOL": false }, "NonKey2": { "BOOL": false } }
            ]
        Output:
            { "Key1": "S", "Key2": "BOOL", "NonKey1": "S", "NonKey2": "BOOL" }
    */
    static getAttrNameTypeMap(items) {
        const map = items.reduce((accumulator, item) => {
            const tmpMap = Object.entries(item).reduce((accumulator, attrInfo) => {
                const [name, typeToValue] = attrInfo;
                const type = Object.keys(typeToValue)[0];
                accumulator[name] = type;
                return accumulator;
            }, accumulator);
            
            return accumulator;
        }, {});
        
        return map;
    }
}

const KEY_TYPE = CommonVar.KEY_TYPE;

const KEY_TYPE_VALUE = {
    [KEY_TYPE.HASH]: 2,
    [KEY_TYPE.RANGE]: 1,
    [KEY_TYPE.NON_KEY]: 0
}

export { ResultParser }