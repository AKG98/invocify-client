import { Button } from "antd"
import heroimg from "../../assets/images/hero.jpeg"
import { useNavigate } from "react-router-dom"
import { CaretRightOutlined, ExportOutlined } from "@ant-design/icons"
import { useRef } from "react";

export default function HeroSection() {
    const videoRef = useRef();
    const navigate = useNavigate();

    const handleWatchDemo = () => {
        videoRef.current.click();
    }

  return (
    <main id='home' className="w-[100vw] h-[100vh] bg-gray-50 flex md:pt-[8vh]" style={{overflow:'hidden'}}>
        <section className="md:w-[60vw] h-full md:ps-20 flex items-center md:justify-start justify-center ">
            <section className="w-[80%] md:text-start text-center">
                <h1 className="hero-title text-7xl font-bold">Innovative Invoicing for Your Business</h1>
                <p className="mt-10 md:text-xl  md:w-[80%]">Get paid faster with professional invoices, powerful estimates & 
                easy-to-use accounting tools.</p>
                <section className="flex gap-5 md:justify-start justify-center">
                    <Button 
                        className="md:mt-10 mt-5" 
                        size="large" 
                        color="default"
                        variant="solid"
                        icon={<CaretRightOutlined />}
                        
                        onClick={() => navigate('/auth')}
                        >
                            start now - It&apos;s free
                    </Button>
                    <Button 
                        className="md:mt-10 mt-5" 
                        size="large" 
                        type="default"
                        variant="solid"
                        icon={<ExportOutlined />}
                        iconPosition="end"
                        onClick={handleWatchDemo}
                        >
                        watch demo
                    </Button>
                    <a className="opacity-0" href="https://youtu.be/vxINIvmIcNs" target="_blank" rel="noopener noreferrer" ref={videoRef}/>
                </section>
                <p className="mt-20 font-semibold">Trusted pan India by 1000+</p>
            </section>
        </section>
        <section 
            className="w-[40vw]  h-full md:block hidden" 
            style={{ backgroundImage: `url(${heroimg})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat:'no-repeat' }}
        />
      
    </main>
  )
}
