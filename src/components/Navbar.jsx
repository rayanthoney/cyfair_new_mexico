import { useGSAP } from '@gsap/react';
import { navLinks } from '../../constants/index.js';
import gsap from 'gsap';

const Navbar = () => {
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

    return (
        <nav className="fixed w-full z-50 transition-colors duration-300">
            <div className="container mx-auto px-5 py-4 flex justify-between items-center">
                <a href="#home" className="flex items-center gap-2 z-[60] relative">
                    <img src='/images/webp/logo (2).webp' alt='logo' className="w-20 h-20 object-contain" />
                    <p className="font-anton text-2xl tracking-wider uppercase">CyFair Elite NM</p>
                </a>

                {/* Desktop Menu - Always Visible */}
                <ul className="flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                className="text-sm font-medium hover:text-yellow transition-colors uppercase tracking-widest"
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;