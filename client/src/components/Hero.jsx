import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<div
			id="home"
			className="barlow-semi-condensed first-letter:relative h-11/12 mt-5 bg-white flex items-center px-4 md:px-8 lg:px-16"
		>
			<div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 max-h-screen mt-2 sm:mt-0">
				{/* Left Content */}
				<div className="flex-1 text-left space-y-6 ml-0 sm:ml-16">
					<div className="mb-5">
						<h2 className="text-md uppercase tracking-wider text-gray-600">
							Hello, My name is 
						</h2>
						<div className="w-14 h-[2px] bg-gray-500 mt-2" />
					</div>
					<div>
						<h1 className="text-5xl md:text-6xl font-semibold mt-2">
							Chaitanya Panja
						</h1>
						<h3 className="text-2xl md:text-3xl text-gray-600 mt-2">
							Frontend Developer
						</h3>
					</div>

					<div className="space-y-2 pt-1">
						<div className="flex items-center space-x-2">
							<p className="text-lg text-gray-600 max-w-[500px]">
								As a passionate frontend developer, I specialize in turning
								visionary concepts into stunning, user-friendly web
								applications. Let&#39;s collaborate to bring your ideas to life and
								create solutions that make a difference in the world.
							</p>
						</div>

						<div className="flex items-center space-x-4 pt-4">
							<Link to="https://github.com/Moyo-Made">
								<FaGithub size={20} />
							</Link>

							<Link to="https://www.linkedin.com/in/moyomade-adegbite/">
								<FaLinkedin size={20} />
							</Link>

							<Link to="https://x.com/moyomadee7">
								<FaSquareXTwitter size={20} />
							</Link>

							<Link href="mailto:adegbitemoyomade2004@gmail.com">
								<IoMdMail size={20} />
							</Link>
						</div>
					</div>
				</div>

				{/* Right Content - Image */}
				<div className="flex justify-center items-center">
					<div className="aspect-square rounded-full overflow-hidden bg-gray-400 mt-0 w-[280px] sm:w-[300px] md:mt-20 lg:mt-0 md:w-[350px] lg:w-[450px]">
						<img
							src="/images/mypic.png"
							alt="Profile"
							width={1920}
							height={1920}
							priority
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;