
/************** Notice **************** /
 * 
 * Author: Brieuc Quemeneur
 * 
 */


/*********************************** Search Input ******************************************* /
 * 
 * ??? Common Component ???
 * 
 * Self contained search input component with a classic design, theme-responsive
 * 
 * !  the size of the container should be given from a parent component containing this one !
 * !  or a parent container ! 
 * 
 * TODO: resize the component font size
 * TODO: give multiple size options
 * 
 * @param onChangeQuery   : Function triggered during querying
 *                          through this component
 * @param placeholder     : String used as the placeholder string in the input field
 * @param name            : String used as the unique id for the input field 
 * 
 *********************************** Search Input ****************************************** */

import { GoSearch } from 'react-icons/go';
import React from 'react';


const SearchInput = ({placeholder = 'Chercher', name, onChangeQuery}) => {

    const [value, setValue] = React.useState('')

    const handleInputChange = (e) => {
        setValue(e.target.value);
        onChangeQuery(e.target.value);
    }

    return(
        <label className='relative block'>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 pt-1">
                <GoSearch className="h-5 w-5 fill-slate-400 dark:fill-slate-100" viewBox="0 0 20 20"/>
            </span>
            <input 
                className="placeholder:italic 
                            placeholder:text-slate-400
                            dark:placeholder:text-slate-100
                            block bg-white
                            dark:bg-main-dark-bg
                            w-full 
                            text-slate-900
                            dark:text-slate-100
                            border 
                            border-slate-300
                            dark:border-slate-900
                            rounded-md py-2 pl-9 pr-3
                            shadow-sm focus:outline-none
                            focus:border-green-500 focus:ring-green-500
                            focus:ring-1
                            dark:focus:ring-2
                            text-sm" 
                placeholder={placeholder} 
                type="text" 
                name={name}
                value={value}
                onChange={(e) => handleInputChange(e)}
            />
        </label>
    );
}

export default SearchInput