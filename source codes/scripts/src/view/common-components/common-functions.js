function CommonFunctions() {
    this.showOrHideElement = (elem) => {
        const display = window.getComputedStyle(elem).getPropertyValue("display");
        
        if(display == "none") {
            elem.style.display = "block";
        }
        else {
            elem.style.display = "none";
        }
    };
    
    this.getDistinctValues = (ary) => {
        const distinctValues = ary.reduce((result, item) => {
            if(!result.includes(item)) {
                result.push(item);
            }
            return result;
        }, []);
        
        return distinctValues;
    }
}

export {
    CommonFunctions
};