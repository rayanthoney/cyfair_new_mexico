import gsap from 'gsap';
import { SplitText } from 'gsap/all'
import { useGSAP } from "@gsap/react";

const About = () => {
    useGSAP(() => {
        const titleSplit = SplitText.create('#about h2', {
            type: 'words'
        })

        const scrollTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top center'
            }
        })

        scrollTimeline
            .from(titleSplit.words, {
                opacity: 0, duration: 1, yPercent: 100, ease: 'expo.out', stagger: 0.02
            })
            .from('.top-grid div, .bottom-grid div', {
                opacity: 0, duration: 1, ease: 'power1.inOut', stagger: 0.04
            }, '-=0.5')

    })


    return (
        <div id="about" className="min-h-screen w-full">
            <div className="container mx-auto px-5 py-24">
                <div className="mb-16 md:px-0 px-5">
                    <div className="content grid grid-cols-1 lg:grid-cols-12 gap-5">
                        <div className="md:col-span-8">
                            <p className="badge inline-block rounded-full bg-white text-black px-4 py-2 text-sm font-medium mb-8"><a href="#contact">Join</a></p>
                            <h2 className="text-5xl md:text-6xl font-anton max-w-lg"> Welcome to CYFAIR New Mexico <span className="text-white">- </span>
                                Nike Basketball Affiliate
                            </h2>
                        </div>

                        <div className="sub-content md:col-span-4 space-y-5 flex flex-col justify-between">
                            <p className="text-lg">CYFAIR New Mexico is a premier basketball program for athletes aged 12–17. We empower future leaders by using athletics to promote health, academic excellence, and essential life skills. Serving players across New Mexico, Texas, Oklahoma, Arkansas, and Louisiana, we offer competitive teams, specialized clinics, and developmental programs designed to help every athlete reach their full potential.</p>

                            <div className="flex flex-col justify-between md:gap-2 gap-5">
                                <p className="md:text-3xl text-xl font-bold">
                                    {/* <span>4.5</span>/5 */}
                                </p>
                                <p className="sm:text-sm text-white-100">
                                    {/* More than +12000 customers */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="top-grid grid grid-cols-1 xl:grid-cols-12 gap-5 mb-5 md:px-0 px-5">
                    <div className="md:col-span-3 rounded-3xl overflow-hidden h-72 relative">
                        <div className="noisy" />
                        <img src="/images/webp/abt1.webp" alt="grid-img-1" className="object-cover w-full h-full" />
                    </div>

                    <div className="md:col-span-6 rounded-3xl overflow-hidden h-72 relative">
                        <div className="noisy" />
                        <img src="/images/webp/abt2.webp" alt="grid-img-2" className="object-cover w-full h-full" />
                    </div>

                    <div className="md:col-span-3 rounded-3xl overflow-hidden h-72 relative">
                        <div className="noisy" />
                        <img src="/images/webp/abt5.webp" alt="grid-img-5" className="object-cover w-full h-full" />
                    </div>
                </div>

                <div className="bottom-grid grid grid-cols-1 md:grid-cols-12 gap-5 md:px-0 px-5" >
                    <div className="md:col-span-8 rounded-3xl overflow-hidden h-72 relative">
                        <div className="noisy" />
                        <img src="/images/webp/abt3.webp" alt="grid-img-3" className="object-cover w-full h-full" />
                    </div>

                    <div className="md:col-span-4 rounded-3xl overflow-hidden h-72 relative">
                        <div className="noisy" />
                        <img src="/images/webp/abt4.webp" alt="grid-img-4" className="object-cover w-full h-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About