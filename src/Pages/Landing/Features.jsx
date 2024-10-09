import feat1 from '../../assets/images/Frame 1.jpg'
import feat2 from '../../assets/images/Frame 2.jpg'
import feat3 from '../../assets/images/Frame 3.jpg'



export default function Features() {
    return (
        <main id='features' className="w-[100vw] bg-gray-50 md:px-20 md:py-5">
            <div className="w-full h-full md:py-10 p-10 md:p-0">
                <div className="flex flex-wrap gap-2"> {/* Applied gap-2 for spacing */}

                    <div className="feature-card w-full md:w-[32%] md:h-[40vh] border-2 bg-white rounded-lg overflow-hidden"> {/* Set width to 32% to accommodate gap */}
                        <div className="">
                            <img src={feat1} alt="" />
                        </div>
                    </div>

                    <div className="feature-card w-full md:w-[32%] md:h-[40vh] border-2 bg-white rounded-lg">
                        <div className="p-5">
                            <h1 className="font-semibold text-xl md:text-2xl mb-5">Customizable Templates</h1>
                            <p className="text-sm md:text-lg">
                                Stand out with customizable invoice templates that reflect your brand. 
                                Tailor templates for different clients without design skills, ensuring consistent
                                branding and a lasting impression with every transaction.
                            </p>
                        </div>
                    </div>

                    <div className="feature-card w-full md:w-[32%] md:h-[40vh] border-2 bg-white rounded-lg overflow-hidden"> {/* Set width to 32% to accommodate gap */}
                        <div className="">
                            <img src={feat2} alt="" />
                        </div>
                    </div>

                    <div className="feature-card w-full md:w-[32%] md:h-[40vh] border-2 bg-white rounded-lg">
                        <div className="p-5">
                            <h1 className="font-semibold text-xl md:text-2xl mb-5">Secure & reliable</h1>
                            <p className="text-sm md:text-lg">
                                Ensure your financial transactions are secure with our invoicing platform, 
                                which uses strong encryption to protect sensitive data. Regular backups and 
                                monitoring keep your records accessible, giving you peace of mind.
                            </p>
                        </div>
                    </div>

                    <div className="feature-card w-full md:w-[32%] md:h-[40vh] border-2 bg-white rounded-lg overflow-hidden"> {/* Set width to 32% to accommodate gap */}
                        <div className="">
                            <img src={feat3} alt="" />
                        </div>
                    </div>

                    <div className="feature-card w-full md:w-[32%] md:h-[40vh] border-2 bg-white rounded-lg">
                        <div className="p-5">
                            <h1 className="font-semibold text-xl mb-5 md:text-2xl">Personal Dashboard</h1>
                            <p className="text-sm md:text-lg">
                                Manage your activities, track progress, and access personalized insights all 
                                in one place. Stay organized, monitor your performance, and streamline your 
                                workflow with an intuitive and user-friendly interface designed for you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </main>
    )
}
