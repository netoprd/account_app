import { v4 as uuidv4 } from 'uuid';

var db = openDatabase('Accountdb', '1.0', 'db for p2p accounting app', 2 * 1024 * 1024);

function initTables() {
   db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS chartOfAccount (id INTEGER PRIMARY KEY, accountCode UNIQE VARCHAR, accountName VARCHAR, accountType VARCHAR, isHeader BOOLEAN DEFAULT FALSE, headerAccountCode VARCHAR,  headerAccountName VARCHAR, balance NUMBER, createdBy VARCHAR, createdOn DATE)');

      tx.executeSql('CREATE TABLE IF NOT EXISTS journalDefinition (id INTEGER PRIMARY KEY, journalguid VARCHAR, approvedBy VARCHAR, approvedOn VARCHAR, autoGenerated BOOLEAN DEFAULT FALSE, canAddMoreItems BOOLEAN DEFAULT FALSE, canRemoveMoreItems BOOLEAN DEFAULT FALSE, createdBy VARCHAR, createdOn DATE, dateOfMonth VARCHAR, journalDescription VARCHAR, remark VARCHAR, transactionDate DATE, transactionRef VARCHAR)');

      tx.executeSql('CREATE TABLE IF NOT EXISTS journalDefinitionDetails (id INTEGER PRIMARY KEY, journalDefinationId NUMBER, parentguid VARCHAR, accountCode VARCHAR, amount NUMBER, canChangeAccountCode BOOLEAN DEFAULT FALSE, canChangeAmount BOOLEAN DEFAULT FALSE, canChangeIsCredited BOOLEAN DEFAULT FALSE, compulsory BOOLEAN DEFAULT FALSE, isCredited BOOLEAN DEFAULT FALSE, sn VARCHAR)');

      tx.executeSql('CREATE TABLE IF NOT EXISTS journal(id INTEGER PRIMARY KEY, approvedBy BOOLEAN DEFAULT FALSE,  approvedOn VARCHAR, autoGenerated BOOLEAN DEFAULT FALSE, journalDescription VARCHAR, guid VARCHAR, journalDefinitionGuid VARCHAR, narration VARCHAR, transactionDate DATE, transactionRef VARCHAR)');

      tx.executeSql('CREATE TABLE IF NOT EXISTS journalDetails(id INTEGER PRIMARY KEY, journalid NUMBER,  accountCode VARCHAR, credit NUMBER, debit NUMBER, journalDefinitionId NUMBER, journalDefinitionParentguid VARCHAR, parentguid VARCHAR, sn VARCHAR, transactionNarration VARCHAR)');

   })
}

var savechartofaccount = function (datatosave, callback) {
   initTables()

   db.transaction(function (tx) {
      tx.executeSql(`Select * from chartOfAccount where accountCode =? and accountName =? and accountType =? and isHeader =? `, [datatosave.accountCode, datatosave.accountName, datatosave.accountType, datatosave.isHeader], function (tx, re) {
         if (re.rows.length > 0) {
            callback('duplicate')
         }
      }
      );
   });

   db.transaction(function (tx) {
      tx.executeSql('INSERT INTO chartOfAccount(accountCode, accountName, accountType, isHeader, headerAccountCode, headerAccountName, balance, createdBy, createdOn) VALUES (?,?,?,?,?,?,?,?,?)', [datatosave.accountCode, datatosave.accountName, datatosave.accountType, datatosave.isHeader, datatosave.headerAccountCode, datatosave.headerAccountName, datatosave.balance, datatosave.createdBy, datatosave.createdOn], function (tx, results) {
         console.log(results);
         callback('success')

      }, function (e, r) {
         callback('error:' + e.message)
      }
      );
   });
}

