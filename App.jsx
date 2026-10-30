import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Link, useNavigate, useParams } from 'react-router-dom';
import { courses } from './data';

function getUser() {
  try { 
    return JSON.parse(localStorage.getItem('noviqraUser')); 
  }
  catch { 
    return null; 
  }
}

function Navbar({ user, onLogout }) {
  return <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom">
    <div className="container">
      <Link className="navbar-brand fw-bold" to="/"><span className="brand-mark"><i className="bi bi-mortarboard-fill"/></span> Noviqra</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"><span className="navbar-toggler-icon"/></button>
      <div className="collapse navbar-collapse" id="mainNav">
        <div className="navbar-nav mx-auto gap-lg-3">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/courses">Explore courses</Link>
        </div>
        <div className="d-flex align-items-center gap-2">
          {
          user ? 
          <>
          <span className="small text-muted d-none d-md-inline">Hi, {user.name.split(' ')[0]}</span><button className="btn btn-outline-dark btn-sm px-3" onClick={onLogout}>Log out</button>
          </> 
          :
          <>
          <Link className="btn btn-link text-decoration-none" to="/login">Log in</Link><Link className="btn btn-primary px-3" to="/register">Get started</Link>
          </>
          }
        </div>
      </div>
    </div>
  </nav>;
}

function Footer() {
  return <footer className="footer mt-5"><div className="container py-4 d-flex flex-column flex-md-row justify-content-between gap-2">
    <div>
      <b>Noviqra</b>
      <p className="mb-0 small text-muted">Learn something new. Every day.</p>
    </div>
    <span className="small text-muted">© 2026 Noviqra</span></div>
    </footer>;
}

function CourseCard({ course }) {
  return <div className="col-md-6 col-lg-4">
    <div className="course-card h-100">
    <Link to={`/course/${course.id}`} className="course-image-wrap">
      <img src={course.thumbnail} alt={course.title} className="course-image"/>
    </Link>
    <div className="p-3 p-lg-4">
      <div className="d-flex justify-content-between small text-muted mb-2">
        <span><i className="bi bi-clock me-1"/>{course.duration}</span>
        <span><i className="bi bi-play-circle me-1"/>{course.lessons} lessons</span>
      </div>
      <h5 className="fw-bold mb-2"><Link className="text-dark text-decoration-none" to={`/course/${course.id}`}>{course.title}</Link></h5>
      <p className="text-muted small mb-3">{course.description}</p>
      <div className="d-flex justify-content-between align-items-center border-top pt-3">
        <span className="small text-muted"><i className="bi bi-person me-1"/>{course.instructor}</span>
        <Link className="btn btn-sm btn-outline-primary" to={`/course/${course.id}`}>View course <i className="bi bi-arrow-right ms-1"/></Link>
      </div>
    </div>
  </div></div>;
}

function Home() {
  const featured = courses.slice(0, 3);
  return <><section className="hero-section">
    <div className="container">
      <div className="row align-items-center g-5">
    <div className="col-lg-6">
      <span className="eyebrow">YOUR LEARNING JOURNEY STARTS HERE</span>
      <h1 className="display-4 fw-bold mt-3">Build skills.<br/><span className="gradient-text">Shape your future.</span></h1>
      <p className="lead text-muted mt-3 mb-4">Learn practical skills from expert instructors with easy-to-follow online courses.</p>
      <div className="d-flex flex-wrap gap-3"><Link to="/courses" className="btn btn-primary btn-lg">Explore courses <i className="bi bi-arrow-right ms-2"/></Link><Link to="/register" className="btn btn-outline-secondary btn-lg">Join for free</Link></div>
      <div className="hero-stats mt-5"><div><b>6+</b><span>Courses</span></div><div><b>100%</b><span>Learn at your pace</span></div><div><b>24/7</b><span>Access</span></div></div>
    </div>
    <div className="col-lg-6"><div className="hero-visual"><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1100" alt="Students learning together"/></div></div>
  </div></div></section>
  <section className="container py-5"><div className="section-heading"><div><span className="eyebrow">START LEARNING</span><h2 className="fw-bold mt-2">Popular courses</h2><p className="text-muted">Hand-picked courses to help you get started.</p></div><Link to="/courses" className="btn btn-outline-primary">View all courses <i className="bi bi-arrow-right ms-1"/></Link></div>
    <div className="row g-4">{featured.map(c => <CourseCard key={c.id} course={c}/>)}</div>
  </section>
  <section className="container pb-5"><div className="why-panel row align-items-center g-4"><div className="col-md-7"><span className="eyebrow">WHY NOVIQRA?</span><h2 className="fw-bold mt-2">Learning made simple and flexible.</h2><p className="text-muted mb-0">Choose a course, learn from video lessons and build your knowledge wherever you are.</p></div><div className="col-md-5"><div className="row g-3"><div className="col-6"><div className="feature-mini"><i className="bi bi-camera-video"/><b>Video lessons</b><small>Learn visually</small></div></div><div className="col-6"><div className="feature-mini"><i className="bi bi-phone"/><b>Learn anywhere</b><small>Study at your pace</small></div></div></div></div></div></section>
  </>;
}

