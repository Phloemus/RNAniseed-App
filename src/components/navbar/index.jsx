

import { Link } from 'react-router-dom'


const Navbar = () => {
    return(
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
    )
}

export default Navbar;