
import './App.css'
import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom'

import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import Contact from './pages/Contact.jsx'
import GetInvolved from './pages/GetInvolved.jsx'
import Media from './pages/Media.jsx'
import OurWork from './pages/OurWork.jsx'
import Projects from './pages/Projects.jsx'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Work', path: '/our-work' },
    { label: 'Projects', path: '/projects' },
    { label: 'Media', path: '/media' },
    { label: 'Get Involved', path: '/get-involved' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="navbar">
      <Link className="brand" to="/" onClick={closeMenu}>
        HOPE<span>.</span>
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
        {navLinks.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={closeMenu}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <Link className="donate-btn" to="/donate" onClick={closeMenu}>
        Donate Now
      </Link>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <Link className="brand footer-brand" to="/">
        HOPE<span>.</span>
      </Link>

      <p>Creating hope. Changing lives. Building a better tomorrow.</p>

      <p className="copyright">
        © {new Date().getFullYear()} HOPE NGO. All rights reserved.
      </p>
    </footer>
  )
}

function Home() {
  return (
    <>
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">
              TOGETHER, WE CAN MAKE A DIFFERENCE
            </p>

            <h1>
              Every Child Deserves a <span>Brighter Future.</span>
            </h1>

            <p>
              We work to create lasting change through education,
              healthcare and opportunities for communities in need.
            </p>

            <Link className="primary-btn" to="/our-work">
              Explore Our Work →
            </Link>
          </div>
        </section>

        <section className="vision-section" id="vision">
          <div className="section-heading">
            <p className="eyebrow">WHO WE ARE</p>
            <h2>Building Hope, Creating Change</h2>
            <p>
              Together, we can build a world where everyone has the
              opportunity to thrive.
            </p>
          </div>

          <div className="vision-grid">
            <article className="info-card">
              <div className="card-icon">◎</div>
              <h3>Our Vision</h3>
              <p>
                A world where every child has access to quality education,
                healthcare, and the opportunity to achieve their full potential.
              </p>
            </article>

            <article className="info-card">
              <div className="card-icon">♡</div>
              <h3>Our Mission</h3>
              <p>
                To create a lasting impact in the lives of underprivileged
                children and communities through education, women empowerment,
                and livelihood opportunities.
              </p>
            </article>
          </div>
        </section>

        <section className="impact-section" id="impact">
          <div className="section-heading">
            <p className="eyebrow">OUR IMPACT</p>
            <h2>Small Actions. Big Changes.</h2>
          </div>

          <div className="stats-grid">
            <div>
              <strong>5,000+</strong>
              <span>Children Supported</span>
            </div>
            <div>
              <strong>120+</strong>
              <span>Community Programs</span>
            </div>
            <div>
              <strong>850+</strong>
              <span>Active Volunteers</span>
            </div>
            <div>
              <strong>25+</strong>
              <span>Communities Reached</span>
            </div>
          </div>
        </section>

        <section className="initiatives-section" id="initiatives">
          <div className="section-heading">
            <p className="eyebrow">WHAT WE DO</p>
            <h2>Our Initiatives</h2>
            <p>Working together for a better tomorrow.</p>
          </div>

          <div className="initiative-grid">
            <article className="initiative-card">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
                alt="Children learning in a classroom"
              />

              <div className="initiative-content">
                <h3>Education for All</h3>
                <p>
                  Helping children access learning and build brighter futures.
                </p>
                <Link to="/our-work">Learn More →</Link>
              </div>
            </article>

            <article className="initiative-card">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="Healthcare professionals supporting people"
              />

              <div className="initiative-content">
                <h3>Community Healthcare</h3>
                <p>
                  Supporting healthier lives through community initiatives.
                </p>
                <Link to="/our-work">Learn More →</Link>
              </div>
            </article>

            <article className="initiative-card">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="Women working together"
              />

              <div className="initiative-content">
                <h3>Women Empowerment</h3>
                <p>
                  Creating opportunities for skills, livelihoods and growth.
                </p>
                <Link to="/our-work">Learn More →</Link>
              </div>
            </article>
          </div>
        </section>

        <section className="cta-section" id="contact">
          <h2>Be the Reason Someone Smiles Today.</h2>
          <p>Your support can help us create lasting change.</p>

          <Link className="primary-btn" to="/get-involved">
            Get Involved →
          </Link>
        </section>
      </main>
    </>
  )
}


function Donate() {
  const [amount, setAmount] = useState('1000')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    alert(
      `Thank you, ${donorName}! Your selected donation amount is ₹${amount}. Payment processing will be enabled after the payment gateway is integrated.`
    )
  }

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">MAKE A DIFFERENCE</p>
        <h1>Support Our Mission</h1>
        <p>Your generosity can help create a brighter future.</p>
      </section>

      <section className="vision-section">
        <div className="section-heading">
          <p className="eyebrow">MAKE AN IMPACT</p>
          <h2>Every Contribution Matters</h2>
          <p>
            Choose an amount and help support education, healthcare,
            and community development initiatives.
          </p>
        </div>

        <form className="contact-form donation-form" onSubmit={handleSubmit}>
          <h3>Select Donation Amount</h3>

          <div className="donation-amounts">
            {['500', '1000', '2500', '5000'].map((value) => (
              <button
                key={value}
                type="button"
                className={`amount-btn ${amount === value ? 'selected' : ''}`}
                onClick={() => setAmount(value)}
              >
                ₹{Number(value).toLocaleString('en-IN')}
              </button>
            ))}
          </div>

          <label htmlFor="donationAmount">Donation Amount (₹)</label>
          <input
            id="donationAmount"
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />

          <label htmlFor="donorName">Full Name</label>
          <input
            id="donorName"
            type="text"
            value={donorName}
            onChange={(event) => setDonorName(event.target.value)}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="donorEmail">Email Address</label>
          <input
            id="donorEmail"
            type="email"
            value={donorEmail}
            onChange={(event) => setDonorEmail(event.target.value)}
            placeholder="Enter your email address"
            required
          />

          <button className="primary-btn" type="submit">
            Continue to Donate →
          </button>

          <p className="donation-note">
            This is a demonstration form. No payment will be collected.
          </p>
        </form>
      </section>
    </main>
  )
}


function NotFound() {
  return (
    <main className="history-section">
      <p className="eyebrow">PAGE NOT FOUND</p>
      <h2>Oops! This page doesn't exist.</h2>
      <p>Please check the URL or return to our homepage.</p>

      <Link className="primary-btn" to="/">
        Back to Home
      </Link>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/media" element={<Media />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
