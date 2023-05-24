/********************************* Dynamic List component ****************************************** /
 * 
 * Author: Brieuc Quemeneur
 * Copyrights: gingembre.org
 * 
 */


/******************** imports ***************** */
import React from 'react';


/*************************************** ListItem ************************************************* /
 * 
 * @param item[JSON] : JSON: {id: number, name: string, description: string}
 * @param isActivated[bool] : boolean value indicating if the item is actived or not
 * 
 */
const ListItem = ({item, isSelected, onActivate}) => {
    return (
        <>
            <li onClick={() => {onActivate(item.id)}}>
                <div className={`
                                ${isSelected ? 'bg-green-500' : 'bg-white'}
                                px-4 py-3 my-1
                                ${!isSelected ? 'hover:bg-green-200' : ''}
                                rounded-md
                                shadow-sm
                                hover:cursor-pointer
                            `}
                >
                    <h4 className={`
                                  text-md font-semibold 
                                  ${isSelected ? 'text-white' : 'text-slate-900'}
                            `}
                    >
                        {item.title}
                    </h4>
                    <p className={`
                                  text-sm
                                  ${isSelected ? 'text-white' : 'text-slate-700'}
                            `}
                    >
                        {item.description}
                    </p>
                </div>
            </li>
        </>
    );
}


/****************************************** Dynamic List *************************************** /
 * 
 * Component displaying the list of element in a elegent manner. This component is not mutable
 * on its own and should consume a item variable corresponding to a @state in the parent component 
 * to actually be folow the changes of the parent @state data provided (items). 
 * 
 * This component can still update the @state with the provided @stateModifier from the parent
 * 
 * -----------------------------------------------------------------------------------------------
 * 
 * @param items[ArrayOfJSON]             : (JSON: { id: number, name: string, description: string })
 * 
 * @param selectedItemIds[ArrayOfNumber] : @state from parent coresponding to an array containing 
 *                                         the ids of the activated and selected items in the list
 *  
 * @param changeSelectedItems[function]  : @stateModifier function from parent triggered when an 
 *                                         item is selected from the items array to change the 
 *                                         value of the parent @state containing the activatedItems
 * 
 * @param notFoundMsg[string]            : string containing the text to display in case of no items 
 *                                         are found in the dynamic list
 * 
 * @param maxItemSelection[number]       : number of items that can be selected and activated at
 *                                         the same time (default 1). Unlimited selection (-1)
 * 
 * -----------------------------------------------------------------------------------------------
 *
 * TODO: change the text displayed when the items array is empty
 * TODO: change the boolean activation to be a parameter allowing to have multiple items 
 * TODO:    activated and selected at the same time
 *  
 */
const DynamicList = ({items, selectedItemIds, changeSelectedItems, notFoundMsg, maxItemSelection = 1}) => {


    /************* changeActivatedItems ********************************************************* /
     * 
     * Allow to change the parent @state storing the idexes of the activated items 
     * in the dynamic list (aka selectedItems)
     * 
     * @param id : (number) : identifier of the clicked item. It should be added or 
     *                        removed from the @state activatedItems depending on 
     *                        it's value and the number of @argument maxItemSelection
     *                        value defining the limit of selected items
     *
     * TODO: Work on the case where the @argument maxItemSelection is 0 or a number > 1 
     * 
     */
    const changeAcivatedItems = (id) => {

        const _selectedItems = JSON.parse(JSON.stringify(selectedItemIds));

        // case of maxItemSelection illimited (-1)
        if(maxItemSelection === -1) {
            if(!selectedItemIds.includes(id)) {
                _selectedItems.push(id)
                changeSelectedItems(_selectedItems)
            } else {
                _selectedItems.splice(selectedItemIds.indexOf(id), 1)
                changeSelectedItems(_selectedItems);
            }
        }

        // case of maxItemSelection of only 1 selectable item
        if(maxItemSelection === 1) {
            if(!selectedItemIds.includes(id)) {
                changeSelectedItems([id]);
            } else {
                changeSelectedItems([]);
            }
        }

        // TODO: Work on the case of the limit of selected items is a certain number

    }

    return(
        <div className="
            bg-slate-100
            border 
            border-slate-100
            rounded-md
            px-4 py-2
        ">
            <ul>

                {
                    items.length === 0 ? (
                        <p className='p-6 text-center text-sm text-slate-400'>{notFoundMsg}</p>
                    ) : (
                        items.map((item, id) => {
                            return(
                                <ListItem 
                                    key={id}
                                    item={item}
                                    isSelected={selectedItemIds.includes(item.id)}
                                    onActivate={changeAcivatedItems}
                                />
                            )
                        })
                    )
                }


            </ul>
        </div>
    )
}

export default DynamicList