// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { EmiCalculator } from './EmiCalculator/Components/EmiCalculator'
import ProductCarousel from './ProductCarousel/Components/ProductCarousel'
import Shopper from './Shopper/Components/Shopper'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/emi-calculator' element= { <EmiCalculator /> } />
          <Route path='/product-carousel' element= { <ProductCarousel /> } />
          <Route path='/shopper' element= { <Shopper /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
