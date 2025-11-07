
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#060010',
  hoveredPillTextColor = '#060010',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) document.fonts.ready.then(layout).catch(() => {});

    const menu = mobileMenuRef.current;
    if (menu) gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;
      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, { scale: 1, duration: 0.6, ease });
      }
      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, { width: 'auto', duration: 0.6, ease });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: 'auto' });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: 'auto' });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, { rotate: 360, duration: 0.2, ease, overwrite: 'auto' });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(menu, { opacity: 0, y: 10, scaleY: 1 }, { opacity: 1, y: 0, scaleY: 1, duration: 0.3, ease });
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          onComplete: () => gsap.set(menu, { visibility: 'hidden' })
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = href =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = href => href && !isExternalLink(href);

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '42px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '3px'
  };

  return (
    <div className="absolute top-[1em] z-[1000] w-full left-0 md:w-auto md:left-auto">
      <nav
        className={`w-full md:w-max flex items-center justify-start box-border px-6 md:px-10 ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        {/* ✅ Normal Logo on Left */}
        {isRouterLink(items?.[0]?.href) ? (
         <Link
  to={items[0].href}
  aria-label="Home"
  onMouseEnter={handleLogoEnter}
  ref={logoRef}
  className="inline-flex items-center justify-center overflow-hidden mr-20 md:mr-[8rem]"
  style={{ height: 'var(--nav-h)', background: 'transparent' }}
>

            <img src={logo} alt={logoAlt} ref={logoImgRef} className="h-full w-auto object-contain block" />
          </Link>
        ) : (
          <a
            href={items?.[0]?.href || '#'}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            ref={logoRef}
            className="inline-flex items-center justify-center overflow-hidden mr-10"
            style={{ height: 'var(--nav-h)', background: 'transparent' }}
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} className="h-full w-auto object-contain block" />
          </a>
        )}

        {/* 🔹 Navigation Items */}
        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex"
          style={{ height: 'var(--nav-h)', background: 'var(--base, #000)' }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[3px] h-full"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;
              const pillStyle = {
                background: 'var(--pill-bg, #fff)',
                color: 'var(--pill-text, var(--base, #000))',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              };
              const basePillClasses =
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0';

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{ background: 'var(--base, #000)', willChange: 'transform' }}
                    ref={el => (circleRefs.current[i] = el)}
                  />
                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                    <span className="pill-label relative z-[2]" style={{ willChange: 'transform' }}>
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3]"
                      style={{ color: 'var(--hover-text, #fff)', willChange: 'transform, opacity' }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                      style={{ background: 'var(--base, #000)' }}
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              return (
                <li key={item.href} role="none" className="flex h-full">
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      to={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* ☰ Mobile Button */}
        {/* ☰ Mobile Menu Button */}
<button
  ref={hamburgerRef}
  onClick={toggleMobileMenu}
  aria-label="Toggle menu"
  aria-expanded={isMobileMenuOpen}
  className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative ml-auto z-[1001]"
  style={{
    width: 'var(--nav-h)',
    height: 'var(--nav-h)',
    background: 'var(--base, #000)',
  }}
>
  <span className="hamburger-line w-5 h-0.5 rounded transition-all duration-300" style={{ background: 'var(--pill-bg, #fff)' }} />
  <span className="hamburger-line w-5 h-0.5 rounded transition-all duration-300" style={{ background: 'var(--pill-bg, #fff)' }} />
</button>

{/* 🌙 Animated Mobile Menu Overlay */}
{/* 🌙 Animated Mobile Menu Overlay (Pill Style, Corrected) */}
<div
  ref={mobileMenuRef}
  className="fixed inset-0 z-[999] flex flex-col items-center justify-center space-y-4 md:hidden"
  style={{
    background: 'rgba(12, 12, 20, 0.9)',
    color: '#fff',
    visibility: 'hidden',
    opacity: 0,
    transform: 'translateY(20px)',
    fontFamily: "'Poppins', sans-serif",
  }}
>
  <ul className="list-none flex flex-col items-center justify-center gap-4 m-0 p-0 w-full">
    {items.map((item, i) => (
      <li key={item.href} className="relative w-3/4">
        <Link
          to={item.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className="relative flex items-center justify-center h-14 rounded-full cursor-pointer overflow-hidden group"
        >
          {/* Background pill animation */}
          <span
            className="absolute inset-0 bg-[#22c55e]/20 rounded-full transform scale-0 group-hover:scale-105 transition-transform duration-300 ease-out"
          />
          {/* Pill label */}
          <span className="relative z-10 text-lg font-semibold text-white uppercase tracking-wide group-hover:text-[#22c55e] transition-colors duration-300">
            {item.label}
          </span>
          {/* Optional glowing border */}
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_#22c55e]" />
        </Link>
      </li>
    ))}
  </ul>
</div>


      </nav>
    </div>
  );
};

export default PillNav;
