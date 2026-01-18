import React from 'react';
import HeroSection from './HeroSection';
import FeaturedFood from './FeaturedFood';
import HowWorks from './HowWorks';
import OurMission from './OurMission';
import Statistics from './Statistics';
import FoodCategories from './FoodCategories';
import Testimonials from './Testimonials';
import SafetyGuidelines from './SafetyGuidelines';
import CommunityImpact from './CommunityImpact';
import CallToAction from './CallToAction';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <FeaturedFood></FeaturedFood>
            <Statistics></Statistics>
            <FoodCategories></FoodCategories>
            <HowWorks></HowWorks>
            <Testimonials></Testimonials>
            <SafetyGuidelines></SafetyGuidelines>
            <OurMission></OurMission>
            <CommunityImpact></CommunityImpact>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;