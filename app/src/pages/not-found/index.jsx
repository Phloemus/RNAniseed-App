
import { Helmet } from "react-helmet"

import Navbar from "../../components/navbar"

const NotFound = () => {
    return(
        <div>

            <Helmet>
                <html lang="en" />
                <meta description="404 - Page not found" />
                <title>404 - Page not found</title>
            </Helmet>

            <Navbar />

            <h1>Error 404 - Page not found</h1>

        </div>
    )
}

export default NotFound