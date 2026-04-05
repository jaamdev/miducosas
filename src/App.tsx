import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router'
import { Toaster } from 'sonner'

const HomePage = lazy(() => import('./pages/HomePage.tsx'))
const FavoritePage = lazy(() => import('./pages/FavoritePage.tsx'))
const MiduPage = lazy(() => import('./pages/MiduPage.tsx'))
const ResourceIdPage = lazy(() => import('./pages/ResourceIdPage.tsx'))
const ChangesPage = lazy(() => import('./pages/ChangesPage.tsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.tsx'))

import Header from './components/header/Header.tsx'
import Loading from './components/loading/Loading.tsx'
import Footer from './components/footer/Footer.tsx'
import { StorageMinusIcon, StoragePlusIcon } from './components/Icons.tsx'

export default function App() {
  return <main>
    <Header />
    <Toaster
      duration={5_000}
      richColors={true}
      closeButton={true}
      position={'bottom-right'}
      icons={{
        success: <StoragePlusIcon />,
        error: <StorageMinusIcon />
      }}
    />
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/:id' element={<ResourceIdPage />} />
        <Route path='/changes' element={<ChangesPage />} />
        <Route path='/favorites' element={<FavoritePage />} />
        <Route path='/midudev' element={<MiduPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    <Footer />
  </main>
}
