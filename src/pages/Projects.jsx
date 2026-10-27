
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get('https://ngo-cms-ccss.onrender.com/api/projects/')
      .then((response) => {
        setProjects(response.data)
      })
      .catch(() => {
        setError('Unable to load projects. Please try again later.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">TURNING IDEAS INTO ACTION</p>
        <h1>Our Projects</h1>
        <p>
          Discover the initiatives working towards a brighter future.
        </p>
      </section>

      <section className="vision-section">
        <div className="section-heading">
          <p className="eyebrow">OUR INITIATIVES</p>
          <h2>Projects That Inspire Change</h2>
          <p>
            Explore our focus areas and learn how you can get involved.
          </p>
        </div>

        {loading && <p>Loading projects...</p>}

        {!loading && error && <p role="alert">{error}</p>}

        {!loading && !error && projects.length === 0 && (
          <p>No active projects available yet.</p>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="vision-grid">
            {projects.map((project, index) => (
              <article className="info-card" key={project.id}>
                <div className="card-icon">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="eyebrow">
                  {project.location || 'OUR INITIATIVE'}
                </p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <Link to="/contact">Learn More →</Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="cta-section">
        <h2>Help Us Make a Difference</h2>
        <p>Your support can help initiatives reach more communities.</p>
        <Link className="primary-btn" to="/get-involved">
          Get Involved →
        </Link>
      </section>
    </main>
  )
}

export default Projects