function Courses() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(courses.map(c => c.category))];
  const filtered = courses.filter(c => (category === 'All' || c.category === category) && `${c.title} ${c.instructor} ${c.category}`.toLowerCase().includes(query.toLowerCase()));
  return <main className="container page-space">
    <div className="mb-4"><span className="eyebrow">COURSE LIBRARY</span><h1 className="fw-bold mt-2">Explore courses</h1><p className="text-muted">Find a course that matches your interests and goals.</p></div>
    <div className="course-toolbar mb-4"><div className="search-box"><i className="bi bi-search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search courses or instructors..." aria-label="Search courses"/></div><div className="d-flex flex-wrap gap-2">{categories.map(cat=><button key={cat} onClick={()=>setCategory(cat)} className={`filter-btn ${category===cat?'active':''}`}>{cat}</button>)}</div></div>
    {filtered.length ? <div className="row g-4">{filtered.map(c=><CourseCard key={c.id} course={c}/>)}</div> : <div className="empty-state"><i className="bi bi-search"/><h5>No courses found</h5><p>Try another search term or category.</p></div>}
  </main>;
}

function CourseDetail() {
  const { id } = useParams();
  const course = courses.find(c => c.id === Number(id));
  if (!course) return <main className="container page-space"><h2>Course not found</h2><Link to="/courses">Back to courses</Link></main>;
  return <main className="container page-space"><Link to="/courses" className="back-link"><i className="bi bi-arrow-left me-2"/>Back to courses</Link>
    <div className="row g-5 mt-2"><div className="col-lg-7"><span className={`category-pill ${course.color} position-static`}>{course.category}</span><h1 className="fw-bold mt-3">{course.title}</h1><p className="lead text-muted">{course.description}</p><div className="course-meta"><span><i className="bi bi-person me-2"/>{course.instructor}</span><span><i className="bi bi-bar-chart me-2"/>{course.level}</span><span><i className="bi bi-clock me-2"/>{course.duration}</span><span><i className="bi bi-play-circle me-2"/>{course.lessons} lessons</span></div>
      <div className="content-panel mt-4"><h4 className="fw-bold">What you'll learn</h4><ul className="learning-list"><li><i className="bi bi-check-circle-fill"/>Understand the key concepts and terminology.</li><li><i className="bi bi-check-circle-fill"/>Follow practical examples step by step.</li><li><i className="bi bi-check-circle-fill"/>Build confidence through self-paced learning.</li></ul></div>
    </div><div className="col-lg-5"><div className="enroll-card"><img src={course.thumbnail} alt="" className="w-100 enroll-image"/><div className="p-4"><div className="d-flex justify-content-between mb-3"><span className="text-muted">Course access</span><b className="text-success">Free</b></div><Link to={`/watch/${course.id}`} className="btn btn-primary btn-lg w-100"> <i className="bi bi-play-circle me-2"/>Start learning</Link><p className="small text-muted text-center mt-3 mb-0">Video lessons • Self-paced • Online access</p></div></div></div></div>
  </main>;
}

