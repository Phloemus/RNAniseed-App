
import { Helmet } from "react-helmet"

import Navbar from "../../components/navbar"

const Uploader = () => {
    return(
        <div>

            <Helmet>
                <html lang="en" />
                <meta description="Upload a single cell RNA dataset in the Aniseed database" />
                <title>RNAniseed - Upload a single cell RNA dataset</title>
            </Helmet>

            <Navbar />

            <h1>Uploader</h1>

        </div>
    )
}

export default Uploader