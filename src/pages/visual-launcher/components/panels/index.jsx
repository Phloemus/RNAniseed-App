
import React from 'react'

/************* icon imports *************************************************************************** */
import { RxCross1 } from 'react-icons/rx'


export const WaitingPanel = ({show, onQuit}) => {

    /************* States ********************* /
     * 
     * 
     */
    const [loadingPercentage, setLoadingPercentage] = React.useState(0);


    /************************* Effects ********************* /
     * 
     * Allow to increase the percentage of the loading bar 
     * when the visualisation of the data is launching in 
     * the background
     * 
     */
    React.useEffect(() => {
        if(loadingPercentage < 100 && show == true) {
            setTimeout(() => setLoadingPercentage((prev) => prev + 6), 1000)
        }
    }, [loadingPercentage, show])


    /************ State Modifier function ********************************
     * 
     * @stateModifier quitPanel : Allow to quit the panel and reset the 
     *                            loading percentage to 0
     * 
     */
    const quitPanel = () => {
        setLoadingPercentage(0)
        onQuit()
    }


    return(
        <div className={`
            w-screen h-full
            bg-opacity-40 bg-slate-800
            fixed
            ${show ? 'block' : 'hidden'}
            z-10
        `}>

            <div className='p-4 mx-4 lg:mx-auto my-12 lg:my-16 bg-white max-w-screen-lg rounded-md drop-shadow-md'>

                <div className="flex justify-between items-center">
                    <h2>Waiting for the visualization...</h2>
                    <div
                        className='p-1 cursor-pointer hover:bg-slate-100 hover:shadow-md rounded-full'
                        onClick={quitPanel}
                    >
                        <RxCross1 />
                    </div>
                </div>

                <div className='my-3'>
                    <p className='text-slate-700 text-sm'>
                        The visualization of the selected data is starting. The process can 
                        take up to <b>30 seconds</b>
                    </p>
                </div>

                <div className='h-56 sm:h-72 lg:h-96 w-full bg-slate-800 rounded-md'></div>

                <div className='my-2'>
                    <div className='w-full bg-slate-200 rounded-full'>
                        <div 
                            className='p-1 w-full bg-sky-500 rounded-full ease-linear'
                            style={{width: `${loadingPercentage}%`, transition: 'width 1s'}}
                        ></div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-slate-700 text-sm'>loading...</p>
                        <span className='text-slate-700 text-sm'>{ loadingPercentage } %</span>
                    </div>
                </div>

                <div className='my-4'>
                    <p className='text-slate-700 text-sm'>
                        You will be redirected when the visualization tool and the data will 
                        be ready
                    </p>
                </div>

                <div className='flex justify-start'>
                    <button 
                        className='py-1 px-4 bg-red-500 text-white text-md rounded-md hover:shadow-md'
                        onClick={quitPanel}
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    )
}