const editChartOfAccount = function (id, datatoedit, callback) {
   db.transaction(function (tx) {
      tx.executeSql('update chartOfAccount set accountCode =?, accountName =?, accountType =?, isHeader =?, headerAccountCode =?,  headerAccountName =?, balance =? where id=?', [datatoedit.accountCode, datatoedit.accountName, datatoedit.accountType, datatoedit.isHeader, datatoedit.headerAccountCode, datatoedit.headerAccountName, datatoedit.balance, id], function (tx, results) {
         console.log(results);
         callback('success')

      }, function (e, r) {
         callback('error:' + e.message)
      });
   });
}


const getallchartofaccount = function (callback) {
   var result = [];
   db.transaction(function (tx) {
      tx.executeSql(`Select * from chartOfAccount`, [], function (tx, results) {
         console.log("r", results.rows);
         callback(results.rows)
      }, function (e, r) {
         console.log({ e });
         callback('error:' + e.message)
      });
   });
}

const getallchartofaccountwithoutheader = function (callback) {
   var result = [];
   db.transaction(function (tx) {
      tx.executeSql('Select * from chartOfAccount where isHeader =?', [false], function (tx, results) {
         console.log("r", results.rows);
         callback(results.rows)
      }, function (e, r) {
         console.log({ e });
         callback('error:' + e.message)
      });
   });
}

const getallchartofaccountIsheader = function (callback) {
   var result = [];
   db.transaction(function (tx) {
      tx.executeSql("Select * from chartOfAccount where isHeader =?", [true], function (tx, results) {
         console.log("r", results.rows);
         callback(results.rows)
      }, function (e, r) {
         console.log({ e });
         callback('error:' + e.message)
      });
   });
}

const getchatofaccountbyId = function (id, callback) {

   db.transaction(function (tx) {
      tx.executeSql(`Select * from chartOfAccount where id = ${id}`, [], function (tx, results) {
         console.log("r", results.rows);
         callback(results.rows)
      }, function (e, r) {
         //   console.log({e});
         callback('error:' + e.message)
      }
      );
   });
}


const getchatofaccountbyIsHeaderandHeadacc = function (callback) {

   db.transaction(function (tx) {
      tx.executeSql("Select * from chartOfAccount where isHeader =? and headerAccountName =?", [true, ""], function (tx, results) {
         console.log("r", results.rows);
         callback(results.rows)
      }, function (e, r) {
         //   console.log({e});
         callback('error:' + r.message)
      }
      );
   });
}


const getchatofaccountbycode = function (accCode, callback) {

   db.transaction(function (tx) {
      tx.executeSql(`Select * from chartOfAccount where accountCode = ${accCode}`, [], function (tx, results) {
         console.log("r", results.rows);
         callback(results.rows)
      }, function (e, r) {
         //   console.log({e});
         callback('error:' + e.message)
      }
      );
   });
}


const savejournalDefinition = function (datatosave, callback) {
   initTables()   
   let parent;
   db.transaction(function (tx) {
      tx.executeSql('INSERT INTO journalDefinition(journalguid, approvedBy, approvedOn, autoGenerated, canAddMoreItems, canRemoveMoreItems, createdBy, createdOn, dateOfMonth, journalDescription, remark, transactionDate, transactionRef) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [datatosave.journalguid, datatosave.approvedBy, datatosave.approvedOn, datatosave.autoGenerated, datatosave.canAddMoreItems, datatosave.canRemoveMoreItems, datatosave.createdBy, datatosave.createdOn, datatosave.dateOfMonth, datatosave.journalDescription, datatosave.remark, datatosave.transactionDate, datatosave.transactionRef], function (tx, results) {
         console.log("r", results);
         parent = results.insertId
         callback('success')

      }, function (e, r) {
         console.log({ e });
         callback('error:' + e.message)
      });

      for (const item of datatosave.journalDefinitionDetails) {
         tx.executeSql('INSERT INTO journalDefinitionDetails(parentguid, journalDefinationId, accountCode, amount, canChangeAccountCode, canChangeAmount, canChangeIsCredited, compulsory, isCredited, sn) VALUES (?,?,?,?,?,?,?,?,?,?)', [item.parentguid, parent, item.accountCode, parseInt(item.amount), item.canChangeAccountCode, item.canChangeAmount, item.canChangeIsCredited, item.compulsory, item.isCredited, item.sn], function (tx, results) {
            console.log({ results });
            callback('success')
         }, function (e, r) {
            console.log({ e });
            callback('error:' + e.message)
         })
      }
   });
}

