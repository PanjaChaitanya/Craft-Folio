import { Helmet } from 'react-helmet';
import Projects from '../components/Projects'
import Skills from '../components/Skills';

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

      <div className="p-8">
        {/* Intro / Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
          <p className="text-lg text-gray-600">
            Explore my projects and the skills I’ve mastered along the way.
          </p>
        </section>

        {/* Projects Section */}
        <section id='projects'>
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
