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
import JournalDefinition from './pages/journaldefinition/journalDefinition'
import Transaction from './pages/transaction/transaction'

export default function Routpage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/createjournal" element={<CreateJournal />} />
        <Route path="/listjournal" element={<JournalList />} />
        <Route path="/viewjournal/:id" element={<ViewJournal />} />
        <Route path="/editjournal/:id" element={<EditJournal />} />
        <Route path="/editchartofaccount" element={<EditChartOfAccount />} />
        <Route path="/viewchartofaccount" element={<ViewChartOfAccount />} />
        <Route path="/journaldefinition" element={<JournalDefinition />} />
        <Route path="/createchartofaccount" element={<ChartOfAccount />} />
        <Route path="/listchartofaccount" element={<ListChartOfAccount />} />

      </Routes>
    </>
  )
}
