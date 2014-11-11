library(RPostgreSQL)
driver = dbDriver("PostgreSQL")
con <- dbConnect(driver, host='localhost', port='5432', dbname='testDatabase',
                 user='drupal', password='fortex2.')



a = dbListConnections(driver)
print(a)
b = dbGetInfo(driver)
print(b)
c = summary(conn)
print(c)

rs <- dbListTables(con)
print(rs)
#query = "select * from tags where id=1;"

#rs = dbSendQuery(conn,query)



dbDisconnect(conn)
dbUnloadDriver(driver)
