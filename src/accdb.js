var db=openDatabase('Accountdb','1.0','db for p2p accounting app', 2 * 1024 * 1024);

function initTables(){
db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS chartOfAccount (id INTEGER PRIMARY KEY, accountCode UNIQE VARCHAR, accountName VARCHAR, accountType VARCHAR, isHeader BOOLEAN DEFAULT FALSE, headerAccountCode VARCHAR,  headerAccountName VARCHAR, balance NUMBER, createdBy VARCHAR, createdOn DATE)'); 
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS journalDefination (id INTEGER PRIMARY KEY, approvedBy VARCHAR, approvedOn DATE, autoGenerated BOOLEAN DEFAULT FALSE, canAddMoreItems BOOLEAN DEFAULT FALSE, canRemoveMoreItems BOOLEAN DEFAULT FALSE, createdBy VARCHAR, createdOn DATE, dateOfMonth VARCHAR, journalDescription VARCHAR, remark VARCHAR, transactionDate DATE, transactionRef VARCHAR)'); 

    tx.executeSql('CREATE TABLE IF NOT EXISTS journalDefinationDeitail (id INTEGER PRIMARY KEY, journalDefination NUMBER, accountCode VARCHAR, amount NUMBER, canChangeAccountCode BOOLEAN DEFAULT FALSE, canChangeAmount BOOLEAN DEFAULT FALSE, canChangeIsCredited BOOLEAN DEFAULT FALSE, createdBy VARCHAR, createdOn DATE, compulsory BOOLEAN DEFAULT FALSE, isCredited BOOLEAN DEFAULT FALSE)'); 

  })
}

//  export function savechartofaccount(datatosave) {
    var savechartofaccount = function(datatosave){
    initTables()
    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO chartOfAccount(accountCode, accountName, accountType, isHeader, headerAccountCode,  headerAccountName, balance, createdBy, createdOn) VALUES (?,?,?,?,?,?,?,?,?)',[datatosave.accountCode, datatosave.accountName, datatosave.accountType, datatosave.isHeader, datatosave.headerAccount, datatosave.balance], function(tx, results) {
          return results
        });
      });
    }

    const editChartOfAccount = function(id, datatoedit){
        db.transaction(function (tx) {
            tx.executeSql('update chartOfAccount set accountCode =?, accountName =?, accountType =?, isHeader =?, headerAccountCode =?,  headerAccountName =?, balance =? where id=?', [datatoedit.accountCode, datatoedit.accountName, datatoedit.accountType, datatoedit.isHeader, datatoedit.headerAccountCode,  datatoedit.headerAccountName, datatoedit.balance, id]);
           });

           var result = [];
           db.transaction(function (tx) {
              tx.executeSql(`Select * from chartOfAccount where id = ${id}`, [], function(tx, rs){
                 for(var i=0; i<rs.rows.length; i++) {
                    var row = rs.rows.item(i)
                    result[i] = { id: row['id'],
                                  name: row['name']
                    }
                 }
                 console.log(result);
                 return(result); // <-- new bit here
              }, errorHandler);
           });
    }

    function errorHandler(tx, e){
        return(`Somthing went wrong, ${e.message}`)
    }


    const getallchartofaccount = function(){
        var result = [];
        db.transaction(function (tx) {
           tx.executeSql(`Select * from chartOfAccount`, [], function(tx, rs){
              for(var i=0; i<rs.rows.length; i++) {
                 var row = rs.rows.item(i)
                 result[i] = { id: row['id'],
                               name: row['name']
                 }
              }
              console.log(result);
              return(result); // <-- new bit here
           }, errorHandler);
        });
    }

    const getchatofaccountbyId = function(id){
        var result = [];
        db.transaction(function (tx) {
           tx.executeSql(`Select * from chartOfAccount where id = ${id}`, [], function(tx, rs){
              for(var i=0; i<rs.rows.length; i++) {
                 var row = rs.rows.item(i)
                 result[i] = { id: row['id'],
                               name: row['name']
                 }
              }
              console.log(result);
              return(result); // <-- new bit here
           }, errorHandler);
        });
    }

  const dbData = {
    savechartofaccount, 
    editChartOfAccount,
    getallchartofaccount,
    getchatofaccountbyId
  }
  export default dbData;