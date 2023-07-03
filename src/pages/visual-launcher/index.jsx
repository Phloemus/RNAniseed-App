

import React from 'react'
import { Link } from 'react-router-dom'

/***************************************** Component imports ******************************************* */
import Navbar from "../../components/navbar"


/***************************************** Layer imports *********************************************** */
import ExplorationLayer from './explorationLayer'
import ComparisonLayer from './comparisonLayer'
import CategoryTileChooser from '../../components/category-tile-chooser'
import { WaitingPanel } from "./components/panels/waiting-panel"

/***************************************** Icon imports ************************************************ */
import { MdOutlineCancel } from 'react-icons/md'







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
        <div className="pt-6 bg-slate-100 h-full flex">

            {
                <WaitingPanel 
                    show={isWaitingPanelVisible}
                    onQuit={switchWaitingPanelVisibility}
                /> 
            }

            <main className="mt-8 mx-4 md:mx-auto md:max-w-2xl bg-white rounded-md">

                <div className="p-4">

                    <CategoryTileChooser items={categories} activeId={layerId}/>

                    {
                        layers[layerId]
                    }

                </div>

            </main>
        
            <aside className='px-4 pt-4 fixed right-0 top-0 w-72 h-full bg-white rounded-md overflow-y-scroll shadow-lg z-2'>
                <div className='pb-1 flex justify-between items-center border-b border-b-slate-400'>
                    <h3 className='text-lg text-slate-900 font-semibold'>Tutorial - exploration</h3>
                    <MdOutlineCancel
                        className='cursor-pointer'
                        size={18}
                    />
                </div>
                <div className='my-4'>
                    <p className='my-2 text-slate-700 text-sm md:text-md leading-5'>
                        Welcome to the single cell RNA seq exploration tool !
                    </p>
                </div>
                <div className='my-4'>
                    <h4 className='text-base text-slate-800 font-semibold'>Principles</h4>
                    <p className='my-2 text-slate-700 text-sm md:text-md leading-5'>
                        Here you can explore a single dataset to check some hypothesis
                        you have or to find new biology questions
                    </p>
                </div>
                <div className='my-4'>
                    <h4 className='text-base text-slate-800 font-semibold'>Select a species</h4>
                    <p className='my-2 text-slate-700 text-sm md:text-md leading-5'>
                        Restricting your exploration will be easier when navigating scRNAseq data 
                        in our visual tool
                    </p>
                    <p className='my-2 text-slate-700 text-sm md:text-md leading-5'>
                        Start by selecting a specie you want to investigate on
                    </p>
                </div>
                <div className='my-4'>
                    <h4 className='text-base text-slate-800 font-semibold'>Choose a dataset</h4>
                    <p className='my-2 text-slate-700 text-sm md:text-md leading-5'>
                        After selecting the species, you will have a list of the available datasets
                        associate with it
                    </p>
                    <p className='my-2 text-slate-700 text-sm md:text-md leading-5'>
                        Some species doesn't have any single cell RNA seq data available and no 
                        datasets.
                    </p>
                    <p className='my-2 text-slate-700 text-sm md:text-md leading-5'>
                        Help the community by <Link to={'/upload'} className='text-green-500 hover:underline'>uploading</Link> your 
                        single cell RNA seq data to our plateform
                    </p>
                </div>
                <div className='my-4'>
                    <h4 className='text-base text-slate-800 font-semibold'>Select the stages</h4>
                    <p className='my-2 text-slate-700 text-sm md:text-md leading-5'>
                        Indicate the stages you want to investigate on, only those will be 
                        disponible in the visual tool but you would be able to filter them 
                        in the visual tool
                    </p>
                </div>
                <div className='my-4'>
                    <p className='my-2 text-slate-700 text-sm md:text-md leading-5'>
                        Want improvements ? Give your feedback on this single cell tool
                    </p>
                    <button className='my-3 py-2 flex justify-center bg-green-500 text-base text-white rounded-md w-full cursor-pointer'>
                        Give Feedback
                    </button>
                </div>
            </aside>

      </div>
    )
}

export default VisualLauncher