import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react'
import { featureLists, goodLists } from '../../constants/index.js'

const Sponsorships = () => {
	const isMobile = useMediaQuery({ maxWidth: 767 });

	useGSAP(() => {
		const start = isMobile ? 'top 20%' : 'top top';

		const maskTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: '#sponsorships',
				start,
				end: 'bottom center',
				scrub: 1.5,
				pin: true
			}
		})

		maskTimeline
			.to('.will-fade', { opacity: 0, stagger: 0.2, ease: 'power1.inOut', })
			.to('.masked-img', { scale: 1.3, maskPosition: 'center', maskSize: '400%', duration: 1, ease: 'power1.inOut ' })
			.to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut' })
	})

	return (
		<div id="sponsorships" className="flex justify-center items-center flex-col min-h-dvh mt-20 relative radial-gradient">
			<div className="container mx-auto px-5 py-24">
				<h2 className="will-fade relative md:text-[20vw] text-8xl text-nowrap leading-none font-anton text-center text-[#505050] mb-8">Support</h2>

				<div className="content flex md:flex-row flex-col justify-between md:mb-16 md:mt-0 mt-40 gap-10">
					<ul className="space-y-4 will-fade">
						{goodLists.map((feature, index) => (
							<li key={index} className="flex items-center gap-2">
								<img src="/images/webp/check.webp" alt="check" />
								<p>{feature}</p>
							</li>
						))}
					</ul>

					<div className="sponsor-img md:w-[60vw] w-full h-[50vh] md:h-[70vh] rounded-4xl overflow-hidden absolute top-0 md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2">
						<img
							src="/images/webp/under-img.webp"
							alt=""
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 masked-img size-full object-contain"
						/>
					</div>

					<ul className="space-y-4 will-fade">
						{featureLists.map((feature, index) => (
							<li key={index} className="flex items-center justify-start gap-2">
								<img src="/images/webp/check.webp" alt="check" />
								<p className="md:w-fit w-60">{feature}</p>
							</li>
						))}
					</ul>
				</div>

				<div className="masked-container">
					<h2 className="will-fade text-4xl md:text-5xl font-anton text-center mb-20 text-white mt-25">Sponsor Our Program</h2>
					<div id="masked-content" className="opacity-0 md:px-0 px-5 space-y-5 absolute md:bottom-5 bottom-52 left-1/2 -translate-x-1/2">
						<h3 className="md:text-5xl text-2xl text-center font-serif md:w-full w-80 text-white">Corporate Partnerships</h3>
						<p className="text-lg text-center">We invite local businesses to partner with CYFAIR New Mexico through our Corporate Sponsorship program. This initiative offers a unique opportunity for companies to make a meaningful impact on the lives of young athletes while gaining significant brand visibility and community engagement. We offer various sponsorship levels designed to meet your business goals and demonstrate your commitment to developing the next generation of leaders.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Sponsorships