
import React from 'react'
import { Helmet } from "react-helmet";

//! Test purposes - fixtures
// import specieItems from './data/exploration-layer/fixtures-species.json'
import datasetItems from './data/exploration-layer/fixtures-datasets.json'
import stageItems from './data/exploration-layer/fixtures-stages.json'


/************************************* component imports ******************************************** */
import DynamicList from "../../components/dynamic-list"

/************************************* endpoints **************************************************** */
import { publicRoutes } from '../../api/endpoints'
import SearchInput from '../../components/search-input'


/************************************* Exploration Layer ********************************************* /
 * 
 * Allow the user to perform an exploration on one dataset when visualisation. This component 
 * allow to user to choose which kind of dataset he wants to explore, using a step by step 
 * simple process from choosing the specie, the dataset and the cell stage the user wants to 
 * explore.
 * 
 * This exploration layer will launch the visualisation when the selection of the parameters is
 * finished as well as making obvious for the biologist that the visualisation process is 
 * currently starting and will be available in a few seconds. 
 * 
 */
const ExplorationLayer = ({ onLaunchWaiting }) => {


    /*********** States ********************************************************** /
     * 
     * @state species[ArrayJSON]        : Contain the list of selectable species
     * @state selectedSpecie[int]       : Contain the id of the currently selected
     *                                    specie in the specie dynamic list    
     * 
     */
    const [species, setSpecies] = React.useState([])
    const [speciesSearched, setSpeciesSearched] = React.useState([])
    const [selectedSpecie, setSelectedSpecie] = React.useState(null)

    const [datasets, setDatasets] = React.useState([])
    const [selectedDataset, setSelectedDataset] = React.useState(null)

    const [stages, setStages] = React.useState([])
    const [selectedStages, setSelectedStages] = React.useState([])


    /********** On first render ***************************** /
     * 
     * State loading from different datasources on page 
     * first render
     * 
     */
    React.useEffect(() => {
        getAllSpecies()
    }, [])


    /********* On selectedSpecie change *************************** /
     * 
     * Trigger when the selected specie value is changed
     * 
    */
    React.useEffect(() => {
        setSelectedDataset(null)    // reset the dataset selected
        getRelatedDatasets()        // get all the datasets for the selected specie
    }, [selectedSpecie])


    /********* On selectedDataset change *************************** /
     * 
     * Trigger when the selected dataset value is changed
     * 
    */
    React.useEffect(() => {
        setSelectedStages([])    // reset the stages selected
        setStages([])
        getRelatedStages()     // get all the stages for the selected specie
    }, [selectedDataset])


    /*********** State Modifier functions *************************************** /
     * 
     * Function that should modify some states
     * 
     * @stateModifier selectSpecie  : change the selected specie selected by the
     *                                user by changing the id value contain in the 
     *                                @state selectedSpecie
     * 
     * @stateModifier filterSpecies : change the collection of species present in 
     *                                the @state SpeciesSearched allowing to 
     *                                narrow down the number of species to choose 
     *                                from according to a string given by the user
     * 
     * @stateModifier selectDataset : change the selected dataset by the user using
     *                                the @state selectedSpecie indicated previously
     * 
     */
    const selectSpecie = (arr) => {
        setSelectedSpecie((prev) => prev === arr[0] ? null : arr[0])
    }

    const filterSpecies = (text) => {
        setSpeciesSearched(
           species.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const selectDataset = (arr) => {
        setSelectedDataset((prev) => prev === arr[0] ? null : arr[0])
    }

    
    const selectStages = (arr) => {
        const newStages = arr.map((id) => stages[id])
        setSelectedStages(newStages)
    }



    /******* Calls to RNAniseed API ********************************************** /
     * 
     * Functions that execute a request to the RNAniseed API
     * to consume specific data from the database 
     * 
     * @apiCallFunction getAllSpecies : Allow to get all the species that can be
     *                                  explored by single cell RNA seq
     * 
     * @apiCallFunction getRelatedDatasets : Allow to get all the datasets that 
     *                                       are explorable for the @state 
     *                                       selectedSpecie
     * 
     * @apiCallFunction getRelatedStages : Allow to get the cell stages within the
     *                                     dataset 
     * 
     */
    const getAllSpecies = () => {
        fetch(publicRoutes.GET_ALL_SPECIES, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(response.ok) {
                return response.json()
            } else {
                setSpecies([])
                return
            }
        }).then((data) => {
            let speciesTemp = []
            data.map((specie) => {
                speciesTemp.push({
                    id: specie.id,
                    title: specie.name,
                    description: "description de " + specie.name
                })
            })
            setSpecies(speciesTemp)
            setSpeciesSearched(speciesTemp)
        })
    }

    const getRelatedDatasets = () => {
        if(selectedSpecie == null) { return }
        fetch(`http://localhost:8000/api/species/${selectedSpecie}/datasets`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(response.ok) {
                return response.json()
            } else {
                return []
            }
        }).then((data) => {
            let datasetsTemp = []
            data.map((dataset, id) => {
                datasetsTemp.push({
                    id: id,
                    title: dataset.name,
                    description: "description de " + dataset.name
                })
            })
            setDatasets(datasetsTemp)
        })
    } 

    const getRelatedStages = () => {
        if(selectedDataset == null) { return }
        fetch(`http://localhost:8000/api/datasets/${selectedDataset}/stages`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(response.ok) {
                return response.json()
            } else {
                return []
            }
        }).then((data) => {
            let stagesTemp = []
            data.map((stage, id) => {
                stagesTemp.push({
                    id: stage.id,
                    title: stage.name,
                    description: "description de " + stage.name
                })
            })
            setStages(stagesTemp)
        })
    }

    const postExplorationRequest = () => {
        if(selectedDataset == null || selectedSpecie == null) { return }
        fetch("http://localhost:8000/api/visualize/explore", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(response.ok) {
                return response.json()
            } else {
                return []
            }
        }).then((data) => {
            window.open(`http://127.0.0.1:5005/view/${data.h5ad_file}`, "_blank");
        })
    }


    /***************** Launch Visualization ************************************* /
     * 
     * Allow to launch the vizualisation process, allowing to set up cellxgene 
     * gateway and create the h5ad file corresponding to the user query
     * 
     */
    const launchVisualization = () => {
        postExplorationRequest()
    }


    /****************** Rendering ******************** /
     * 
     * ??? Single Layer Rendering ???
     * 
     * Show the user table to select the specie, 
     * the dataset and the cell stages, the user wants 
     * to inversigate in. 
     * 
     */
    return(
        <div className="my-6">

            <Helmet>
                <html lang="en" />
                <meta description="Explore a single cell rna dataset from Aniseed using a visual tool" />
                <title>RNAniseed - Exploration of single cell RNA data</title>
            </Helmet>

            <div className="flex justify-start gap-4 items-center">
                <h2 className="text-slate-900 font-semibold text-xl">Single cell Exploration</h2>
                <span className="text-slate-400 text-sm italic">(exploration of 1 dataset)</span>
            </div>

            <div className="my-6">
                <h2 className="text-lg text-slate-800 font-semibold">Select a specie</h2>
                <p className="my-2 text-slate-700 text-sm md:text-md leading-5">
                    Indicate the specie you want to investigate on. Some species have no dataset 
                    available yet
                </p>
            </div>

            <div className='my-4'>
                <SearchInput 
                    name={"search-specie-input"}
                    onChangeQuery={filterSpecies}
                    placeholder={"Search for a specie"}
                />
            </div>

            <DynamicList 
                items={speciesSearched}
                selectedItemIds={[selectedSpecie]}
                changeSelectedItems={selectSpecie}
                notFoundMsg={"No specie found"}
                maxItemSelection={1}
            />

            <div className="my-6">
                <h2 className="text-lg text-slate-800 font-semibold">Select a dataset</h2>
                <p className="my-2 text-slate-700 text-sm md:text-md leading-5">
                    Indicate the single cell RNA seq dataset you want to explore 
                </p>
            </div>

            <DynamicList 
                items={datasets}
                selectedItemIds={[selectedDataset]}
                changeSelectedItems={selectDataset}
                notFoundMsg={"No dataset found"}
                maxItemSelection={1}
            />

            <div className="my-6">
                <h2 className="text-lg text-slate-800 font-semibold">Select development stages</h2>
                <p className="my-2 text-slate-700 text-sm md:text-md leading-5">
                    Select as many development stages as you want to explore visually
                </p>
            </div>

            <DynamicList 
                items={stages}
                selectedItemIds={selectedStages.map((stage) => stage.id)}
                changeSelectedItems={selectStages}
                notFoundMsg={"No labeled stage found in the dataset"}
                maxItemSelection={-1}
            />

            <div className="my-2">
                <p className="my-6 text-slate-700 text-sm md:text-md leading-5">
                    Launching the visualization takes a few seconds. When the data is ready 
                    for visualization, you will automatically be redirected on an other page 
                    where you will be able to explore your data
                </p>
                <div className='flex justify-center'>
                    <button 
                        className={`
                            px-6 py-2 
                            ${selectedSpecie != null && selectedDataset != null ? 'bg-green-500' : 'bg-slate-400'} 
                            text-white rounded-md
                        `}
                        onClick={() => { onLaunchWaiting(); launchVisualization() }}
                    >
                        Launch visualization
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ExplorationLayer