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
            attrDefs =>
                [
                    {"AttributeName": "A", "AttributeType": "S"},
                    {"AttributeName": "B", "AttributeType": "BOOL"}
                ]
        Output:
            [
                { id: 0, name: "A", type: "S", keyType: "HASH" },
                { id: 1, name: "B", type: "BOOL", keyType: "RANGE" },
                { id: 2, name: "C", type: "N", keyType: "NON-KEY" }
            ]
    */
    static getAttrsOfView(items, keySchema, attrDefs) {
        const unsortedAttrs = this.getAttrs(items, keySchema, attrDefs);
        const sortedAttrs = unsortedAttrs.sort(this.sortAttrs);
        const attrs = sortedAttrs.map((attr, index) => ({id: index, ...attr}));
        
        return attrs;
    }
    
    static getAttrs(items, keySchema, attrDefs) {
        const attrsOfKeys = this.getAttrsByKeys(keySchema, attrDefs);
        const attrsOfItems = this.getAttrsByItems(items, keySchema);
        const attrs = [...attrsOfKeys, ...attrsOfItems];
        
        return attrs;
    }
    
    /*
        Input:
            keySchema => 
                [
                    {"AttributeName": "A1", "KeyType": "HASH"},
                    {"AttributeName": "A2", "KeyType": "RANGE"}
                ]
            attrDefs =>
                [
                    {"AttributeName": "A", "AttributeType": "S"},
                    {"AttributeName": "B", "AttributeType": "BOOL"}
                ]
        Output:
            [
                { name: "A", type: "S", keyType: "HASH" },
                { name: "B", type: "BOOL", keyType: "RANGE" }
            ]
    */
    static getAttrsByKeys(keySchema, attrDefs) {
        const attrs = keySchema.reduce((acc, key) => {
            const name = key.AttributeName;
            const type = attrDefs.filter(attrDef => attrDef.AttributeName === name)
                .map(attrDef => attrDef.AttributeType)[0];
            const keyType = key.KeyType;
            
            const attr = {name, type, keyType};
            acc.push(attr);
            return acc;
        }, []);
        
        return attrs;
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
                { name: "C", type: "N", keyType: "NON-KEY" }
            ]
    */
    static getAttrsByItems(items, keySchema) {
        const keyType = KEY_TYPE.NON_KEY;
        let names = [];
        const keyNames = this.getKeyNames(keySchema);
        const attrs = items.reduce((acc, item) => {
            Object.entries(item).forEach(itemEntry => {
                const [name, typeToValue] = itemEntry;
                if(!names.includes(name) && !keyNames.includes(name)) {
                    names.push(name);
                    const type = Object.keys(typeToValue)[0];
                    const attr = {name, type, keyType};
                    acc.push(attr);
                }
            });
            return acc;
        }, []);
        
        return attrs;
    }
    
    /*
        Input:
            keySchema => 
                [
                    {"AttributeName": "A1", "KeyType": "HASH"},
                    {"AttributeName": "A2", "KeyType": "RANGE"}
                ]
        Output:
            [ "A1", "A2" ]
    */
    static getKeyNames(keySchema) {
        const keyNames = keySchema.map(key => key.AttributeName);
        
        return keyNames;
    }
    
    static sortAttrs(v1, v2) {
        return KEY_TYPE_VALUE[v1.keyType] < KEY_TYPE_VALUE[v2.keyType] ? 1 : -1;
    }
}

const KEY_TYPE = CommonVar.KEY_TYPE;

const KEY_TYPE_VALUE = {
    [KEY_TYPE.HASH]: 2,
    [KEY_TYPE.RANGE]: 1,
    [KEY_TYPE.NON_KEY]: 0
}

export { ResultParser }