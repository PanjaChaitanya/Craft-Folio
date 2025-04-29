import { Helmet } from 'react-helmet';
import Projects from '../components/Projects'
import Skills from '../components/Skills';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Craft Folio - Portfolio CMS</title>
        <meta
          name="description"
          content="Manage and showcase projects dynamically"
        />
      </Helmet>

      <div className=" barlow-semi-condensed">
        {/* Intro / Hero Section */}
        <section className="mb-25 text-center">
          <Hero/>
        </section>

        {/* Projects Section */}
        <section id='projects' className='mt-20'>
          <Projects />
        </section>

        {/* Skills Section */}
        <section id='skills' className="mb-12">
          <Skills />
        </section>
      </div>
    </>
  );
}
