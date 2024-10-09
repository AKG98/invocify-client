import { NavLink } from 'react-router-dom'
import hello from '../../assets/images/phello.png'
import thanks from '../../assets/images/thanks.jpg'



export default function WelcomePage() {
  return (
    <main className='w-full h-full flex flex-col items-center mt-20 overflow-hidden'>
        <header>
            <span>
                <span className='flex mb-5 items-center gap-5 flex-col-reverse md:flex-row'>
                    <h1 className='md:text-6xl text-4xl font-bold text-center'>Hi there! Thanks </h1>
                    <div className='border h-[100px] w-[200px] rounded-[100px] bg-red-200 overflow-hidden'>
                        <img src={hello} alt=""/>
                    </div>
                </span>
                <span className='flex md:flex-row-reverse items-center gap-5 flex-col'>
                    <h1 className='md:text-6xl text-3xl font-bold text-center'>For Trusting Invocify </h1>
                    <div className='border h-[100px] w-[200px] rounded-[100px] bg-red-200 overflow-hidden hidden md:block'>
                        <img src={thanks} alt=""/>
                    </div>
                </span>
            </span>
        </header>
        <NavLink to="create-invoice" className="md:mt-10 mt-20 rounded-[50px] border px-10 py-2 bg-gray-900 text-white">
            Start Invoicing
        </NavLink>
    </main>
  )
}
