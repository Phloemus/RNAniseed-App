
import React from 'react'

import { Link } from 'react-router-dom'
import { MdOutlineCancel } from 'react-icons/md'


const Navbar = () => {

    const [isBannerVisible, setIsBannerVisible] = React.useState(true)


    return(
        <div>

            {
                isBannerVisible ? (
                    <div>
                        <div className='hidden sm:flex py-2 bg-green-500 text-white justify-center gap-4'>
                            <span className='font-semibold'>
                                How to use RNAniseed ?
                            </span>
                            <div className='flex gap-1 items-center'>
                                    <span>
                                        check out the 
                                    </span>
                                    <a 
                                        className='hover:underline'
                                        href='https://github.com/Phloemus/RNAniseed-App/blob/master/README.md'
                                        target="_blank"
                                    >
                                        documentation
                                    </a>
                            </div>
                        </div>
                        <div className='absolute top-2 right-4 h-6 w-6'>
                            <button
                                onClick={() => setIsBannerVisible(false)}
                            >
                                <MdOutlineCancel 
                                    size={24}
                                    color='white'
                                />
                            </button>
                        </div>
                    </div>
                ) : (<div></div>)
            }
            
            <nav className="py-2 px-2 lg:px-6 w-full bg-white flex justify-between border-b border-slate-100 items-center sticky top-0 z-2">
                <div>
                    <h1 className="text-slate-900 text-md font-bold"><Link to="/">RNAniseed</Link></h1>
                </div>
                <div className="flex gap-4 lg:gap-8 items-center">
                    <ul className="hidden sm:flex gap-2 lg:gap-4 text-slate-700 text-sm items-center">
                        <li className="hover:underline"><Link to="/upload">Upload</Link></li>
                        <li className="hover:underline"><Link to="/explore">Explore</Link></li>
                        <li className="hover:underline"><Link to="/compare">Compare</Link></li>
                    </ul>
                    <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:shadow-md">Connection</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;