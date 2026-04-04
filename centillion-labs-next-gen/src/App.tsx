import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { WhoWeAre } from './components/sections/WhoWeAre';
import { Services } from './components/sections/Services';
import { Portfolio } from './components/sections/Portfolio';
import { Impact } from './components/sections/Impact';
import { Tech } from './components/sections/Tech';
import { Team } from './components/sections/Team';
import { Industries } from './components/sections/Industries';
import { CaseStudies } from './components/sections/CaseStudies';
import { Blog } from './components/sections/Blog';
import { LifeAtCentillion } from './components/sections/LifeAtCentillion';
import { RedTeamFlash } from './components/RedTeamFlash';
import { RedTeamPage } from './pages/RedTeamPage';
import { SecureAIPlaygroundPage } from './pages/SecureAIPlaygroundPage';
import { NinjaPage } from './pages/NinjaPage';
import { SplashVideo } from './components/SplashVideo';

import { AboutPage } from './pages/AboutPage';
import { WhoWeArePage } from './pages/WhoWeArePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { TeamPage } from './pages/TeamPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { LifePage } from './pages/LifePage';
import { BlogPage } from './pages/BlogPage';
import { SettingsPage } from './pages/SettingsPage';

function HomePage() {
  return (
    <>
      <RedTeamFlash />
      <Layout>
        <Hero />
        <div style={{ position: 'relative', zIndex: 10, background: 'transparent' }}>
          <About />
          <WhoWeAre />
          <Services />
          <Portfolio />
          <Impact />
          <Tech />
          <LifeAtCentillion />
          <Team />
          <Industries />
          <CaseStudies />
          <Blog />
        </div>
      </Layout>
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashVideo onFinish={() => setShowSplash(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/who-we-are" element={<WhoWeArePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/life" element={<LifePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/red-team" element={<RedTeamPage onClose={() => window.history.back()} />} />
          <Route path="/secure-ai-playground" element={<SecureAIPlaygroundPage onClose={() => window.history.back()} />} />
          <Route path="/ninja" element={<NinjaPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;

