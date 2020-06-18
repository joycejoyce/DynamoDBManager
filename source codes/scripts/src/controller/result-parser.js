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
            [
                {"AttributeName": "A1", "AttributeType": "S"},
                {"AttributeName": "A2", "AttributeType": "BOOL"},
            ],
        Output:
            [ "A1", "A2" ]
    */
    static getKeyAttrNames(attrDefs) {
        const names = attrDefs.map(attrDef => attrDef.AttributeName);
        return names;
    }
    
    /*
        Input:
            [
                {"AttributeName": "A1", "KeyType": "HASH"},
                {"AttributeName": "A2", "KeyType": "RANGE"},
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
                {"AttributeName": "A1", "AttributeType": "S"},
                {"AttributeName": "A2", "AttributeType": "BOOL"},
            ],
        Output:
            [ "A1": "S", "A2": "BOOL" ]
    */
    static getAttrNameTypeMap(attrDefs) {
        const map = attrDefs.reduce((accumulator, attrDef) => {
            accumulator[attrDef.AttributeName] = attrDef.AttributeType;
            return accumulator;
        }, {});
        
        return map;
    }
}

export { ResultParser }