const editjournalDefinition = function (id, datatosave, callback) {
   db.transaction(function (tx) {
      tx.executeSql('update journalDefinition set journalguid =?, approvedBy =?, approvedOn =?, autoGenerated =?, canAddMoreItems =?, canRemoveMoreItems =?, createdBy =?, createdOn =?, dateOfMonth =?, journalDescription =?, remark =?, transactionDate =?, transactionRef =? where journalguid=?', [datatosave.journalguid, datatosave.approvedBy, datatosave.approvedOn, datatosave.autoGenerated, datatosave.canAddMoreItems, datatosave.canRemoveMoreItems, datatosave.createdBy, datatosave.createdOn, datatosave.dateOfMonth, datatosave.journalDescription, datatosave.remark, datatosave.transactionDate, datatosave.transactionRef, id], function (tx, results) {
         console.log(results);
         callback('success')

      }, function (e, r) {
         callback('error:' + e.message)
      });


      for (const item of datatosave.journalDefinitionDetails) {
         tx.executeSql('update journalDefinitionDetails set parentguid =?, journalDefinationId =?, accountCode =?, amount =?, canChangeAccountCode =?, canChangeAmount =?, canChangeIsCredited =?, compulsory =?, isCredited =?, sn =? where parentguid=?', [item.parentguid, item.journalDefinationId, item.accountCode, parseInt(item.amount), item.canChangeAccountCode, item.canChangeAmount, item.canChangeIsCredited, item.compulsory, item.isCredited, item.sn, id], function (tx, results) {
            console.log(results);
            callback('success')

         }, function (e, r) {
            callback('error:' + e.message)
         });
      }


   });
}

const getjuornaldiscriptionbyid = function (guid, callback) {
   let journalDefinition = {
     
      journalDefinitionDetails:[]
   }
  
   db.transaction(function (tx) {
      tx.executeSql('Select * ' + 'from journalDefinition j ' + 'INNER JOIN journalDefinitionDetails jd on j.journalguid = jd.parentguid '+' where journalguid =?', [guid], function (tx, results) {
         console.log("r", results.rows);
         for (const item of results.rows) {
            let child = {
               id : item.id,  
               journalDefinationId : item.journalDefinationId,  
               parentguid : item.parentguid,  
               accountCode : item.accountCode,  
               amount : item.amount,  
               canChangeAccountCode : item.canChangeAccountCode,  
               canChangeAmount : item.canChangeAmount,  
               canChangeIsCredited : item.canChangeIsCredited,  
               compulsory : item.compulsory,  
               isCredited : item.isCredited, 
               sn : item.sn,
            };

            journalDefinition.id = item.id
            journalDefinition.journalguid = item.journalguid  
            journalDefinition.approvedBy = item.approvedBy  
            journalDefinition.approvedOn = item.approvedOn  
            journalDefinition.autoGenerated = item.autoGenerated  
            journalDefinition.canAddMoreItems = item.canAddMoreItems  
            journalDefinition.canRemoveMoreItems = item.canRemoveMoreItems  
            journalDefinition.createdBy = item.createdBy  
            journalDefinition.createdOn = item.createdOn 
            journalDefinition.dateOfMonth = item.dateOfMonth  
            journalDefinition.journalDescription = item.journalDescription  
            journalDefinition.remark = item.remark  
            journalDefinition.transactionDate = item.transactionDate  
            journalDefinition.transactionRef = item.transactionRef       
            journalDefinition.journalDefinitionDetails.push(child)
         }
         // console.log('xxx ', journalDefinition)
         callback(journalDefinition)
      }, function (e, r) {
         //   console.log({e});
         callback('error:' + r.message)
      }
      );
   });
}

