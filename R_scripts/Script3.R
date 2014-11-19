library(rmongodb)

mongo <- mongo.create()

if(mongo.is.connected(mongo)){
      mongo.get.databases(mongo)
      coll = mongo.get.database.collections(mongo,"test")
      
      testData = mongo.find(mongo,"test.database")
      
      
      
      while(mongo.cursor.next(testData) ){
            tmp = mongo.bson.to.list(mongo.cursor.value(testData))
           
      
      l = tmp$Tags
    
      if(class(l) != "array" && is.numeric(l) != TRUE ){
            
            l = strsplit(l," ")
            l = l[[1]]
            if(length(l) > 1){
                  l = as.array(l)
                  buf = mongo.bson.buffer.create()
                  mongo.bson.buffer.append(buf,"_id",tmp[[1]])
                  mongo.bson.buffer.append(buf,"Tags",l)
                  objNew = mongo.bson.from.buffer(buf)
                  mongo.update(mongo,"test.database",mongo.cursor.value(testData),objNew,mongo.update.upsert)   
            }
            
      }
      }
     mongo.destroy(mongo)
}

