import React from 'react';
import HeroSection from './HeroSection';
import FeaturedFood from './FeaturedFood';
import HowWorks from './HowWorks';
import OurMission from './OurMission';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <FeaturedFood></FeaturedFood>
            <HowWorks></HowWorks>
            <OurMission></OurMission>
            
        </div>
    );
};

export default Home;