const getalljuornaldiscription = function (callback) {

   // return new Promise(resolve => {
   //    db.transaction(function(tx) {
   //      tx.executeSql(
   //       "Select * from journalDefinition", [],
   //        function(tx, result) { resolve(result.rows); },
   //        null
   //      );
   //    });
   //  });


   // var result = [];
   db.transaction(function (tx) {
      tx.executeSql("Select * from journalDefinition", [], function (tx, results) {
         //console.log("r", results.rows);
         callback(results.rows)
      }, function (e, r) {    
         console.log({ e });
         callback('error:' + r.message)
      });
   });
}


const createjournal = function(datatosave, callback){
   initTables()
   let parent;
   db.transaction(function (tx) {
      tx.executeSql('INSERT INTO journal(approvedBy,  approvedOn, autoGenerated, journalDescription, guid, journalDefinitionGuid, narration, transactionDate, transactionRef) VALUES (?,?,?,?,?,?,?,?,?)', [datatosave.approvedBy, datatosave.approvedOn, datatosave.autoGenerated, datatosave.journalDescription, datatosave.guid, datatosave.journalDefinitionGuid, datatosave.narration, datatosave.transactionDate, datatosave.transactionRef], function (tx, results) {
         if (results.insertId) {
            parent = results.insertId
            for (const item of datatosave.journalDetails) {
               tx.executeSql('INSERT INTO journalDetails(journalid, accountCode, credit, debit, journalDefinitionId, journalDefinitionParentguid, parentguid, sn, transactionNarration) VALUES (?,?,?,?,?,?,?,?,?)', [parent, item.accountCode, item.credit, item.debit, item.journalDefinitionId, item.journalDefinitionParentguid, item.parentguid, item.sn, item.transactionNarration], function (tx, results) {
                  // console.log({ results });
                  // callback('success')
               }, function (e, r) {
                  console.log({ e });
                  callback('error:' + e.message)
               })
            }
         }         
         callback('success')

      }, function (e, r) {
         console.log({ e });
         callback('error:' + e.message)
      });

   
   });
}

const getalljuornal = function(callback){
   var result = [];
   db.transaction(function (tx) {
      tx.executeSql("Select * from journal", [], function (tx, re) {
         //console.log("r", results.rows);
         for (const item of re.rows) {
            let i = {
               id : item.id,
               approvedBy : item.approvedBy,
               approvedOn : item.approvedOn, 
               autoGenerated : item.autoGenerated, 
               journalDescription : item.journalDescription, 
               journalguid : item.journalguid, 
               narration : item.narration, 
               transactionDate : item.transactionDate, 
               transactionRef : item.transactionRef,
               guid : item.guid,
               journalDefinitionGuid : item.journalDefinitionGuid
            }    
            result.push(i)                   
         }
         callback(result)
      }, function (e, r) {    
         console.log({ e });
         callback('error:' + r.message)
      });
   });
}


const getjuornalbyid = function(id, callback){  
      let journals = {        
         journalsDetails:[]
      }     

      db.transaction(function (tx) {
         tx.executeSql('Select * ' + 'from journal j ' + 'INNER JOIN journalDetails jd on j.guid = jd.parentguid '+' where guid =?', [id], function (tx, results) {
            console.log("r", results.rows);

            for (const item of results.rows) {
               let child = {
                  journalid :item.journalid,
                  accountCode :item.accountCode,
                  credit :item.credit,
                  debit :item.debit,
                  journalDefinitionId :item.journalDefinitionId,
                  parentguid :item.parentguid,
                  journalDefinitionParentguid : item.journalDefinitionParentguid,
                  sn :item.sn,
                  transactionNarration :item.transactionNarration
               };
   
               journals.approvedBy = item.approvedBy
               journals.approvedOn = item.approvedOn
               journals.autoGenerated = item.autoGenerated
               journals.journalDescription = item.journalDescription
               journals.journalguid = item.journalguid
               journals.narration = item.narration
               journals.transactionDate = item.transactionDate
               journals.transactionRef = item.transactionRef
               journals.guid = item.guid
               journals.journalDefinitionGuid = item.journalDefinitionGuid

               journals.journalsDetails.push(child)
            }
            // console.log('xxx ', journalDefinition)
            callback(journals)
         }, function (e, r) {
            //   console.log({e});
            callback('error:' + r.message)
         }
         );
      });
   
}


