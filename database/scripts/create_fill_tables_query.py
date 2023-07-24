import scipy.io as sio
import numpy as np
import csv
from alive_progress import alive_bar

class QueryBuilder:


    def __init__(self):
        self.neuveuData = sio.loadmat('../ressources/Neuveu_data.mat')
        self.geneList = []
        self.modelList = []
        self.matchingList = []


    ##### Private functions (utility) #############################################################
    ##
    ## Only functions used as utility by other functions within this class. Usually performing 
    ## specific tasks repeted a lot in this class
    ##
    ###############################################################################################


    ##### setMatchingList ############################################################
    ##
    ## Allow to create the matching list between the genes and the models by using 
    ## a pre processed file that maps them. A gene can have many models and vice 
    ## versa, then a list of matchs is built with a match following this structure
    ##
    ## match => {"genes": [], "models": []}
    ##
    ## This list of matchs is given to the entire class through the matchingList
    ## attribute
    ##
    def __setMatchingList():
        with open('../ressources/Gene_Matchs_aniseed_neuveu.txt', 'r') as file:
            for line in file:
                ## case no model found for the gene
                if line[0] == '\t': 
                    self.matchingList.append({
                        "genes": [line.split("\t")[1].split("\n")[0]],
                        "models": []
                    })
                ## case in which at least a neuveu id is matched with a model
                elif line.count("\t") != 0:
                    modelsIdentifiers = line.split("\t")[0].split(", ")
                    geneNeuveuIdentifiers = line.split("\t")[1].split(", ")

                    geneModelMatchDico = {
                        "genes": [],
                        "models": []
                    }

                    for geneId in geneNeuveuIdentifiers:
                        geneNeuveuIdentifiers = list(set(geneNeuveuIdentifiers))
                        if geneId != "\n": ## make sure there is a gene available and not just the '\n'
                            geneModelMatchDico["genes"].append(geneId.split("\n")[0]) ## remove annoying '\n' from the end of the last gene found

                    for modelId in modelsIdentifiers:
                        modelsIdentifiers = list(set(modelsIdentifiers))
                        geneModelMatchDico["models"].append(modelId)

                    self.matchingList.append(geneModelMatchDico)


    ##### setGeneList ################################################################
    ##
    ## Allow to create the list of the genes that have at least a model present in
    ## the matching list. This gene list represent the genes that will be inserted
    ## in the database. Meaning that a gene having no model will not be added to 
    ## the database whatever its expression level.
    ##
    ## This list of genes is given to the entire class through the geneList attribute
    ##
    def __setGeneList():
        for match in self.matchingList:
            for geneId in match["genes"]:
                self.geneList.append(geneId)


    ##### setModelList ###############################################################
    ##
    ## Allow to create the list of the models that are at least associated to a 
    ## gene
    ##
    ## This list of models is given to the entire class through the modelList attribute
    ##
    def __setModelList():
        for match in self.matchingList:
            for modelId in match["models"]:
                self.geneList.append(modelId)









## ?? private function ?? ###
## Check if the models present in the file linking the genes with the models are unique or not
## the models need to have unique names !
def areModelIdsUnique():
    with open('../ressources/Gene_Matchs_aniseed_neuveu.txt', 'r') as file:
        modelList = []
        for line in file:
            if line[0] != '\t' and line.count("\t") != 0:
                modelsIdentifiers = line.split("\t")[0].split(", ")
                for modelId in modelsIdentifiers:
                    modelList.append(modelId)
    return len(modelList) != len(set(modelList))

## ?? private function ?? ##
## Check if the ena id has corresponding gene models. If no model is found return false
## @returns [list|False] 
def getModelsFromEna(enaId, matchingList):
    for match in matchingList:
        for gene in match["genes"]:
            if gene == enaId:
                return match["models"]
    return False


### ?? public function ?? ##
## from the matchingList, the function creates a file containing the sql query allowing to fill the 
## model table 
## duplication might occur here, prevent this from possibly happening here
def createFillModelTableSql(schemaName = 'public'):
    matchingList = createLinkGeneWithModel()
    with open(f"fill_model.sql", "w") as sql_file:
        for match in matchingList:
            for modelName in match["models"]:
                insert_query = f"INSERT INTO {schemaName}.model (unique_model_id, pos_start, pos_end, strand, annotation) " \
                           f"VALUES ('{modelName}', 0, 0, 0, 'placeholder annotation');\n"
                sql_file.write(insert_query)

