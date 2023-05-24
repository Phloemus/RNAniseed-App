

import { Link } from 'react-router-dom'


//! Fixtures - For testing purposes -- import items from './fixtures.json'


/**************************** CategoryTileChooser ***************************************************** /
 * 
 * Horizontal component that allow to choose a specific item given as @param items by clicking on the
 * corresponding tile. Any number of items can be displayed on this component.
 * Only one choice can be selected at the same time
 * 
 * @param ArrayJSON items       : An Array of the items that should be placed in the component
 *                                an item should be have the JSON format with the title key and 
 *                                an optional location that should be followed if indicated
 *                                item : { @required title: "tileName", @optional to: "\location" }
 * 
 * @param int activeId          : The id of the active Tile in the category chooser
 * 
 */
const CategoryTileChooser = ({ items, activeId }) => {
    return (
        <div className="p-2 rounded-lg w-full bg-slate-100 flex gap-2">
            {
                items.map((item, id) => (
                    <Link 
                        key={id}
                        to={item.to}
                        className={`
                            p-2 
                            flex-1 flex justify-center 
                            ${ activeId == id ? 'bg-green-500' : 'bg-green-200'} 
                            rounded-lg hover:cursor-pointer
                    `}>
                        <h3 className={`
                            mx-auto text-md 
                            ${ activeId == id ? 'text-white' : 'text-green-500'}
                        `}>
                            {item.title}
                        </h3>
                    </Link>
                ))
            }
        </div>
    )
}

export default CategoryTileChooser