import React from 'react'
import Header from '../Components/header'
import Specialitymenu from '../Components/Specialitymenu'

import Banner from '../Components/Banner'
import Features from '../Components/Features'

const Home = () => {
  return (
    <div className=''>
      <Header/>
      <Specialitymenu/>
      <Features/>
      <Banner/>
    </div>
  )
}

export default Home