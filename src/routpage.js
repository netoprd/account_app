import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AccountChart from './pages/accountchart/accountChart'
import EditAccountChart from './pages/accountchart/editAccountChart'
import ViewAccountChart from './pages/accountchart/viewAccountChart'
import Hello from './pages/hello'
import JournalDefinition from './pages/journal/journalDefinition'

export default function Routpage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/accountchart" element={<AccountChart />} />
        <Route path="/editaccountchart" element={<EditAccountChart />} />
        <Route path="/viewaccountchart" element={<ViewAccountChart />} />
        <Route path="/journaldefinition" element={<JournalDefinition />} />

      </Routes>
    </>
  )
}
