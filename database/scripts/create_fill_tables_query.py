import scipy.io as sio
import numpy as np

## Loading the neuveu data containing all the expression level with the genes identity
matdata = sio.loadmat('../ressources/Neuveu_data.mat')

for i in matdata['genename']:
    allCaracteristics = str(i[0][0]).replace("'", "")
    allCaracteristics = allCaracteristics.split(" ") 
    allGeneNames = allCaracteristics[0]

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