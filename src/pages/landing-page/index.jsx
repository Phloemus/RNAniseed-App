
import { Helmet } from "react-helmet"

/*********************** Common component imports ***************************************************** */
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

            <main className="my-10 mx-4">

                <section className="my-8">

                    <h1 className="text-2xl text-slate-900 font-bold">A simple way to explore and visualize your data</h1>

                    <p className="my-6 text-slate-700 text-sm md:text-md leading-5">
                        RNAniseed is a great tool to visualize and explore single cell RNA seq data without 
                        having a informatic background at all.
                    </p>

                    <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:shadow-md">
                        Start exploring 
                    </button>

                </section>

                <section className="my-6">

                    <h2 className="text-lg text-slate-800 font-semibold">Simply focus on biology</h2>

                    <p className="my-4 text-slate-700 text-sm md:text-md leading-5">
                        The visualization tool is easy to use for any biologist, you don't 
                        need any prior experience in informatics.
                    </p>

                    <p className="my-2 text-slate-700 text-sm md:text-md leading-5">
                        RNAniseed let you focus on biology
                    </p>
                    
                </section>

                <section className="my-6">

                    <h2 className="text-lg text-slate-800 font-semibold">Powered up by Aniseed DB</h2>

                    <p className="my-4 text-slate-700 text-sm md:text-md leading-5">
                        RNAniseed uses the Aniseed Datbase in the background to ensure the best 
                        data quality and a maximum flexibility for your single cell exploration
                    </p>

                </section>

                

            </main>
            


        </div>
    )
}

export default LandingPage