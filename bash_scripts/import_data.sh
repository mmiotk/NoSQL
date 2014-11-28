#!/bin/bash

if [ $# == 3 ]
then
  database=$1
  collection=$2
    filename=$3
    if [ -e $3 ]
      then
      echo "Wrzucam plik $1 do bazy"
      mongoimport -d $1 -c $2 --type csv --file $3 --headerline --drop --quiet --stopOnError
      else
      echo "Nie ma pliku o nazwie $1"
      exit 1
    fi
else
  echo "Zbyt wiele parametrow lub nie podałeś żadnego parametru koncze"
  echo "Poprawne wywołanie: ./import_data.bash <nazwa_bazy> <nazwa_kolekcji> <plik>"
  exit 1
fi
