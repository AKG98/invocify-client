import logo from '../../assets/logo.svg';
import { FacebookFilled, InstagramFilled, LinkedinFilled, TwitterCircleFilled, PhoneFilled, MailFilled, EnvironmentFilled } from '@ant-design/icons';

export default function Footer() {
  return (
    <>
      <main id='contact' className='w-screen bg-white px-5 md:px-20 py-10 flex flex-col md:flex-row gap-8 md:gap-10'>
        {/* Logo and Social Section */}
        <section className='w-full md:w-[35vw] text-center md:text-start md:mr-20'>
          <div className='flex gap-2 items-center md:justify-start justify-center'>
            <img src={logo} alt="logo" className="w-10 h-10" />
            <h1 className='font-bold text-2xl md:text-3xl'>INVOCIFY</h1>
          </div>
          <p className='text-sm mt-3'>
            For inquiries or support, reach out via phone or email. We look forward to hearing from you!
          </p>
          <section className='flex gap-4 mt-4 text-2xl md:justify-start justify-center'>
            <a href=""><FacebookFilled /></a>
            <a href=""><InstagramFilled /></a>
            <a href=""><LinkedinFilled /></a>
            <a href=""><TwitterCircleFilled /></a>
          </section>
        </section>

        {/* Navigation, Legal, and Contact Section in single row */}
        <aside className='w-full flex justify-between text-xs md:text-base'>
          <section className='flex flex-col mb-6 md:mb-0'>
            <h1 className='font-semibold text-sm md:text-lg'>Navigation</h1>
            <a href="#home" className='mt-2'>Home</a>
            <a href="#about" className='mt-1'>About</a>
            <a href="#features" className='mt-1'>Features</a>
            <a href="#faq" className='mt-1'>Faq</a>
          </section>

          <section className='flex flex-col mb-6 md:mb-0'>
            <h1 className='font-semibold text-sm md:text-lg'>Legal</h1>
            <a href="#home" className='mt-2'>Privacy Policy</a>
            <a href="#about" className='mt-1'>Terms & Conditions</a>
          </section>

          <section>
            <h1 className='font-semibold text-sm md:text-lg'>Contact Us</h1>
            <div className='flex items-center gap-2 mt-2'>
              <PhoneFilled />
              <p>+91 12345 67890</p>
            </div>
            <div className='flex items-center gap-2 mt-1'>
              <MailFilled />
              <p>support@invocify.com</p>
            </div>
            <div className='flex items-center gap-2 mt-1'>
              <EnvironmentFilled />
              <p>New Delhi, India</p>
            </div>
          </section>
        </aside>
      </main>

      <footer className='w-screen bg-black text-white text-center py-2 mt-10'>
        <p>&copy; 2021 Invocify. All rights reserved.</p>
      </footer>
    </>
  )
}
