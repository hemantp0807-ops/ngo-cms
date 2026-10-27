
import { Link } from 'react-router-dom'

function GetInvolved() {
  const opportunities = [
    {
      icon: '♡',
      title: 'Become a Volunteer',
      description:
        'Share your time, skills, and ideas to support community initiatives.',
      link: '/contact',
      button: 'Volunteer With Us →',
    },
    {
      icon: '＋',
      title: 'Support Our Mission',
      description:
        'Help support education, healthcare, and community development.',
      link: '/donate',
      button: 'Support Us →',
    },
    {
      icon: '◎',
      title: 'Become a Partner',
      description:
        'Collaborate with us to create opportunities and lasting change.',
      link: '/contact',
      button: 'Partner With Us →',
    },
  ]

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">BE PART OF THE CHANGE</p>
        <h1>Get Involved</h1>
        <p>
          Every helping hand can make a difference in someone's life.
        </p>
      </section>

      <section className="vision-section">
        <div className="section-heading">
          <p className="eyebrow">HOW YOU CAN HELP</p>
          <h2>Make a Difference With Us</h2>
          <p>
            Choose how you would like to contribute to our mission.
          </p>
        </div>

        <div className="vision-grid">
          {opportunities.map((item) => (
            <article className="info-card" key={item.title}>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link className="primary-btn" to={item.link}>
                {item.button}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Together, We Can Do More</h2>
        <p>
          Have an idea or want to learn more about our work?
          We would love to hear from you.
        </p>
        <Link className="primary-btn" to="/contact">
          Contact Us →
        </Link>
      </section>
    </main>
  )
}

export default GetInvolved
