import scipy.io as sio
import numpy as np
import csv

#####! work on this !
def findUniqueGeneIdFromNeuveux():
    matchingList = []
    with open('../ressources/Gene_Matchs_aniseed_neuveu.txt', 'r') as file:
        count = 0
        for line in file:
            print(line)
            if line[0] == '\t':
                ## case no aniseed gene equivalent
                print('no aniseed equivalent')
            else:
                if line.count('ENA') > 0:
                    ## case in which at least a neuveu id is matched with an aniseed id
                    aniseedIdentifiers = line.split("\t")[0].split(", ")
                    neveuxIdentifiers = line.split("\t")[1].split(", ")

                    if len(aniseedIdentifiers) == 1 and len(neveuxIdentifiers) == 1:
                        count += 1
        print(count)
#####! Doesnt work yet ###### 


        
        
        



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

## Create and write the sql file allowing to fill the gene ontologie tables
## in the database rather go_biological_process or go_molecular_function
## @params termList [list]          :    List of the GO terms to store in the database
## @params goNamespace [string]     :    name of the main class from gene ontology in which
##                                       all the terms treated belong to. The namespace 
##                                       correspond to a name of a table in the database
## @params schemaName [string]      :    Name of the schema of the database to use 'public'
##                                       is the default schemaName value
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


def createGeneFillQueries(schemaName = 'public'):
    matdata = sio.loadmat('../ressources/Neuveu_data.mat')
    out = open("fill_gene_table.sql", "w")
    with alive_bar(len(matdata['genename'])) as bar:
        for geneId in range(0, len(matdata['genename'])):
            allCaracteristics = str(matdata['genename'][geneId][0][0]).replace("'", "")

            isCharacterized = 0
            if allCaracteristics.find("uncharacterized") == -1:
                isCharacterized = 1

            allCaracteristics = allCaracteristics.split(" ")

            enaId = allCaracteristics[0]
            organism = str(allCaracteristics[1] + ' ' + allCaracteristics[2])
            geneName = (allCaracteristics[len(allCaracteristics)-2]).replace("(", "")

            
            
            out.write(f"INSERT INTO {schemaName}.gene (unique_gene_id, aniseed_id, ena_id, is_characterized) VALUES ('{}', '{}', '{enaId}', '{isCharacterized}');\n")
            bar()
    out.close()

termsList = extractTermsFromObo('../ressources/GOSlimComputed_02_2017.obo')
createFillGoSqlQuery(termsList, "biological_process")
createFillGoSqlQuery(termsList, "molecular_function")

