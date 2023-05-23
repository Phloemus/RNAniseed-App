
import { Helmet } from "react-helmet"

import Navbar from "../../components/navbar"


const LandingPage = () => {
    return(
        <div>

            <Helmet>
                <html lang="en" />
                <meta description="RNAniseed is an extension of the Aniseed database allowing to visualize single RNA cell data uploaded by the ascidian community" />
                <title>RNAniseed - The visual database for single cell datasets</title>
            </Helmet>

            <Navbar />

            <h1>Landing page</h1>

        </div>
    )
}

export default LandingPage