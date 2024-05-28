import React from 'react';
import MainSection from '../Landing/MainSection';
import CyberSecuritySection from "../Landing/LearnAboutUs";
import CompliancePage from "../Landing/ComplianceSection";
import WhyComponent from "../Landing/WhySection";
export default function HomePage() {
    return (
        <>
            <MainSection />
            <CyberSecuritySection />
            <CompliancePage />
            <WhyComponent />
        </>
    );
}
