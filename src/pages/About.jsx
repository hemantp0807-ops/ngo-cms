
import { Link } from 'react-router-dom'

function About() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">GET TO KNOW US</p>
        <h1>About HOPE</h1>
        <p>Together, we can create a brighter future for everyone.</p>
      </section>

      <section className="history-section">
        <p className="eyebrow">OUR STORY</p>
        <h2>Building Hope, Changing Lives</h2>
        <p>
          HOPE is dedicated to supporting children and communities
          through education, healthcare, and opportunities for growth.
          We believe that every person deserves the chance to build a
          better future.
        </p>
      </section>

      <section className="vision-section">
        <div className="section-heading">
          <p className="eyebrow">OUR PURPOSE</p>
          <h2>Our Vision and Mission</h2>
          <p>Every action begins with a purpose.</p>
        </div>

        <div className="vision-grid">
          <article className="info-card">
            <div className="card-icon">◎</div>
            <h3>Our Vision</h3>
            <p>
              A world where every child has access to quality education,
              healthcare, and opportunities to reach their full potential.
            </p>
          </article>

          <article className="info-card">
            <div className="card-icon">♡</div>
            <h3>Our Mission</h3>
            <p>
              To support underprivileged children and communities through
              education, women empowerment, and livelihood opportunities.
            </p>
          </article>
        </div>
      </section>

      <section className="cta-section">
        <h2>Be Part of the Change</h2>
        <p>Your time, support, and ideas can make a difference.</p>
        <Link className="primary-btn" to="/get-involved">
          Get Involved →
        </Link>
      </section>
    </main>
  )
}

export default About
