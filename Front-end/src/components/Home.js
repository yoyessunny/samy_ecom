import React from 'react';
import Banner from './Banner';
import PantsCarousel from './carousels/PantsCarousel';
import ShirtsCarousel from './carousels/ShirtsCarousel';
import ShoesCarousel from './carousels/ShoesCarousel';

const Home = () => {
  return (
    <div>
        <Banner />
        <ShirtsCarousel />
        <PantsCarousel />
        <ShoesCarousel />
    </div>
  )
}

export default Home