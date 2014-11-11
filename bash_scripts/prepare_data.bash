#!/bin/bash

if [ $# == 2 ]
then 
	filename=$1
	fileOutput=$2
	if [ -e $1 ] 
	then
	echo "Przetwarzam plik $1"
	tr -d "\n" < "$1" | tr "\r" "\n" > "$2"
	else
	echo "Nie ma pliku o nazwie $1"
	exit 1
	fi
else
	echo "Zbyt wiele parametrow lub nie podałeś żadnego parametru koncze"
	exit 1
fi



