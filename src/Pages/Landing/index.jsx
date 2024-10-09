import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import verifyUser from "../../Services/useVerifyUser"; // Import the utility function
import Navbar from "../../components/Navbar/Navbar";
import { Spin } from "antd";
import HeroSection from "./HeroSection";
import About from "./About";
import Features from "./Features";
import Faqs from "./Faqs";
import Footer from "./Footer";

export default function LandingPage() {
    const authenticated = useSelector((state) => state.user.authenticated);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                setLoading(true);

                const googleUser = await verifyUser(authenticated);

                if (googleUser || googleUser?.success) {
                    navigate("/home"); // Use navigate here
                }
            } catch (error) {
                console.error("Error verifying user:", error);
            } finally {
                setLoading(false);
            }
        };

        checkUser(); // Trigger the async checkUser function
    }, [authenticated, navigate]);
    if(loading){
      return <div className="w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-white/30">
        <Spin size="large" />
      </div>
    }

    return (
        <>
            <Navbar />
            <HeroSection/>
            <About/>
            <Features/>
            <Faqs/>
            <Footer/>
        </>
    );
}