function VideoPage() {
  const { id } = useParams();
  const course = courses.find(c => c.id === Number(id)) || courses[0];
  return <main className="container page-space"><Link to={`/course/${course.id}`} className="back-link"><i className="bi bi-arrow-left me-2"/>Back to course</Link><div className="row g-4 mt-2"><div className="col-lg-8"><div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${course.videoId}?rel=0`} title={course.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div><h2 className="fw-bold mt-4">{course.title}</h2><p className="text-muted">{course.description}</p><div className="content-panel"><h5 className="fw-bold">About this lesson</h5><p className="text-muted mb-0">Watch the lesson, pause whenever you need, and practise the concepts along the way. Your learning progress can be tracked locally in this demo.</p></div></div>
    <div className="col-lg-4"><div className="lesson-panel"><h5 className="fw-bold mb-3">Course content</h5><div className="lesson-current"><i className="bi bi-play-circle-fill"/><div><b>Lesson 1: Introduction</b><small>Video lesson • Approx. 1 hour</small></div></div>{['Getting started','Core concepts','Practical examples','Review and next steps'].map((l,i)=><div className="lesson-row" key={l}><span className="lesson-number">{i+2}</span><div><b>{l}</b><small>Lesson {i+2}</small></div><i className="bi bi-lock text-muted ms-auto"/></div>)}<p className="small text-muted mt-3 mb-0">Note: This is a student project demo. The embedded video is hosted by YouTube.</p></div></div></div></main>;
}

function AuthLayout({ children, title, subtitle }) {
  return <main className="auth-page"><div className="auth-card"><Link to="/" className="navbar-brand fw-bold d-inline-block mb-4"><span className="brand-mark"><i className="bi bi-mortarboard-fill"/></span> Noviqra</Link><h2 className="fw-bold">{title}</h2><p className="text-muted mb-4">{subtitle}</p>{children}</div></main>;
}

function Login({ onLogin }) {
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState('');
  const navigate=useNavigate();
  function submit(e){e.preventDefault();const saved=JSON.parse(localStorage.getItem('noviqraAccount')||'null');if(saved && saved.email===email && saved.password===password){onLogin(saved);navigate('/');}else{setError('Account not found. Please register first or check your details.');}}
  return <AuthLayout title="Welcome back" subtitle="Log in to continue your learning journey."><form onSubmit={submit}><label className="form-label">Email address</label><input className="form-control form-control-lg mb-3" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/><label className="form-label">Password</label><input className="form-control form-control-lg mb-3" type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/>{error&&<div className="alert alert-danger py-2 small">{error}</div>}<button className="btn btn-primary btn-lg w-100 mt-2">Log in</button></form><p className="text-center small mt-4 mb-0">New to Noviqra? <Link to="/register">Create an account</Link></p><p className="demo-note">Demo: register an account first. Details are stored only in this browser.</p></AuthLayout>;
}

function Register({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    const account = { name, email, password };
    localStorage.setItem('noviqraAccount', JSON.stringify(account));
    onLogin(account);
    navigate('/');
  }

  return (
    <AuthLayout title="Create your account" subtitle="Join Noviqra and start learning today.">
      <form onSubmit={submit}>
        <label className="form-label">Full name</label>
        <input className="form-control form-control-lg mb-3" required value={name} onChange={e => setName(e.target.value)} placeholder="Your name"/>
        <label className="form-label">Email address</label>
        <input className="form-control form-control-lg mb-3" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"/>
        <label className="form-label">Password</label>
        <input className="form-control form-control-lg mb-3" type="password" minLength="6" required value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters"/>
        <label className="form-label">Confirm password</label>
        <input className="form-control form-control-lg mb-3" type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Re-enter password"/>
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        <button className="btn btn-primary btn-lg w-100 mt-2">Create account</button>
      </form>
      <p className="text-center small mt-4 mb-0">Already registered? <Link to="/login">Log in</Link></p>
      <p className="demo-note">College demo only: do not use a real password. Authentication is stored in local browser storage.</p>
    </AuthLayout>
  );
}

export default function App() {
  const [user,setUser]=useState(getUser);
  useEffect(()=>{if(user)localStorage.setItem('noviqraUser',JSON.stringify(user));else localStorage.removeItem('noviqraUser');},[user]);
  function logout(){setUser(null);}
  return <><Navbar user={user} onLogout={logout}/><Routes><Route path="/" element={<Home/>}/><Route path="/courses" element={<Courses/>}/><Route path="/course/:id" element={<CourseDetail/>}/><Route path="/watch/:id" element={user ? <VideoPage/> : <Navigate to="/login"/>}/><Route path="/login" element={user?<Navigate to="/"/>:<Login onLogin={setUser}/>}/><Route path="/register" element={user?<Navigate to="/"/>:<Register onLogin={setUser}/>}/><Route path="*" element={<Navigate to="/"/>}/></Routes><Footer/></>;
}