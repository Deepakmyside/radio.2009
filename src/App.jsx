import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { works, categories } from './data/works';
import { FaInstagram, FaPinterestP } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

/* ======================================================
   ANIMATION HELPERS
   ====================================================== */
function FadeSlide({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const y = direction === 'up' ? 60 : direction === 'down' ? -60 : 0;
  const x = direction === 'left' ? 60 : direction === 'right' ? -60 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingDoodle({ children, className = '', amplitude = 12, duration = 5, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0, amplitude * 0.6, 0], rotate: [0, 2, 0, -2, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ======================================================
   VINYL SVG
   ====================================================== */
function VinylSVG({ size = 60, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="48" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#222" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#222" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="22" fill="none" stroke="#222" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="15" fill="#8B0000" />
      <circle cx="50" cy="50" r="5" fill="#0a0a0a" />
      <circle cx="50" cy="50" r="2" fill="#333" />
    </svg>
  );
}

/* ======================================================
   NAVBAR
   ====================================================== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-[100] px-5 md:px-10 py-4 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#8B0000]/20' : ''}`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button onClick={() => scrollTo('hero')} className="group">
            <span className="text-2xl md:text-3xl font-bold tracking-[0.15em] uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Radio<span className="text-[#DC143C]">.2009</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {['hero', 'about', 'work', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className="text-xs uppercase tracking-[0.25em] text-[#d4c5a9]/60 hover:text-[#DC143C] transition-colors duration-300 font-medium"
              >
                {section === 'hero' ? 'Home' : section}
              </button>
            ))}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex flex-col gap-[5px] p-2 z-[110]">
            <motion.span animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-6 h-[2px] bg-[#d4c5a9] block origin-center" />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-[2px] bg-[#d4c5a9] block" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-6 h-[2px] bg-[#d4c5a9] block origin-center" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          >
            {['hero', 'about', 'work', 'contact'].map((section, i) => (
              <motion.button
                key={section}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(section)}
                className="text-4xl uppercase tracking-[0.2em] text-[#d4c5a9] hover:text-[#DC143C] transition-colors"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {section === 'hero' ? 'Home' : section}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ======================================================
   HERO SECTION — Cinematic Video
   ====================================================== */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="hero" ref={ref} className="relative h-screen overflow-hidden">
      {/* Video background */}
      <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
          poster="/images/herpvideo.mp4"
          style={{ imageRendering: 'auto', willChange: 'transform' }}
        >
          <source src="/images/herovideo.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Grain texture */}
      <div className="grain" />

      {/* Vignette */}
      <div className="vignette" />

      {/* Floating doodles */}
      <FloatingDoodle className="absolute top-[15%] right-[10%] opacity-20" amplitude={18} duration={6}>
        <VinylSVG size={50} />
      </FloatingDoodle>
      <FloatingDoodle className="absolute bottom-[25%] left-[8%] opacity-15" amplitude={12} duration={5} delay={1}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#DC143C" opacity="0.5">
          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z" />
        </svg>
      </FloatingDoodle>

      {/* Content */}
      <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.5em] text-[#DC143C] mb-6 font-medium">Art & Visuals</p>
          <h1 className="text-[clamp(4rem,15vw,12rem)] leading-[0.85] tracking-[0.05em] text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Radio
            <br />
            <span className="text-[#D4AF37]">.2009</span>
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-16 h-[1px] bg-[#DC143C]/50" />
            <p className="text-sm md:text-base text-[#d4c5a9]/70 tracking-[0.15em]" style={{ fontFamily: "'Caveat', cursive", fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}>
             “𝚁𝙰𝙳𝙸𝙾.2009” is the frequency where thoughts become art.
            </p>
            <div className="w-16 h-[1px] bg-[#DC143C]/50" />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4c5a9]/40">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#DC143C] to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ======================================================
   ABOUT SECTION — Diary Page Feel
   ====================================================== */
function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-5 md:px-10 overflow-hidden">
      {/* Red accent line */}
      <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-transparent via-[#8B0000] to-transparent" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-center">
        {/* Image stack */}
        <FadeSlide direction="left">
          <div className="relative w-full max-w-sm mx-auto">
            {/* Back image */}
            <motion.div
              whileHover={{ rotate: 0 }}
              className="absolute top-8 -left-4 w-full aspect-[3/4] rounded-none overflow-hidden border-2 border-[#2a2a2a] rotate-[6deg] shadow-2xl transition-transform duration-700"
            >
              <img src="/images/chitt-rall.png" alt="Chitt Rall" className="w-full h-full object-cover" />
            </motion.div>

            {/* Front image */}
            <motion.div
              whileHover={{ rotate: 0 }}
              className="relative w-full aspect-[3/4] rounded-none overflow-hidden border-2 border-[#2a2a2a] rotate-[-3deg] shadow-2xl z-10 transition-transform duration-700"
            >
              <img src="/images/red-room.png" alt="Red Room" className="w-full h-full object-cover" />
              {/* Tape strip */}
              <div className="tape absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 rotate-[-1deg]" />
            </motion.div>
          </div>
        </FadeSlide>

        {/* Diary text */}
        <div className="space-y-6">
          <FadeSlide>
            <p className="text-xs uppercase tracking-[0.4em] text-[#DC143C]/70 font-medium">The Story</p>
          </FadeSlide>

          <FadeSlide delay={0.1}>
            <h2 className="text-5xl md:text-7xl uppercase tracking-[0.08em] text-white leading-[0.95]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Behind the
              <br />
              <span className="text-[#DC143C]">Illustrations</span>
            </h2>
          </FadeSlide>

          <FadeSlide delay={0.2}>
            <div className="w-20 h-[2px] bg-[#8B0000]" />
          </FadeSlide>

          <FadeSlide delay={0.25}>
            <p className="text-[#d4c5a9]/70 text-base md:text-lg leading-relaxed max-w-lg">
              I’m Karan — a digital illustrator from Punjab.

              Radio.2009 don’t just draw.
              he translate thoughts into visuals,
              and emotions into motion.
              <br></br>
              Every piece I create carries a story —
              sometimes loud, sometimes silent,
              but always felt.

            </p>
          </FadeSlide>


          <FadeSlide delay={0.35}>
            <div className="flex flex-wrap gap-3 mt-4">
              {['Procreate', 'Illustrator', 'Thought process', 'Cover arts', 'Visual Storytelling'].map((tool) => (
                <span key={tool} className="px-4 py-1.5 text-xs uppercase tracking-widest border border-[#8B0000]/40 text-[#DC143C]/80 hover:bg-[#8B0000]/20 transition-colors">
                  {tool}
                </span>
              ))}
            </div>
          </FadeSlide>
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   WORK / PORTFOLIO SECTION — Album Wall
   ====================================================== */
function WorkSection() {
  const [activeFilter, setActiveFilter] = useState('Both');
  const [selectedWork, setSelectedWork] = useState(null);

  const filtered = activeFilter === 'Both' ? works : works.filter(w => w.category === activeFilter);

  return (
    <section id="work" className="relative py-24 md:py-32 px-5 md:px-10 overflow-hidden">
      {/* Section background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#120505] to-[#0a0a0a]" />
      <div className="scratch-line absolute inset-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <FadeSlide>
            <p className="text-xs uppercase tracking-[0.4em] text-[#DC143C]/70 font-medium mb-4">Portfolio</p>
          </FadeSlide>
          <FadeSlide delay={0.1}>
            <h2 className="text-5xl md:text-8xl uppercase tracking-[0.08em] text-white leading-[0.9]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              The <span className="text-[#DC143C]">Wall</span>
            </h2>
          </FadeSlide>
          <FadeSlide delay={0.15}>
            <p className="text-[#d4c5a9]/40 text-sm mt-4 max-w-md" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1rem' }}>
              Album covers, illustrations, visual stories — all pinned to the wall.
            </p>
          </FadeSlide>
        </div>

        {/* Filter tabs */}
        <FadeSlide delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 border ${activeFilter === cat
                  ? 'bg-[#DC143C] text-white border-[#DC143C]'
                  : 'bg-transparent text-[#d4c5a9]/50 border-[#2a2a2a] hover:border-[#8B0000] hover:text-[#DC143C]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeSlide>

        {/* Album Wall Gallery — scattered poster layout */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((work, i) => (
              <motion.div
                layout
                key={work.id}
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`poster-card relative group cursor-pointer ${i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                style={{ transform: `rotate(${work.rotation || 0}deg)` }}
                onClick={() => setSelectedWork(work)}
              >
                {/* The poster frame */}
                <div className="relative overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] group-hover:border-[#8B0000]/50 transition-colors duration-500">
                  {/* Media */}
                  <div className={`w-full ${i % 5 === 0 ? 'aspect-square' : 'aspect-[3/4]'} overflow-hidden`}>
                    {work.type === 'video' ? (
                      <video
                        src={work.mediaUrl}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        autoPlay loop muted playsInline
                      />
                    ) : (
                      <img
                        src={work.mediaUrl}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 md:p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#DC143C] mb-1">{work.category}</p>
                    <h3 className="text-base md:text-lg font-bold text-white leading-tight uppercase tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {work.title}
                    </h3>
                  </div>

                  {/* Red corner glow on hover */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#DC143C]/0 group-hover:bg-[#DC143C]/10 blur-xl transition-all duration-500" />
                </div>

                {/* Tape strip — only on some */}
                {i % 3 === 0 && (
                  <div className="tape absolute -top-1.5 left-1/2 -translate-x-1/2 w-14 h-4 rotate-[-1deg] z-10" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Decorative vinyl */}
        <FloatingDoodle className="absolute -right-8 bottom-20 opacity-10" amplitude={8} duration={7}>
          <div className="vinyl-spin">
            <VinylSVG size={120} />
          </div>
        </FloatingDoodle>
      </div>

      {/* ====== LIGHTBOX ====== */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedWork(null)}
          >
            <div className="grain" />

            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 w-12 h-12 border border-[#2a2a2a] hover:border-[#DC143C] flex items-center justify-center text-[#d4c5a9] hover:text-[#DC143C] transition-colors z-10"
              onClick={() => setSelectedWork(null)}
            >
              ✕
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-[#2a2a2a] overflow-hidden max-w-5xl w-full flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Media */}
              <div className="w-full md:w-2/3 bg-black flex items-center justify-center overflow-hidden max-h-[50vh] md:max-h-none">
                {selectedWork.type === 'video' ? (
                  <video src={selectedWork.mediaUrl} className="max-w-full max-h-full object-contain" controls autoPlay />
                ) : (
                  <img src={selectedWork.mediaUrl} alt={selectedWork.title} className="max-w-full max-h-full object-contain" />
                )}
              </div>

              {/* Info */}
              <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col justify-center border-l border-[#2a2a2a]">
                <p className="text-xs uppercase tracking-[0.3em] text-[#DC143C] mb-2">{selectedWork.category}</p>
                <h3 className="text-2xl md:text-3xl text-white uppercase tracking-wider mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {selectedWork.title}
                </h3>
                <p className="text-[#d4c5a9]/60 text-sm leading-relaxed mb-6">{selectedWork.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedWork.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider text-[#d4c5a9]/30 border border-[#2a2a2a] px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[#d4c5a9]/20 text-xs mt-6 uppercase tracking-widest">{selectedWork.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ======================================================
   CONTACT SECTION — Minimal & Artistic
   ====================================================== */
function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-5 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#120505] via-[#0a0a0a] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <FadeSlide>
          <p className="text-xs uppercase tracking-[0.4em] text-[#DC143C]/70 font-medium mb-4">Get in Touch</p>
        </FadeSlide>

        <FadeSlide delay={0.1}>
          <h2 className="text-5xl md:text-8xl uppercase tracking-[0.08em] text-white leading-[0.9] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Got a idea in mind?<span className="text-[#DC143C]">?</span>
          </h2>
        </FadeSlide>

        <FadeSlide delay={0.15}>
          <p className="text-[#d4c5a9]/50 text-lg mb-12" style={{ fontFamily: "'Caveat', cursive" }}>
            Let's bring it to life. Drop a message  on insta or mail and let's create something raw.
          </p>
        </FadeSlide>

        <FadeSlide delay={0.2}>
          <form action="https://formspree.io/f/placeholder" method="POST" className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text" name="name" required placeholder="YOUR NAME"
                className="w-full px-5 py-4 bg-transparent border border-[#2a2a2a] text-[#d4c5a9] text-xs uppercase tracking-[0.2em] placeholder-[#d4c5a9]/20 focus:outline-none focus:border-[#8B0000] transition-colors"
              />
              <input
                type="email" name="email" required placeholder="YOUR EMAIL"
                className="w-full px-5 py-4 bg-transparent border border-[#2a2a2a] text-[#d4c5a9] text-xs uppercase tracking-[0.2em] placeholder-[#d4c5a9]/20 focus:outline-none focus:border-[#8B0000] transition-colors"
              />
            </div>
            <input
              type="text" name="subject" required placeholder="SUBJECT"
              className="w-full px-5 py-4 bg-transparent border border-[#2a2a2a] text-[#d4c5a9] text-xs uppercase tracking-[0.2em] placeholder-[#d4c5a9]/20 focus:outline-none focus:border-[#8B0000] transition-colors"
            />
            <textarea
              name="message" required rows="5" placeholder="YOUR MESSAGE..."
              className="w-full px-5 py-4 bg-transparent border border-[#2a2a2a] text-[#d4c5a9] text-xs uppercase tracking-[0.2em] placeholder-[#d4c5a9]/20 focus:outline-none focus:border-[#8B0000] transition-colors resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-5 bg-[#DC143C] text-white text-sm uppercase tracking-[0.3em] font-bold hover:bg-[#8B0000] transition-colors"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem', letterSpacing: '0.2em' }}
            >
              Send Message
            </motion.button>
          </form>
        </FadeSlide>


        <FadeSlide delay={0.3}>
          <div className="mt-16 flex justify-center gap-6">
            {[
              {
                label: 'Instagram',
                icon: <FaInstagram size={18} />,
                link: 'https://www.instagram.com/radio.2009?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' // <-- yahan apna username daal
              },
              {
                label: 'Pinterest',
                icon: <FaPinterestP size={18} />,
                link: 'https://in.pinterest.com/Radio2009/'
              },
              {
                label: 'Email',
                icon: <MdEmail size={18} />,
                link: 'mailto:youremail@gmail.com'
              },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, borderColor: '#DC143C' }}
                className="w-12 h-12 border border-[#2a2a2a] flex items-center justify-center text-[#d4c5a9]/40 hover:text-[#DC143C] transition-colors"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </FadeSlide>
      </div>
    </section>
  );
}

/* ======================================================
   FOOTER — Minimal
   ====================================================== */
function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] py-8 px-5 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#d4c5a9]/20 text-xs uppercase tracking-[0.2em]">© 2026 Radio.2009</p>
        <p className="text-[#d4c5a9]/10 text-xs uppercase tracking-[0.15em]">Art & Visuals</p>
      </div>
    </footer>
  );
}

/* ======================================================
   APP — Root
   ====================================================== */
function App() {
  return (
    <div className="relative">
      {/* Global noise overlay */}
      <div className="noise-overlay" />

      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
