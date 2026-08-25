import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import { 
  Music, Sparkles, X, Play, Pause, SkipForward, SkipBack, 
  Volume2, VolumeX, Cake, ChevronDown 
} from 'lucide-react';

/* ====== LETTER TYPEWRITER SUB-COMPONENT ====== */
function LetterTypewriter() {
  const letterRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);

  const letterLines = [
    { text: "Happy 20th Birthday, Kiki ✨", style: "greeting" },
    { text: "", style: "spacer" },
    { text: "I know your birthday is still months away, but I just wanted to be a little early this time. Sooo.. happy birthday, Kiki!", style: "body" },
    { text: "", style: "spacer" },
    { text: "Entering your 20s is a meaningful milestone. May your 20s be full of blessings, joy, good health, and peace of mind.", style: "body" },
    { text: "", style: "spacer" },
    { text: "Thank you for the good memories and lessons from the past. I truly hope you continue to grow, achieve your dreams, and find happiness in every step of your journey ahead.", style: "body" },
    { text: "", style: "spacer" },
    { text: "Wishing you only the best on your 20th birthday and beyond.", style: "ps" },
  ];

  // Trigger typewriter when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (letterRef.current) observer.observe(letterRef.current);
    return () => observer.disconnect();
  }, [started]);

  // Typewriter engine
  useEffect(() => {
    if (!started) return;
    if (currentLine >= letterLines.length) return;

    const line = letterLines[currentLine];

    // Spacer lines — skip immediately
    if (line.style === "spacer") {
      setDisplayedLines(prev => [...prev, { text: "", style: "spacer" }]);
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 150);
      return;
    }

    if (currentChar <= line.text.length) {
      const timer = setTimeout(() => {
        const partial = line.text.slice(0, currentChar);
        
        setDisplayedLines(prev => {
          const copy = [...prev];
          const lastIdx = copy.length - 1;
          if (lastIdx >= 0 && copy[lastIdx].style === line.style && copy[lastIdx]._lineIdx === currentLine) {
            copy[lastIdx] = { text: partial, style: line.style, _lineIdx: currentLine };
          } else {
            copy.push({ text: partial, style: line.style, _lineIdx: currentLine });
          }
          return copy;
        });

        setCurrentChar(prev => prev + 1);
      }, 28);

      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 300);
    }
  }, [started, currentLine, currentChar]);

  const isTyping = currentLine < letterLines.length;

  const getLineStyle = (style) => {
    switch (style) {
      case 'greeting':
        return { fontWeight: '600', marginBottom: '4px', fontSize: '1.08rem', color: '#38bdf8', fontFamily: 'var(--font-display)' };
      case 'ps':
        return { marginBottom: '0', fontStyle: 'italic', color: '#38bdf8', fontWeight: '500' };
      case 'spacer':
        return { height: '10px' };
      default:
        return { marginBottom: '4px' };
    }
  };

  return (
    <div
      ref={letterRef}
      style={{
        background: 'linear-gradient(165deg, rgba(10, 30, 63, 0.85) 0%, rgba(4, 16, 38, 0.92) 100%)',
        borderRadius: '28px',
        border: '1.5px solid rgba(96, 165, 250, 0.35)',
        padding: '28px 20px 24px',
        position: 'relative',
        boxShadow: '0 18px 40px rgba(0,0,0,0.7), inset 0 0 20px rgba(0, 210, 255, 0.1)',
        marginBottom: '36px',
      }}
    >
      {/* Decorative Ornaments */}
      <div style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '1.4rem', filter: 'drop-shadow(0 0 6px #00d2ff)' }}>✨</div>
      <div style={{ position: 'absolute', top: '12px', right: '16px', fontSize: '1.4rem', filter: 'drop-shadow(0 0 6px #38bdf8)' }}>🔹</div>
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '1.3rem', filter: 'drop-shadow(0 0 6px #60a5fa)' }}>🌿</div>

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
          — A BIRTHDAY NOTE —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', marginBottom: '4px' }}>
          A Letter For You
        </h3>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 14px',
            background: 'rgba(0, 210, 255, 0.15)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            borderRadius: '16px',
            fontSize: '0.78rem',
            color: '#e0f2fe',
            marginTop: '4px',
          }}
        >
          <span>✨</span>
          <span>Birthday Wishes</span>
          <span>✨</span>
        </div>
      </div>

      {/* Typewriter Letter Content */}
      <div style={{ fontSize: '0.92rem', lineHeight: '1.65', color: '#e0f2fe', position: 'relative', zIndex: 2, minHeight: '200px' }}>
        {displayedLines.map((line, i) => (
          <div key={i} style={getLineStyle(line.style)}>
            {line.text}
            {i === displayedLines.length - 1 && isTyping && line.style !== 'spacer' && (
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '14px',
                  backgroundColor: '#00d2ff',
                  marginLeft: '3px',
                  verticalAlign: 'middle',
                  boxShadow: '0 0 8px #00d2ff',
                  animation: 'pulseGlow 0.6s infinite alternate',
                }}
              />
            )}
          </div>
        ))}

        {/* Signature requested: "dearest L" */}
        {!isTyping && displayedLines.length > 0 && (
          <div
            style={{
              marginTop: '22px',
              textAlign: 'right',
              fontWeight: '600',
              color: '#38bdf8',
              fontSize: '0.95rem',
              opacity: 0,
              animation: 'fadeInUp 0.8s forwards 0.3s',
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#38bdf8', textShadow: '0 0 10px rgba(56,189,248,0.5)' }}>
              dearest L
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ====== ELEGANT FAREWELL SECTION SUB-COMPONENT ====== */
function FarewellSection({ onOpenCake }) {
  const farewellRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          const tl = gsap.timeline({ defaults: { ease: 'back.out(1.5)', duration: 0.7 } });

          tl.fromTo('.farewell-eyebrow',
            { opacity: 0, y: -15, scale: 0.85 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5 }
          )
          .fromTo('.farewell-title',
            { opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.9 },
            { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 0.8 },
            '-=0.3'
          )
          .fromTo('.farewell-message',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo('.farewell-blossom',
            { opacity: 0, scale: 0.3, rotate: -45 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2)' },
            '-=0.3'
          )
          .fromTo('.farewell-closing',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo('.farewell-btn',
            { opacity: 0, scale: 0.6, y: 25 },
            { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.8)' },
            '-=0.2'
          );
        }
      },
      { threshold: 0.1 }
    );

    if (farewellRef.current) observer.observe(farewellRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div
      ref={farewellRef}
      style={{
        textAlign: 'center',
        marginTop: '10px',
        paddingTop: '30px',
        paddingBottom: '50px',
        position: 'relative',
      }}
    >
      {/* Ambient floating elements */}
      <div style={{ position: 'absolute', top: '8%', left: '10%', fontSize: '1rem', opacity: 0.5, filter: 'drop-shadow(0 0 6px #00d2ff)' }}>✨</div>
      <div style={{ position: 'absolute', top: '5%', right: '12%', fontSize: '0.9rem', opacity: 0.4, filter: 'drop-shadow(0 0 6px #38bdf8)' }}>🔹</div>
      <div style={{ position: 'absolute', bottom: '20%', left: '6%', fontSize: '0.8rem', opacity: 0.35, filter: 'drop-shadow(0 0 6px #00d2ff)' }}>🌿</div>
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', fontSize: '0.85rem', opacity: 0.4, filter: 'drop-shadow(0 0 6px #38bdf8)' }}>✨</div>

      {/* Eyebrow */}
      <p
        className="farewell-eyebrow"
        style={{
          fontSize: '0.85rem',
          color: '#38bdf8',
          marginBottom: '18px',
          letterSpacing: '0.5px',
        }}
      >
        ✨ Sincere Wishes for You ✨
      </p>

      {/* Main Title */}
      <h2
        className="farewell-title"
        style={{
          fontFamily: "'Playfair Display', 'Cinzel', serif",
          fontSize: '1.9rem',
          lineHeight: '1.25',
          color: '#fff',
          textShadow: '0 0 15px rgba(0, 210, 255, 0.5), 0 0 30px rgba(0, 210, 255, 0.3)',
          marginBottom: '20px',
          fontWeight: '600',
        }}
      >
        May your 20s<br />
        <span
          style={{
            fontStyle: 'italic',
            color: '#38bdf8',
            textShadow: '0 0 20px rgba(56, 189, 248, 0.6), 0 0 40px rgba(0, 210, 255, 0.4)',
          }}
        >
          be full of blessings
        </span>
        <br />
        joy and health
      </h2>

      {/* Birthday Message Paragraph */}
      <p
        className="farewell-message"
        style={{
          fontSize: '0.88rem',
          lineHeight: '1.7',
          color: 'rgba(224, 242, 254, 0.85)',
          maxWidth: '320px',
          margin: '0 auto 22px',
          fontWeight: '400',
        }}
      >
        Happy 20th Birthday, Kiki ✨<br /><br />
        I know your birthday is still months away, but I just wanted to be a little early this time. Sooo.. happy birthday, Kiki! May your 20s be full of blessings, joy, and good health. Wishing you peace, wisdom, and success in everything ahead.
      </p>

      {/* Center Flower Bucket PNG Ornament */}
      <div
        className="farewell-blossom"
        style={{
          marginBottom: '18px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src="/bucket bunga 2 no bg.png"
          alt="Flower Bucket"
          style={{
            width: '85px',
            height: 'auto',
            filter: 'drop-shadow(0 0 16px #00d2ff) drop-shadow(0 0 30px #38bdf8)',
          }}
        />
      </div>

      {/* Closing Line */}
      <p
        className="farewell-closing"
        style={{
          fontFamily: "'Playfair Display', 'Cinzel', serif",
          fontStyle: 'italic',
          fontSize: '0.92rem',
          color: 'rgba(224, 242, 254, 0.7)',
          letterSpacing: '0.3px',
          marginBottom: '26px',
        }}
      >
        — Wishing you peace & happiness in your 20s ✨ —
      </p>

      {/* Birthday Wish Button */}
      <button
        className="farewell-btn"
        onClick={onOpenCake}
        style={{
          background: 'linear-gradient(135deg, #00d2ff 0%, #38bdf8 100%)',
          color: '#fff',
          border: 'none',
          padding: '13px 30px',
          borderRadius: '30px',
          fontSize: '0.95rem',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 0 25px var(--neon-pink), 0 0 50px rgba(0, 210, 255, 0.3)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 35px var(--neon-pink-light), 0 0 60px var(--neon-pink)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 0 25px var(--neon-pink), 0 0 50px rgba(0, 210, 255, 0.3)';
        }}
      >
        <Sparkles size={18} /> Birthday Wishes ✨
      </button>
    </div>
  );
}

/* ====== PERSONAL MESSAGE CARD SUB-COMPONENT ====== */
function PersonalMessageCard() {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      style={{
        background: 'linear-gradient(165deg, rgba(10, 30, 63, 0.85) 0%, rgba(4, 16, 38, 0.92) 100%)',
        borderRadius: '28px',
        border: '1.5px solid rgba(96, 165, 250, 0.4)',
        padding: '26px 20px',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 18px 40px rgba(0,0,0,0.7), inset 0 0 20px rgba(0, 210, 255, 0.1)',
        marginBottom: '36px',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.2) 0%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '6px' }}>
        — A THOUGHTFUL NOTE —
      </p>
      
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: '#ffffff', marginBottom: '16px' }}>
        A Warm Note For You ✨
      </h3>

      <div
        style={{
          padding: '20px 18px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          border: '1px solid rgba(96, 165, 250, 0.25)',
          boxShadow: 'inset 0 0 15px rgba(0, 210, 255, 0.08)',
        }}
      >
        <p
          style={{
            fontSize: '0.94rem',
            lineHeight: '1.75',
            color: '#e0f2fe',
            fontStyle: 'italic',
            fontWeight: '400',
            margin: 0,
            fontFamily: 'var(--font-body)',
          }}
        >
          "As you step into your 20s, may you always find strength in challenges and clarity in your choices. Thank you for the memories and good moments we shared. I genuinely wish you happiness, good health, and a peaceful journey ahead."
        </p>
      </div>
    </div>
  );
}

export default function MainBirthdayPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const happyRef = useRef(null);
  const birthdayRef = useRef(null);
  const agaaRef = useRef(null);
  const eyebrowRef = useRef(null);
  const dateRef = useRef(null);
  
  // Typewriter effect state
  const fullGreetingText = "i know ur birthday is still months away, but i just want to be a little early this time. Sooo.. happi bdayy kikiii ✨";
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullGreetingText.length) {
        setTypedText(fullGreetingText.slice(0, index));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(timer);
      }
    }, 55);

    // Auto-play music automatically when unlocked after opening gift box
    const autoPlayTimer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('Autoplay deferred:', err));
      }
    }, 300);

    return () => {
      clearInterval(timer);
      clearTimeout(autoPlayTimer);
    };
  }, []);

  // 1. Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef(null);
  const vinylRef = useRef(null);

  const playlist = [
    { id: 1, title: 'Heaven', artist: 'Bryan Adams', duration: '4:12', src: '/Heaven.mp3' },
  ];

  // 2. Digital Bouquet Flowers State (5 Flowers with exact requested quotes)
  const [activeFlower, setActiveFlower] = useState('lily');
  const flowerCompliments = {
    lily: {
      name: "Lily",
      icon: "🪷",
      color: "#38bdf8",
      text: "Some flowers bloom for a season, yet their beauty stays in our memory."
    },
    daisy: {
      name: "Daisy",
      icon: "🌼",
      color: "#fde047",
      text: "Some memories are like daisies.. simple, gentle, and worth keeping, even after the season ends."
    },
    sunflower: {
      name: "Sunflower",
      icon: "🌻",
      color: "#fbbf24",
      text: "May you always find your way back to the light, just like a sunflower."
    },
    tulip: {
      name: "Tulip",
      icon: "🌷",
      color: "#f472b6",
      text: "Some flowers bloom for only a season, but the memories they leave behind can last much longer."
    },
    dandelion: {
      name: "Dandelion",
      icon: "🌾",
      color: "#cbd5e1",
      text: "Like a dandelion, may you learn to let go of what no longer belongs to you, and trust that something beautiful will grow from it."
    }
  };

  // 3. Jar of Notes State
  const jarRef = useRef(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const jarNotes = [
    "May you always find peace in the choices you make and strength in every step you take. ✨",
    "Some things are meant for a season, and that's okay. May what's ahead bring even greater growth and happiness. 🌿",
    "May you always find your way back to the light, no matter how tough the days feel. 🌻",
    "Wishing you genuine joy, good health, and peace of mind in your 20s. 🤍"
  ];

  // 4. Final Birthday Cake Modal State
  const [showCakeModal, setShowCakeModal] = useState(false);

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: -20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    )
    .fromTo(happyRef.current,
      { opacity: 0, y: 35, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
      '-=0.5'
    )
    .fromTo(birthdayRef.current,
      { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'back.out(1.5)' },
      '-=0.6'
    )
    .fromTo(agaaRef.current,
      { opacity: 0, y: 35, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
      '-=0.6'
    )
    .fromTo(dateRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    );

    const flowers = gsap.utils.toArray('.floating-hero-flower');
    flowers.forEach((flower, i) => {
      gsap.to(flower, {
        y: i % 2 === 0 ? -16 : 16,
        rotation: i % 2 === 0 ? 25 : -25,
        scale: 1.15,
        duration: 2.5 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });

    gsap.to(birthdayRef.current, {
      filter: 'drop-shadow(0 0 25px #00d2ff) drop-shadow(0 0 45px #38bdf8)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero-scroll-indicator', {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    if (isPlaying) {
      gsap.to(vinylRef.current, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: 'none',
      });
    } else {
      gsap.killTweensOf(vinylRef.current);
    }
  }, { scope: containerRef, dependencies: [isPlaying] });

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const playSpecificTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 50);
  };

  const nextTrack = () => {
    const nextIdx = (currentTrack + 1) % playlist.length;
    playSpecificTrack(nextIdx);
  };

  const prevTrack = () => {
    const prevIdx = (currentTrack - 1 + playlist.length) % playlist.length;
    playSpecificTrack(prevIdx);
  };

  const handleFlowerSelect = (key) => {
    setActiveFlower(key);

    gsap.fromTo(`.flower-node-${key}`,
      { scale: 0.8, rotate: -15 },
      { scale: 1.25, rotate: 0, duration: 0.4, ease: 'back.out(2)' }
    );

    gsap.fromTo('.compliment-toast-box',
      { opacity: 0, y: 15, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
    );
  };

  const handleShakeJar = () => {
    if (!jarRef.current) return;

    setSelectedNote(null);
    const tl = gsap.timeline();

    tl.to(jarRef.current, {
      rotation: -22,
      scale: 1.18,
      y: -10,
      duration: 0.09,
      ease: 'power1.out',
    })
    .to(jarRef.current, {
      rotation: 22,
      y: -12,
      duration: 0.09,
      ease: 'power1.inOut',
    })
    .to(jarRef.current, {
      rotation: -16,
      y: -8,
      duration: 0.09,
      ease: 'power1.inOut',
    })
    .to(jarRef.current, {
      rotation: 16,
      y: -6,
      duration: 0.09,
      ease: 'power1.inOut',
    })
    .to(jarRef.current, {
      rotation: -8,
      y: -3,
      duration: 0.08,
      ease: 'power1.inOut',
    })
    .to(jarRef.current, {
      rotation: 0,
      scale: 1,
      y: 0,
      duration: 0.15,
      ease: 'back.out(2)',
      onComplete: () => {
        const randomNote = jarNotes[Math.floor(Math.random() * jarNotes.length)];
        setSelectedNote(randomNote);

        requestAnimationFrame(() => {
          gsap.fromTo('.note-popup',
            { 
              opacity: 0, 
              scale: 0.2, 
              y: 50,
              rotation: -15,
              filter: 'blur(8px)',
            },
            { 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              rotation: 0, 
              filter: 'blur(0px)',
              duration: 0.65, 
              ease: 'back.out(1.8)',
            }
          );
        });
      }
    });
  };

  const handleOpenCakeModal = () => {
    setShowCakeModal(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#00d2ff', '#38bdf8', '#0066ff', '#ffffff', '#fbbf24'],
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        flexShrink: 0,
        padding: '24px 16px 80px',
        color: '#fff',
        position: 'relative',
      }}
    >
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src={playlist[currentTrack].src}
        onEnded={nextTrack}
        onTimeUpdate={() => {
          if (audioRef.current) {
            const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setAudioProgress(pct || 0);
          }
        }}
      />

      {/* Floating Audio Quick Toggle Button (Bottom Right) */}
      <button
        onClick={togglePlay}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 90,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
          border: '1.5px solid rgba(255,255,255,0.7)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px #00d2ff, 0 4px 12px rgba(0,0,0,0.4)',
          cursor: 'pointer',
        }}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      {/* SECTION 1: HERO HEADER WITH TYPEWRITER EFFECT */}
      <div
        ref={heroRef}
        style={{
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          padding: '30px 0 10px',
          marginBottom: '36px',
        }}
      >
        {/* Animated Floating Elements around Hero */}
        <div className="floating-hero-flower" style={{ position: 'absolute', top: '4%', left: '8%', fontSize: '1.6rem', filter: 'drop-shadow(0 0 8px #00d2ff)' }}>✨</div>
        <div className="floating-hero-flower" style={{ position: 'absolute', top: '12%', right: '8%', fontSize: '1.8rem', filter: 'drop-shadow(0 0 8px #38bdf8)' }}>🔹</div>
        <div className="floating-hero-flower" style={{ position: 'absolute', top: '45%', left: '4%', fontSize: '1.5rem', filter: 'drop-shadow(0 0 8px #00d2ff)' }}>🌿</div>
        <div className="floating-hero-flower" style={{ position: 'absolute', top: '48%', right: '6%', fontSize: '1.7rem', filter: 'drop-shadow(0 0 8px #38bdf8)' }}>✨</div>

        {/* Ambient Glowing Aura */}
        <div
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 210, 255, 0.4) 0%, transparent 70%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Eyebrow Tag */}
        <div
          ref={eyebrowRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.82rem',
            color: '#7dd3fc',
            marginBottom: '20px',
            letterSpacing: '0.5px',
            textShadow: '0 0 8px rgba(0, 210, 255, 0.6)',
            padding: '0 8px',
          }}
        >
          <span>✨</span>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}>A special 20th birthday wish for Kiki</span>
          <span>✨</span>
        </div>

        {/* Title: Happy 20th Birthday, Kiki */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            lineHeight: '1.15',
            marginBottom: '16px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            ref={happyRef}
            style={{
              fontSize: '2.5rem',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '0.5px',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
            }}
          >
            Happy 20th Birthday,
          </div>
          <div
            ref={birthdayRef}
            style={{
              fontSize: '3.1rem',
              fontStyle: 'italic',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #38bdf8 0%, #00d2ff 50%, #0066ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 15px rgba(0, 210, 255, 0.8))',
              margin: '6px 0',
              letterSpacing: '0.5px',
            }}
          >
            Kiki ✨
          </div>
          <div
            ref={agaaRef}
            style={{
              fontSize: '1.05rem',
              fontWeight: '500',
              color: '#e0f2fe',
              letterSpacing: '0.5px',
              marginTop: '8px',
            }}
          >
            May ur 20s full of blessed, joy n health!
          </div>
        </div>

        {/* Typewriter Greeting Text Animation */}
        <div
          style={{
            minHeight: '32px',
            marginBottom: '20px',
            padding: '0 12px',
          }}
        >
          <p
            style={{
              fontSize: '0.92rem',
              fontStyle: 'italic',
              color: '#e0f2fe',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.5px',
              textShadow: '0 0 10px rgba(0, 210, 255, 0.8)',
            }}
          >
            {typedText}
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '14px',
                backgroundColor: '#00d2ff',
                marginLeft: '3px',
                verticalAlign: 'middle',
                boxShadow: '0 0 8px #00d2ff',
                opacity: isTypingDone ? 0.3 : 1,
                animation: 'pulseGlow 0.8s infinite alternate',
              }}
            />
          </p>
        </div>

        {/* Thin Horizontal Divider */}
        <div
          style={{
            width: '140px',
            height: '1.5px',
            background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8), transparent)',
            marginBottom: '22px',
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.5)',
          }}
        />

        {/* Subtitle Date / Blessing */}
        <div
          ref={dateRef}
          style={{
            fontSize: '0.78rem',
            letterSpacing: '2px',
            color: 'rgba(224, 242, 254, 0.85)',
            fontWeight: '600',
            textTransform: 'uppercase',
            textShadow: '0 0 8px rgba(0, 210, 255, 0.4)',
            marginBottom: '28px',
          }}
        >
          HAPPY 20TH BIRTHDAY KIKI ✨
        </div>

        {/* Scroll Down Bounce Arrow */}
        <div className="hero-scroll-indicator" style={{ opacity: 0.8 }}>
          <ChevronDown size={22} color="#38bdf8" style={{ filter: 'drop-shadow(0 0 8px #00d2ff)' }} />
        </div>
      </div>

      {/* SECTION 2: A DIGITAL BOUQUET WITH 5 REQUESTED FLOWERS */}
      <div
        style={{
          background: 'rgba(10, 30, 63, 0.75)',
          backdropFilter: 'blur(18px)',
          borderRadius: '28px',
          border: '1.5px solid rgba(96, 165, 250, 0.35)',
          padding: '24px 12px',
          textAlign: 'center',
          boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 20px rgba(0,210,255,0.1)',
          marginBottom: '36px',
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
          — A DIGITAL BOUQUET —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '4px' }}>
          A Digital Bouquet
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#7dd3fc', fontStyle: 'italic', marginBottom: '14px' }}>
          a small gift from me to uu 🤍
        </p>

        {/* Bouquet PNG Banner */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
          <img
            src="/bunga bucket no bg.png"
            alt="Bouquet Banner"
            style={{
              width: '80px',
              height: 'auto',
              filter: 'drop-shadow(0 0 14px #00d2ff) drop-shadow(0 0 25px #38bdf8)',
            }}
          />
        </div>

        {/* SVG Bouquet with 5 Stem Tips for: Lily, Daisy, Sunflower, Tulip, Dandelion */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '350px',
            height: '240px',
            margin: '0 auto 20px',
          }}
        >
          <svg viewBox="0 0 350 240" width="100%" height="100%">
            <defs>
              <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="60%" stopColor="#00d2ff" />
                <stop offset="100%" stopColor="#0052cc" />
              </linearGradient>
            </defs>

            {/* Stems Converging into Vase Center */}
            <path d="M 175 195 Q 90 140, 30 70" fill="none" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 85 130 Q 70 125, 65 140 Z" fill="#22c55e" />

            <path d="M 175 195 Q 125 110, 100 45" fill="none" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 125 110 Q 140 105, 140 120 Z" fill="#22c55e" />

            <path d="M 175 195 L 175 30" fill="none" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" />
            <path d="M 175 115 Q 160 105, 160 120 Z" fill="#22c55e" />

            <path d="M 175 195 Q 225 110, 250 45" fill="none" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 225 110 Q 210 105, 210 120 Z" fill="#22c55e" />

            <path d="M 175 195 Q 260 140, 320 70" fill="none" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 265 130 Q 280 125, 285 140 Z" fill="#22c55e" />

            {/* Bouquet Vase / Pot Base */}
            <path d="M 115 160 C 115 160, 95 215, 120 225 C 145 235, 205 235, 230 225 C 255 215, 235 160, 235 160 Z" fill="url(#potGrad)" stroke="#ffffff" strokeWidth="1.5" filter="drop-shadow(0 8px 15px rgba(0,0,0,0.6))" />
            <circle cx="175" cy="190" r="11" fill="#ffffff" />
            <circle cx="175" cy="190" r="7" fill="#00d2ff" />
            <path d="M 175 190 C 150 175, 140 200, 175 190 Z" fill="#ffffff" />
            <path d="M 175 190 C 200 175, 210 200, 175 190 Z" fill="#ffffff" />
          </svg>

          {/* 1. Lily */}
          <div
            className="flower-node-lily"
            onClick={() => handleFlowerSelect('lily')}
            style={{
              position: 'absolute',
              left: '4px',
              top: '32px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: activeFlower === 'lily' ? 'drop-shadow(0 0 16px #38bdf8)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: activeFlower === 'lily' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🪷
          </div>

          {/* 2. Daisy */}
          <div
            className="flower-node-daisy"
            onClick={() => handleFlowerSelect('daisy')}
            style={{
              position: 'absolute',
              left: '74px',
              top: '8px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: activeFlower === 'daisy' ? 'drop-shadow(0 0 16px #fde047)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: activeFlower === 'daisy' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌼
          </div>

          {/* 3. Sunflower */}
          <div
            className="flower-node-sunflower"
            onClick={() => handleFlowerSelect('sunflower')}
            style={{
              position: 'absolute',
              left: '50%',
              transform: activeFlower === 'sunflower' ? 'translateX(-50%) scale(1.3)' : 'translateX(-50%) scale(1)',
              top: '-14px',
              fontSize: '2.8rem',
              cursor: 'pointer',
              filter: activeFlower === 'sunflower' ? 'drop-shadow(0 0 18px #fbbf24)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌻
          </div>

          {/* 4. Tulip */}
          <div
            className="flower-node-tulip"
            onClick={() => handleFlowerSelect('tulip')}
            style={{
              position: 'absolute',
              right: '74px',
              top: '8px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: activeFlower === 'tulip' ? 'drop-shadow(0 0 16px #f472b6)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: activeFlower === 'tulip' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌷
          </div>

          {/* 5. Dandelion */}
          <div
            className="flower-node-dandelion"
            onClick={() => handleFlowerSelect('dandelion')}
            style={{
              position: 'absolute',
              right: '4px',
              top: '32px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: activeFlower === 'dandelion' ? 'drop-shadow(0 0 16px #cbd5e1)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: activeFlower === 'dandelion' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌾
          </div>
        </div>

        {/* Flower Selection Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '18px',
          }}
        >
          {Object.keys(flowerCompliments).map((key) => {
            const item = flowerCompliments[key];
            const isSelected = activeFlower === key;
            return (
              <button
                key={key}
                onClick={() => handleFlowerSelect(key)}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${item.color}44 0%, ${item.color}22 100%)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? `1.5px solid ${item.color}` : '1px solid rgba(96, 165, 250, 0.25)',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isSelected ? `0 0 15px ${item.color}66` : 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Compliment / Quote Message Box */}
        <div
          className="compliment-toast-box"
          style={{
            padding: '18px 16px',
            background: 'linear-gradient(135deg, rgba(10,30,63,0.9) 0%, rgba(4,16,38,0.95) 100%)',
            border: `1.5px solid ${flowerCompliments[activeFlower].color}`,
            borderRadius: '20px',
            boxShadow: `0 0 20px ${flowerCompliments[activeFlower].color}33`,
            transition: 'all 0.3s ease',
          }}
        >
          <p
            style={{
              fontSize: '0.92rem',
              lineHeight: '1.6',
              color: '#ffffff',
              fontWeight: '500',
              fontStyle: 'italic',
            }}
          >
            “{flowerCompliments[activeFlower].text}”
          </p>
        </div>
      </div>

      {/* SECTION 3: A LETTER FOR YOU — TYPEWRITER EFFECT */}
      <LetterTypewriter />

      {/* SECTION 4: PERSONAL MESSAGE CARD */}
      <PersonalMessageCard />

      {/* SECTION 5: SOUNDTRACK PLAYLIST (3 TRACKS SELECTOR) */}
      <div
        style={{
          background: 'rgba(10, 30, 63, 0.75)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1.5px solid rgba(96, 165, 250, 0.35)',
          padding: '22px 16px',
          textAlign: 'center',
          boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
          marginBottom: '36px',
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
          — SOUNDTRACK VIBES —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginBottom: '16px' }}>
          Our Playlist
        </h3>

        {/* Spinning Vinyl Disc */}
        <div
          style={{
            position: 'relative',
            width: '130px',
            height: '130px',
            margin: '0 auto 16px',
          }}
        >
          <div
            ref={vinylRef}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #333 15%, #111 20%, #222 35%, #050505 60%)',
              border: '3px solid rgba(0, 210, 255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(0,210,255,0.4)',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00d2ff 0%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Music size={20} color="#fff" />
            </div>
          </div>
        </div>

        {/* Track Title */}
        <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '2px', fontFamily: 'var(--font-display)' }}>
          {playlist[currentTrack].title}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          {playlist[currentTrack].artist}
        </p>

        {/* Audio Progress Slider Line */}
        <div
          style={{
            width: '100%',
            height: '5px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '10px',
            marginBottom: '16px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${audioProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00d2ff, #38bdf8)',
              transition: 'width 0.2s linear',
            }}
          />
        </div>

        {/* Playback Control Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
          <button onClick={prevTrack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <SkipBack size={24} />
          </button>

          <button
            onClick={togglePlay}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px #00d2ff',
              cursor: 'pointer',
            }}
          >
            {isPlaying ? <Pause size={24} fill="#fff" /> : <Play size={24} fill="#fff" style={{ marginLeft: '2px' }} />}
          </button>

          <button onClick={nextTrack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <SkipForward size={24} />
          </button>
        </div>

        {/* 3 Interactive Playlist Song List Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
          <p style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: '600', marginBottom: '2px', textAlign: 'center' }}>
            📜 Soundtrack Selection:
          </p>
          {playlist.map((song, index) => {
            const isSelected = index === currentTrack;
            return (
              <div
                key={song.id}
                onClick={() => playSpecificTrack(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '16px',
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(0,210,255,0.3) 0%, rgba(0,102,255,0.15) 100%)'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected
                    ? '1.5px solid var(--neon-pink)'
                    : '1px solid rgba(96, 165, 250, 0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 0 15px rgba(0,210,255,0.25)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isSelected ? '#00d2ff' : 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: '#fff',
                    }}
                  >
                    {isSelected && isPlaying ? <Music size={14} className="animate-spin" /> : index + 1}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: '600', color: isSelected ? '#ffffff' : '#e0f2fe' }}>
                      {song.title}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {song.artist}
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {song.duration}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 6: JAR OF NOTES */}
      <div
        style={{
          background: 'rgba(10, 30, 63, 0.65)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          padding: '20px 16px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          marginBottom: '36px',
          position: 'relative',
        }}
      >
        {/* Cute Mascot Mascot Sticker in Jar Section */}
        <img
          src="/lucu 2 no bg.png"
          alt="Cute Mascot 2"
          style={{
            position: 'absolute',
            top: '-20px',
            right: '12px',
            width: '58px',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px #00d2ff)',
            pointerEvents: 'none',
          }}
        />
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
          — WORDS OF ENCOURAGEMENT —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '4px' }}>
          Notes of Wisdom & Good Wishes
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Shake the jar to pick a note 📜
        </p>

        <div ref={jarRef} style={{ fontSize: '3.5rem', marginBottom: '12px', cursor: 'pointer' }} onClick={handleShakeJar}>
          🫙
        </div>

        <button
          onClick={handleShakeJar}
          style={{
            background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
            color: '#fff',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '20px',
            fontSize: '0.88rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(0,210,255,0.4)',
          }}
        >
          Shake the Jar ✨
        </button>

        {selectedNote && (
          <div
            className="note-popup"
            style={{
              marginTop: '26px',
              padding: '26px 16px 18px',
              background: 'linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%)',
              color: '#0f172a',
              borderRadius: '20px',
              border: '2.5px solid #38bdf8',
              fontSize: '0.92rem',
              fontWeight: '600',
              boxShadow: '0 12px 30px rgba(0,0,0,0.6), 0 0 25px rgba(0, 210, 255, 0.35)',
              lineHeight: '1.55',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            {/* Paper Washi Tape Header Ornament */}
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
                color: '#ffffff',
                padding: '4px 14px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                letterSpacing: '0.8px',
                fontWeight: '700',
                boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
                whiteSpace: 'nowrap',
                zIndex: 5,
              }}
            >
              📜 A THOUGHTFUL NOTE FOR KIKI ✨
            </div>

            <p style={{ marginTop: '4px', fontFamily: 'var(--font-body)' }}>
              "{selectedNote}"
            </p>
          </div>
        )}
      </div>

      {/* SECTION 7: ELEGANT FINAL WISHES */}
      <FarewellSection onOpenCake={handleOpenCakeModal} />

      {/* BIRTHDAY CAKE MODAL */}
      {showCakeModal && (
        <div
          onClick={() => setShowCakeModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, #0a1e3f 0%, #041026 100%)',
              border: '1.5px solid var(--neon-pink)',
              padding: '24px',
              borderRadius: '24px',
              maxWidth: '320px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 0 40px var(--neon-pink)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎂✨</div>
            <h3 className="neon-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '8px' }}>
              Happy 20th Birthday, Kiki!
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#e0f2fe', marginBottom: '20px', lineHeight: '1.5' }}>
              May your 20s be full of blessings, joy, good health, and peace of mind ✨
            </p>

            <button
              onClick={() => setShowCakeModal(false)}
              style={{
                padding: '8px 24px',
                background: 'rgba(0,210,255,0.2)',
                border: '1px solid var(--neon-pink)',
                color: '#fff',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Close ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
