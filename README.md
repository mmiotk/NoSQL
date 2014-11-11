# Praca nosql
Mateusz Miotk  
08.11.2014  

```
Sprzęt: 
Laptop ACER ASPIRE ONE 5820TG
Procesor: Intel core I5-430M
Ilość pamięci RAM: 4 GB
Dysk twardy: SSD SanDisk 128 GB
System Operacyjny: Linux Mint 17 x64
Wersja MongoDB: 2.6.5
Wersja PostgreSQL: 9.3.5
```

#### Wstęp: Przetworzenie danych Train.csv

1. Do rozpakowania pliku Train.zip użyłem programu **pigz**, który rozpakowuje plik wykorzystując wszystkie rdzenie procesora.

2. Ponieważ plik Train.csv nie jest typowym plikiem .csv, gdyż rekordy nie są przechowywane w jednej linii, musimy pozbyć się znaków nowej linii. Ponadto, ponieważ jest to plik w systemie DOS, to musimy zastąpić znaki powrotu karetki na znaki nowej linii. Dokonujemy to poleceniem: 

```
tr -d "\n" < input_file | tr "\r" "\n" > output_file
```

Powyższe polecenie wykorzystuje wyłącznie dwa rdzenie procesora.

3. Ponieważ plik Train.csv zawiera unikatowe pole id, to aby nie powielać tych danych w bazie usuniemy ją z pliku. 

Czasy wykonania etapów przedstawiłem w poniższej tabelce:

|Etap|Czas wykonania|
|-----|-------------|
|Rozpakowanie pliku| 5 m |
|Zamiana formatu danych| 5 m|

### Zadanie 1a: Zaimportuj bazę danych do PostgresSQL oraz MongoDB.

Do zaimportowania danych w postgreSQL użyłem polecenia: 

```
COPY from <nazwa_tabeli> 'sciezka_do_pliku' 
```
Zaś do zaimportowania danych do MongoDB polecenia 

```
mongoimport -d <database> -c <collection> --type csv --file <file_name> --headerline --drop --stopOnError
```

Wyniki zaimportowanych danych są przedstawione w następującej tabeli: 



```
                           Postgres       MongoDB       
Importowanie danych        6.10 m         6.42 m        
Średnia danych w sekundach 16487 rekordów 15665 rekordów
```


Wykres dla PostgresSQL

![obrazek](pictures/POSTGRES.png)

Wykres dla MongoDB

![obrazek2](pictures/MONGO.png)

##### Wnioski:

- Większe wykorzystanie procesora możemy zaobserwować podczas importowania danych w MongoDB.

- Szybkie czasy spowodowane są użyciem dyskiem SSD.

- Wyłączenie wypisywania potwierdzenia dodania rekordów do bazy 
MongoDB nie zmieniło czasu importowania danych.

### Zadanie 1b: Zliczenie wszystkich rekordów z bazy.

W obu przypadkach otrzymałem poprawną odpowiedź czyli 6034195.
Ponadto zmierzyłem czasy zapytań w obu przypadkach.
Wyniki prezentuje poniższa tabelka: 

|Rodzaj zapytania |Czas wykonania w PostgreSQL |Czas wykonania w MongoDB | 
|-----------------|----------------------------|-------------------------|
|Zliczenie rekordów(count) |19.97 s | 0 s | 
|Wyszukanie rekordu o danym id (select) | 19.85 s| 46.4 s |

#### Wnioski: 

- MongoDB świetnie i szybko sobie radzi z obliczeniami na bazie danych, używając funkcji agregujących.
- Jeżeli chodzi o wyszukanie rekordu w którym musimy przejrzeć całą bazę to PostgreSQL lepiej poradził sobie z tym zadaniem.

### Zadanie 1c: Zamiana formatu danych

Przed wykonaniem tego zadania, wiedząc że nie będę wogóle korzystał z kolumn o nazwach: "Title","Body" postanowiłem usunąć je z pliku Train.csv.

Można to zrobić przy pomocy prostego narzędzia: cut.
Jednak ja wykorzystałem polecenie. 

```
mongoexport -d test -c database --csv -f "Tags" -o export.csv

```
Okazało się, że mongoexport jest jednowątkowy a jego czas wynosi w naszej bazie 4m 55s.

#### Przypadek 1: Zamiana formatu danych bez użycia baz danych

W tym przypadku użyjemy pakietu R.
W pierwszym przypadku załadowaliśmy plik z danymi do R i jednowątkowo go obrobiliśmy.
W drugim przypadku robimy to samo ale z użyciem wątków.
Wykonują to skrypty: Script1.R oraz Script2.R

#### Przypadek 2: Zamiana formatu danych przy użyciu MongoDB i sterownika

Użyłem tutaj pakietu R oraz paczki rmongodb.
Jednak że przekształcenie w tym przypadku jest jednowątkowe.
Wykonuje to skrypt: Script3.R

#### Przypadek 3: Zamiana formatu danych przy użyciu konsoli MongoDB

Tutaj zastosowałem przypadek pojedyńczego wrzucania elementu oraz wrzucania naraz 10000 danych.
Wykonuje to program: mongoOne.js oraz mongoMany.js

#### Przypadek 4: Zamiana formatu danych przy użyciu PostgreSQL i sterownika

W tym przypadku nie udało mi się połączyć R z postgreSQL.
Jednak procedura była by podobna jak w przypadku 2.

Czasy z każdego z przypadków przedstawiłem w poniższej tabelce: 

|Nazwa przypadku |Czas wykonania|
|----------------|--------------|
|Przypadek 1| 1 wątkowo: 4m 51s ; 4 wątkowo: 4m 38s|
|Przypadek 2| 67m 4s|
|Przypadek 3| Pojedyńczy insert: 71m 52s; Paczka insertów: 10m 43s  |
|Przypadek 4| Czas zbliżony do przypadku 2 |
