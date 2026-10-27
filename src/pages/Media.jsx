
import { Link } from 'react-router-dom'

function Media() {
  const gallery = [
    {
      title: 'Education Initiatives',
      category: 'EDUCATION',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
      description: 'Learning opportunities for a brighter future.',
    },
    {
      title: 'Healthcare Awareness',
      category: 'HEALTHCARE',
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
      description: 'Building awareness for healthier communities.',
    },
    {
      title: 'Community Empowerment',
      category: 'COMMUNITY',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
      description: 'Encouraging participation and new opportunities.',
    },
  ]

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">OUR STORIES</p>
        <h1>Media & Gallery</h1>
        <p>
          Discover stories, moments, and activities from our focus areas.
        </p>
      </section>

      <section className="initiatives-section">
        <div className="section-heading">
          <p className="eyebrow">PHOTO GALLERY</p>
          <h2>Moments That Matter</h2>
          <p>
            Explore our sample gallery showcasing our areas of work.
          </p>
        </div>

        <div className="initiative-grid">
          {gallery.map((item) => (
            <article className="initiative-card" key={item.title}>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />

              <div className="initiative-content">
                <p className="eyebrow">{item.category}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="history-section">
        <p className="eyebrow">LATEST UPDATES</p>
        <h2>Stories of Hope</h2>
        <p>
          Updates, announcements, and news articles will appear here
          when real NGO content is added.
        </p>

        <Link className="primary-btn" to="/blog">
          Visit Our Blog →
        </Link>
      </section>
    </main>
  )
}

export default Media
