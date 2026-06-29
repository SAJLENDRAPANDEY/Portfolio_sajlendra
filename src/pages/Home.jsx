import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import MotivationQuote from '../components/MotivationQuote'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Github from '../components/Github'
import Coding from '../components/Coding'
import Certifications from '../components/Certifications'
import Blogs from '../components/Blogs'
import Contact from '../components/Contact'
import { pageVariants } from '../animations/pageTransition'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Home() {
  useDocumentMeta({
    title: 'Data Analyst | ML Engineer | Portfolio',
    description: 'Portfolio of Sajlendra Pandey — B.Tech CSE Data Science student building ML pipelines, analytics dashboards, and AI-powered applications.',
    path: '/',
  })

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-in').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Hero />
      <MotivationQuote />
      <About />
      <Skills />
      <Projects />
      <Github />
      <Coding />
      <Certifications />
      <Blogs />
      <Contact />
    </motion.main>
  )
}
