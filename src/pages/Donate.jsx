
import { Link } from 'react-router-dom'

function Donate() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">MAKE A DIFFERENCE</p>
        <h1>Support Our Mission</h1>
        <p>Your contribution can help transform lives.</p>
      </section>

      <section className="history-section">
        <h2>Every Contribution Matters</h2>
        <p>
          Your generosity helps us support education,
          healthcare, and community development programs.
        </p>
        <p>
          Secure online donations will be available once
          our payment gateway is integrated.
        </p>
        <Link className="primary-btn" to="/">
          Back to Home
        </Link>
      </section>
    </main>
  )
}

export default Donate