## ?? public function ?? ##
## Fill the gene table with only the genes that have at least one gene model 
def createFillGeneTableSql(schemaName = 'public'):
    matchingList = createLinkGeneWithModel()
    matdata = sio.loadmat('../ressources/Neuveu_data.mat')
    fullGeneList = []
    for geneId in range(0, len(matdata['genename'])):
        allCaracteristics = str(matdata['genename'][geneId][0][0]).replace("'", "")

        isCharacterized = 0
        if allCaracteristics.find("uncharacterized") == -1:
            isCharacterized = 1

        allCaracteristics = allCaracteristics.split(" ")
        enaId = allCaracteristics[0]

        gene = {"enaId": enaId, "isCharacterized": isCharacterized}
        fullGeneList.append(gene)

    countGeneWithModel = 0
    countGeneWithNoModel = 0
    with open(f"fill_gene.sql", "w") as fill_gene_sql_file:
        with alive_bar(len(fullGeneList)) as bar:
            for gene in fullGeneList:
                associatedGeneModels = getModelsFromEna(gene["enaId"], matchingList)
                if associatedGeneModels != False:
                    countGeneWithModel += 1
                    isCharacterized = gene['isCharacterized']
                    for modelName in associatedGeneModels:
                        #Phmamm.g00013188 ## Phmamm should be changed depending on the specie
                        uniqueSmallGeneId = modelName.split(".g")[1]
                        enaId = gene["enaId"]
                        uniqueGeneId = f"Phmamm.g000{uniqueSmallGeneId}"
                        insert_gene_query = f"INSERT INTO {schemaName}.gene (unique_gene_id, ena_id, is_characterized) " \
                                f"VALUES ('{uniqueGeneId}', '{enaId}', '{isCharacterized}');\n"
                        fill_gene_sql_file.write(insert_gene_query)
                else:
                    countGeneWithNoModel += 1
                bar()
    print(f"number of genes associated with at least one model: {countGeneWithModel}")
    print(f"number of genes having no model: {countGeneWithNoModel}")









## Create and write the sql file allowing to fill the gene ontologie tables
## in the database rather go_biological_process or go_molecular_function
## @params termList [list]          :    List of the GO terms to store in the database
## @params goNamespace [string]     :    name of the main class from gene ontology in which
##                                       all the terms treated belong to. The namespace 
##                                       correspond to a name of a table in the database
## @params schemaName [string]      :    Name of the schema of the database to use 'public'
##                                       is the default schemaName value
##
def createFillGoSqlQuery(termList, goNamespace, schemaName = 'public'):
    filtered_terms = [term for term in termList if term["namespace"] == goNamespace]
    with open(f"fill_go_{goNamespace}.sql", "w") as sql_file:
        for term in filtered_terms:
            go_id = term["id"]
            name = term["name"].replace("'", "''")
            name_space = term["namespace"]
            definition = term["def"].replace("'", "''")
            insert_query = f"INSERT INTO {schemaName}.go_{goNamespace} (go_id, name, definition) " \
                           f"VALUES ('{go_id}', '{name}', '{definition}');\n"
            sql_file.write(insert_query)


## Take the path of the go ontology as a parameter and produce a SQL file 
## containing the insertions queries needed to fill the go_biological_process table
def parseGoBiologicalProcessFromOntology():
    count = 0
    goTerms = []
    with open('../ressources/GOSlimComputed_02_2017.obo', 'r') as file:
        csvreader = csv.reader(file)
        for line in csvreader:
            if line.count("[Term]") == 1:
                goTerm = {
                    "id": "",
                    "name": "",
                    "namespace": "",
                    "definition": "" 
                }
                while True:
                    goCharacteristic = next(csvreader, None)
                    if goCharacteristic is None or goCharacteristic == "\n":
                        break
                    if goCharacteristic.count("id:") == 1:
                        goTerm["id"] = goCharacteristic.split(": ")[1]
                goTerms.append(goTerm)
                count += 1
    print(goTerms)
    print(str(count) + " GO terms found")
    
def extractTermsFromObo(file_path):
    terms = []
    term_attributes = {"id": "", "name": "", "namespace": "", "def": ""}

    with open(file_path, 'r') as file:
        current_term = None

        for line in file:
            line = line.strip()

            if line == "[Term]":
                if current_term is not None:
                    terms.append(current_term)

                current_term = term_attributes.copy()

            elif line and current_term is not None:
                if ': ' in line:
                    key, value = line.split(': ', 1)
                    if key in current_term:
                        current_term[key] = value

        # Append the last term (if any) after reaching the end of the file
        if current_term is not None:
            terms.append(current_term)

    return terms


## Create all the go terms needed (biological process and molecular function terms)
termsList = extractTermsFromObo('../ressources/GOSlimComputed_02_2017.obo')
createFillGoSqlQuery(termsList, "biological_process")
createFillGoSqlQuery(termsList, "molecular_function")

## 
createFillModelTableSql()
createFillGeneTableSql()


