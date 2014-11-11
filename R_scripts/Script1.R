
#Pakiet ten szybciej wczytuje dane
library(ff)
library(parallel)
#data = read.csv2.ffdf(file="data.csv")

data = read.csv2.ffdf(file="data.csv")


replaceString = function(string){
      tempString = strsplit(string, " ")
      string = c(tempString[[1]])
      return(string)
}

correctData = as.character(data[,1])
listWords = lapply(correctData,replaceString)
answer = unlist(listWords)

print(length(answer))
print(length(unique(answer)))