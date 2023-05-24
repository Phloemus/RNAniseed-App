

import React from 'react'

/***************************************** Component imports ******************************************* */
import Navbar from "../../components/navbar"


/***************************************** Layer imports *********************************************** */
import ExplorationLayer from './explorationLayer'
import ComparisonLayer from './comparisonLayer'
import CategoryTileChooser from '../../components/category-tile-chooser'
import { WaitingPanel } from "./components/panels/waiting-panel"







/********************************* Visual Launcher ***************************************************** /
 * 
 * The Visual Launcher components allow to choose the mode of visualisation and allow the user to 
 * select some parameters to restrict the range of the visualisation. After selection, the launcher 
 * trigger the activation of the h5ad file creation.
 * This component is also responsible to make the user wait until the creation of the h5ad file is 
 * ready.
 *
 */
const VisualLauncher = ({ layerId }) => {

    /**************** States **************************************************** /
     * 
     * @state isWaitinPanelVisible : boolean value containing the visibility of
     *                               the vizualisation waiting animations
     * 
     */
    const [isWaitingPanelVisible, setIsWaitingPanelVisible] = React.useState(false);


    /**************** State Modifiers ******************************************* /
     * 
     * @stateModifier switchWaitingPanelVisibility : Allow to toggle the component
     *                                               that makes the user wait for 
     *                                               the vizualisation
     * 
     */
    const switchWaitingPanelVisibility = () => {
        setIsWaitingPanelVisible((prev) => !prev);
    }


    const layers = [
        <ExplorationLayer 
            onLaunchWaiting={switchWaitingPanelVisibility}
        />,
        <ComparisonLayer />
    ]

    const categories = [
        {
            title: "Exploration",
            to: "/explore"
        },
        {
            title: "Comparison",
            to: "/compare"
        },
    ]

    return (
        <div className="bg-slate-100 h-full">

            <Navbar/>

            {
                <WaitingPanel 
                    show={isWaitingPanelVisible}
                    onQuit={switchWaitingPanelVisibility}
                /> 
            }

            <main class="mt-8 mx-4 md:mx-auto md:max-w-2xl bg-white rounded-md">

                <div className="p-4">

                    <CategoryTileChooser items={categories} activeId={layerId}/>

                    {
                        layers[layerId]
                    }

                </div>

            </main>

      </div>
    )
}

export default VisualLauncher