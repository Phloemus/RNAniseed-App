
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

            <div className='mx-auto max-w-screen-lg'>

                <div className="mx-4 my-8">

                    <div className="my-8">

                        <h2 className="text-2xl text-slate-900 font-bold">Amélioration de l'application de RNAniseed</h2>

                        <div className="my-4 flex justify-between">
                            <div className="flex gap-4">
                                <div className="h-6 w-6 rounded-full bg-slate-200"></div>
                                <span>Brieuc Quemeneur</span>
                            </div>
                            <span>26 mai 2023</span>
                        </div>

                        <div className="my-4 w-full h-48 bg-slate-100 rounded-md shadow-sm"></div>

                        <div className="my-5">
                            <p className="my-2 text-slate-700 text-sm md:text-md leading-5">
                                The Exploration tool of RNAniseed has been finished
                            </p>

                            <p className="my-2 text-slate-700 text-sm md:text-md leading-5">
                                it's now possible to 
                                indicate a specie, a dataset and a set of development stages to launch 
                                an exploration using the visual tool.
                            </p>

                            <p className="my-2 text-slate-700 text-sm md:text-md leading-5">
                                A documentation is being prepared to guid new users, but it using the app 
                                is easy enough. 
                            </p>
                        </div>

                        <div className="w-full my-4 flex gap-4">
                            <div className="h-12 w-12 flex-none bg-slate-100 rounded-sm"></div>
                            <div className="p-2 bg-slate-100 rounded-sm">
                                <h3 className="text-md text-slate-900 font-semibold">Fonctionnalité d'exploration</h3>
                                <p className="my-1 text-slate-800 text-sm md:text-md leading-5">
                                    Explorer les données visuellement est maintenant possible
                                </p>
                            </div>
                        </div>

                        <button className="py-2 w-full flex justify-center text-white bg-green-500 rounded-md">
                            Lire la suite
                        </button>

                    </div>

                    <section>

                        <div className="my-4 flex w-full gap-4">
                            <div className="h-20 w-20 bg-slate-100 flex-none rounded-md"></div>
                            <div>
                                <div className="flex justify-between gap-4 items-center">
                                    <h3 className="text-md text-slate-900 font-medium">Nouveauté</h3>
                                    <span className="text-sm text-slate-800">12 mai 2023</span>
                                </div>
                                <div>
                                    <p className="my-2 text-slate-700 text-sm md:text-md leading-5">
                                        Il est maintenant possible d'ajouter une espèce dans la base de 
                                        données...
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="my-4 flex w-full gap-4">
                            <div className="h-20 w-20 bg-slate-100 flex-none rounded-md"></div>
                            <div>
                                <div className="flex justify-between gap-4 items-center">
                                    <h3 className="text-md text-slate-900 font-medium">Nouveauté</h3>
                                    <span className="text-sm text-slate-800">12 mai 2023</span>
                                </div>
                                <div>
                                    <p className="my-2 text-slate-700 text-sm md:text-md leading-5">
                                        Il est maintenant possible d'ajouter une espèce dans la base de 
                                        données...
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="my-4 flex w-full gap-4">
                            <div className="h-20 w-20 bg-slate-100 flex-none rounded-md"></div>
                            <div>
                                <div className="flex justify-between gap-4 items-center">
                                    <h3 className="text-md text-slate-900 font-medium">Nouveauté</h3>
                                    <span className="text-sm text-slate-800">12 mai 2023</span>
                                </div>
                                <div>
                                    <p className="my-2 text-slate-700 text-sm md:text-md leading-5">
                                        Il est maintenant possible d'ajouter une espèce dans la base de 
                                        données...
                                    </p>
                                </div>
                            </div>
                        </div>

                    </section>

                </div>

            </div>


        {/*

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

        */}
            


        </div>
    )
}

export default LandingPage