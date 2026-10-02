import { Route, Routes } from 'react-router-dom'
import { Shell } from './components/Shell'
import { AppliedPage } from './pages/AppliedPage'
import { DeskPage } from './pages/DeskPage'
import { HomePage } from './pages/HomePage'
import { RolePage } from './pages/RolePage'

export function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roles/:slug" element={<RolePage />} />
        <Route path="/applied/:id" element={<AppliedPage />} />
        <Route path="/desk" element={<DeskPage />} />
        <Route path="/desk/:id" element={<DeskPage />} />
      </Routes>
    </Shell>
  )
}
