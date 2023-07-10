
/********************************** loadFromLocal ********************************************* /
 * 
 * Allow to get the JSON object corresponding to the @param key string identifer in local
 * storage 
 * 
 * @param key[string] : string which is the key linked to the JSON object in local storage 
 * 
 */
export const loadFromLocal = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};


/********************************** storeToLocal ********************************************** /
 * 
 * Allow to save data in local storage by providing @param data JSON Obj and @param key 
 * the string identifier in local storage necessary to access to @param data 
 * 
 * @param data[JSONObject] : JSON object to save in local storage 
 * @param key[string] : string which is the key the JSON object can be accessed with
 *   
 */
export const storeToLocal = (data, key) => {
    try{
        const serializedState = JSON.stringify(data);
        localStorage.setItem(key, serializedState);
    } catch (err){
        return undefined;
    }
}


/********************************* deleteFromLocal ******************************************* /
 * 
 * Allow to destroy local data at a certain @param key to make the state relying on this 
 * data reset and coming back at their default values. 
 * This function delete the whole JSON object associated with the @param key and does not target
 * a specific subkey in the potential JSON object that is inside the localstorage location 
 * corresponding to the @param key
 * 
 * @param key[string] : string which is the key linked to the JSON object in local storage
 * 
 */
export const deleteFromLocal = (key) => {
    try {
        localStorage.removeItem(key);
    } catch(err) {
        return undefined;
    }
}