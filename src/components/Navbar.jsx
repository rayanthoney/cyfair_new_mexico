import React from 'react';
import { useGSAP } from '@gsap/react';
import { navLinks } from '../../constants/index.js';
import gsap from 'gsap';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [activeLink, setActiveLink] = React.useState('home');

    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        });

        navTween.to('nav', {
            backgroundColor: '#00000090',
            backdropFilter: 'blur(10px)',
            duration: 0.3,
            ease: 'power1.inOut',
        });
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => document.getElementById(link.id));
            const scrollPosition = window.scrollY + 100; // Offset for navbar height

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveLink(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Toggle body scroll lock
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <nav className="fixed w-full z-50 transition-colors duration-300">
            <div className="container mx-auto px-5 py-4 flex justify-between items-center">
                <a href="#home" className="flex items-center gap-2 z-[60] relative">
                    <img src='/images/webp/logo (2).webp' alt='logo' className="w-20 h-20 object-contain" />
                    <p className="font-anton text-2xl tracking-wider uppercase">CyFair Elite NM</p>
                </a>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden z-[60] text-3xl text-white focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? (
                        <span className="font-sans">✕</span>
                    ) : (
                        <span className="font-sans">☰</span>
                    )}
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                className={`text-sm font-medium hover:text-yellow transition-colors uppercase tracking-widest ${activeLink === link.id ? 'text-yellow' : ''}`}
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col justify-center items-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={handleLinkClick}
                            className={`text-2xl font-anton uppercase tracking-widest hover:text-yellow transition-colors ${activeLink === link.id ? 'text-yellow' : 'text-white'}`}
                        >
                            {link.title}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;