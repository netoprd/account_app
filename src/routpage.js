import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AccountChart from './pages/accountchart/accountChart'
import EditAccountChart from './pages/accountchart/editAccountChart'
import ViewAccountChart from './pages/accountchart/viewAccountChart'
import Hello from './pages/hello'
import CreateJournal from './pages/journal/createJournal'
import EditJournal from './pages/journal/editJournal'
import JournalList from './pages/journal/journalList'
import ViewJournal from './pages/journal/viewJournal'
import Transaction from './pages/transaction/transaction'
import JournalDefinition from './pages/journal/journalDefinition'

export default function Routpage() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Hello/>} />
    <Route path="/transaction" element={<Transaction/>} />
    <Route path="/createjournal" element={<CreateJournal/>} />
    <Route path="/listjournal" element={<JournalList/>} />
    <Route path="/viewjournal/:id" element={<ViewJournal/>} />
    <Route path="/editjournal/:id" element={<EditJournal/>} />
    <Route path="/editaccountchart" element={<EditAccountChart />} />
    <Route path="/viewaccountchart" element={<ViewAccountChart />} />
    <Route path="/journaldefinition" element={<JournalDefinition />} />
    <Route path="/accountchart" element={<AccountChart />} />

      </Routes>
    </>
  )
}
