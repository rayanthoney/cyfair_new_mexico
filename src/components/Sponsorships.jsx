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
		<div id="sponsorships">
			<div className="container mx-auto h-full pt-20">
				<h2 className="will-fade">Support</h2>

				<div className="content">
					<ul className="space-y-4 will-fade">
						{goodLists.map((feature, index) => (
							<li key={index} className="flex items-center gap-2">
								<img src="/images/webp/check.webp" alt="check" />
								<p>{feature}</p>
							</li>
						))}
					</ul>

					<div className="sponsor-img">
						<img
							src="/images/webp/under-img.webp"
							alt=""
							className="abs-center masked-img size-full object-contain"
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
					<h2 className="will-fade">Sponsor Our Program</h2>
					<div id="masked-content">
						<h3>Corporate Partnerships</h3>
						<p>We invite local businesses to partner with CYFAIR New Mexico through our Corporate Sponsorship program. This initiative offers a unique opportunity for companies to make a meaningful impact on the lives of young athletes while gaining significant brand visibility and community engagement. We offer various sponsorship levels designed to meet your business goals and demonstrate your commitment to developing the next generation of leaders.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Sponsorships