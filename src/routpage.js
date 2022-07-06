import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ChartOfAccount from './pages/chartofaccount/chartOfAccount'
import EditChartOfAccount from './pages/chartofaccount/editChartOfAccount'
import ListChartOfAccount from './pages/chartofaccount/listChartOfAccount'
import ViewChartOfAccount from './pages/chartofaccount/viewChartOfAccount'
import Hello from './pages/hello'
import CreateJournal from './pages/journal/createJournal'
import EditJournal from './pages/journal/editJournal'
import JournalList from './pages/journal/journalList'
import ViewJournal from './pages/journal/viewJournal'
import EditJournalDefinition from './pages/journaldefinition/editJournalDefinition'
import JournalDefinition from './pages/journaldefinition/journalDefinition'
import ListJournalDefination from './pages/journaldefinition/listJournalDefination'
import ViewJournalDefinition from './pages/journaldefinition/viewJournalDefinition'
// import Transaction from './pages/transaction/transaction'
import CreateTransaction from './pages/transaction/createtransaction'
import ListTransactions from './pages/transaction/listtransactions'
import ViewTransaction from './pages/transaction/viewtransactions'

export default function Routpage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/createtransaction" element={<CreateTransaction />} />
        <Route path="/createjournal" element={<CreateJournal />} />
        <Route path="/listjournal" element={<JournalList />} />
        <Route path="/viewjournal/:id" element={<ViewJournal />} />
        <Route path="/editjournal/:id" element={<EditJournal />} />
        <Route path="/editchartofaccount" element={<EditChartOfAccount />} />
        <Route path="/viewchartofaccount" element={<ViewChartOfAccount />} />
        <Route path="/journaldefinition" element={<JournalDefinition />} />
        {/* <Route path="/ChartOfAccount" element={<ChartOfAccount />} /> */}
        <Route path="/listjournaldef" element={<ListJournalDefination />} />
        <Route path="/viewjournaldef/:id" element={<ViewJournalDefinition />} />
        <Route path="/editjournaldef/:id" element={<EditJournalDefinition />} />
        {/* <Route path="/listtransactions" element={<ListTransactions/>} /> */}
        {/* <Route path="/viewtransactions/:id" element={<ViewTransaction/>} /> */}
        <Route path="/createchartofaccount" element={<ChartOfAccount />} />
        <Route path="/listchartofaccount" element={<ListChartOfAccount />} />
        <Route path="/listtransactions" element={<ListTransactions />} />
        <Route path="/viewtransactions/:id" element={<ViewTransaction />} />



      </Routes>
    </>
  )
}
