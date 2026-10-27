
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Blog() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get('https://ngo-cms-ccss.onrender.com/api/blog/')
      .then((response) => {
        setArticles(response.data)
      })
      .catch(() => {
        setError('Unable to load articles. Please try again later.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">NEWS, STORIES & IDEAS</p>
        <h1>Our Blog</h1>
        <p>
          Explore stories and ideas about creating positive social change.
        </p>
      </section>

      <section className="initiatives-section">
        <div className="section-heading">
          <p className="eyebrow">LATEST ARTICLES</p>
          <h2>Stories That Inspire</h2>
          <p>
            Read about the issues and opportunities that matter to communities.
          </p>
        </div>

        {loading && <p>Loading articles...</p>}

        {!loading && error && <p role="alert">{error}</p>}

        {!loading && !error && articles.length === 0 && (
          <p>No published articles available yet.</p>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="initiative-grid">
            {articles.map((article) => (
              <article className="initiative-card" key={article.id}>
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    loading="lazy"
                  />
                )}

                <div className="initiative-content">
                  <p className="eyebrow">
                    {article.author || 'NGO TEAM'}
                  </p>
                  <h3>{article.title}</h3>
                  <p>{article.content}</p>
                  <Link to="/contact">Learn More →</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="cta-section">
        <h2>Want to Learn More About Our Work?</h2>
        <p>Get in touch with us to learn about our initiatives.</p>
        <Link className="primary-btn" to="/contact">
          Contact Us →
        </Link>
      </section>
    </main>
  )
}

export default Blog
