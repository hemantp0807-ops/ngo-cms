
import { Link } from 'react-router-dom'

function OurWork() {
  const initiatives = [
    {
      title: 'Education for All',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      description:
        'Helping children access learning resources and educational opportunities for a brighter future.',
    },
    {
      title: 'Community Healthcare',
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      description:
        'Promoting health awareness and supporting healthier communities.',
    },
    {
      title: 'Women Empowerment',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      description:
        'Creating opportunities for skills development, independence, and sustainable livelihoods.',
    },
  ]

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">WHAT WE DO</p>
        <h1>Our Work</h1>
        <p>Working together to create meaningful, lasting change.</p>
      </section>

      <section className="initiatives-section">
        <div className="section-heading">
          <p className="eyebrow">OUR FOCUS AREAS</p>
          <h2>Creating a Better Tomorrow</h2>
          <p>
            Explore the areas where our initiatives aim to make a difference.
          </p>
        </div>

        <div className="initiative-grid">
          {initiatives.map((initiative) => (
            <article className="initiative-card" key={initiative.title}>
              <img
                src={initiative.image}
                alt={initiative.title}
                loading="lazy"
              />

              <div className="initiative-content">
                <h3>{initiative.title}</h3>
                <p>{initiative.description}</p>
                <Link to="/projects">Explore Projects →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Want to Make a Difference?</h2>
        <p>Join us in building stronger, more hopeful communities.</p>
        <Link className="primary-btn" to="/get-involved">
          Get Involved →
        </Link>
      </section>
    </main>
  )
}

export default OurWork