const deletejournaldefination = function(id, callback){
   db.transaction(function(tx) {
      tx.executeSql("DELETE FROM journalDefinition WHERE journalguid = ?", [id], function(tx, re){
         if (re.rowsAffected === 1) {
            tx.executeSql("DELETE FROM journalDefinitionDetails WHERE parentguid = ?", [id], function(tx, re){
               if (re.rowsAffected === 1) {
                  callback('deleted one line item')    
               }      
            })
         }

      },function(r, e){
         callback('error:' + e.message)
      });
  });
}


const approvejournaldefination = function(id, callback){
   let approdate = new Date()
   db.transaction(function (tx) {
      tx.executeSql('update journalDefinition set approvedBy =?, approvedOn =? where journalguid=?', ['onlineuser', approdate, id], function (tx, results) {
         console.log(results);
         callback('success')

      }, function (e, r) {
         callback('error:' + e.message)
      });
   });
}

const edithjournal = function(id, datatosave, callback){

   db.transaction(function (tx) {
      tx.executeSql('update journal set approvedBy =?,  approvedOn =?, autoGenerated =?, journalDescription =?, guid =?, journalDefinitionGuid =?, narration =?, transactionDate =?, transactionRef =? where guid=?', [datatosave.approvedBy, datatosave.approvedOn, datatosave.autoGenerated, datatosave.journalDescription, datatosave.guid, datatosave.journalDefinitionGuid, datatosave.narration, datatosave.transactionDate, datatosave.transactionRef, id], function (tx, results) {
         console.log(results);
         callback('success')

      }, function (e, r) {
         callback('error:' + e.message)
      });


      for (const item of datatosave.journalDetails) {
         tx.executeSql('update journalDetails set journalid =?, accountCode =?, credit =?, debit =?, journalDefinitionId =?, journalDefinitionParentguid =?, parentguid =?, sn =?, transactionNarration =? where parentguid=?', [item.journalid, item.accountCode, item.credit, item.debit, item.journalDefinitionId, item.journalDefinitionParentguid, item.parentguid, item.sn, item.transactionNarration, id], function (tx, results) {
            console.log(results);
            callback('success')

         }, function (e, r) {
            callback('error:' + e.message)
         });
      }


   });
}

const deletejournal = function(id, callback){
   db.transaction(function(tx) {
      tx.executeSql("DELETE FROM journal WHERE guid = ?", [id], function(tx, re){
         if (re.rowsAffected === 1) {
            tx.executeSql("DELETE FROM journalDetails WHERE parentguid = ?", [id], function(tx, re){
               if (re.rowsAffected === 1) {
                  callback('deleted one line item')    
               }      
            })
         }

      },function(r, e){
         callback('error:' + e.message)
      });
  });
}

const approvejournal = function(id, callback){
   let approdate = new Date()
   db.transaction(function (tx) {
      tx.executeSql('update journal set approvedBy =?, approvedOn =? where journalguid=?', ['onlineuser', approdate, id], function (tx, results) {
         console.log(results);
         callback('success')

      }, function (e, r) {
         callback('error:' + e.message)
      });
   });
}






const dbData = {
   savechartofaccount,
   editChartOfAccount,
   getallchartofaccount,
   getchatofaccountbyId,
   savejournalDefinition,
   getallchartofaccountwithoutheader,
   editjournalDefinition,
   getjuornaldiscriptionbyid,
   getchatofaccountbyIsHeaderandHeadacc,
   getchatofaccountbycode,
   getalljuornaldiscription,
   getallchartofaccountIsheader,
   createjournal,
   getalljuornal,
   getjuornalbyid,
   deletejournaldefination,
   approvejournaldefination,
   edithjournal,
   deletejournal,
   approvejournal
}
export default dbData;