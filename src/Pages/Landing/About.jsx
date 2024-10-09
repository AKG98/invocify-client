import photo from '../../assets/images/2147807977.jpg'

export default function About() {
  return (
    <main 
      id='about'
      className="w-[100vw] bg-gray-50 flex  items-center justify-center md:px-20 md:py-5" 
      style={{overflow:'hidden'}}
      >
        <article className="w-full h-full bg-white border-2 rounded-xl flex md:flex-row flex-col-reverse">
            <section className="flex-1 p-10">
                <p className="text-sm opacity-50 mb-3">About us</p>
                <h1 className="font-semibold text-6xl mb-10">Our Invoicing Evolution </h1>
                <p className='text-gray-400 text-sm mb-20 md:pe-20'>
                    At Invoicify, we&apos;ve revolutionized invoicing by simplifying the process with 
                    intuitive tools and customizable templates. Our journey is dedicated to empowering 
                    businesses with efficient, modern invoicing solutions that evolve to meet your needs.
                </p>
                  <div className="flex flex-wrap gap-y-10">
                      <div className="w-full md:w-1/2">
                          <div className="py-2 border-t-4 border-orange-200 md:mr-2">
                            <h1 className='font-semibold text-xl mb-2'>1000+ users</h1>
                            <p className='text-sm'>
                                Over 1000+ happy users efficiently leveraging our tools.
                            </p>
                          </div>
                      </div>
                      <div className="w-full md:w-1/2">
                          <div className="py-2 border-t-4 border-orange-200">
                            <h1 className='font-semibold text-xl mb-2'>100% free</h1>
                            <p className='text-sm'>
                                Our tools are completely free to use, with no hidden charges.
                            </p>
                          </div>
                      </div>
                      <div className="w-full md:w-1/2">
                         <div className="py-2 border-t-4 border-orange-200 md:mr-2">
                            <h1 className='font-semibold text-xl mb-2'>110% secure</h1>
                            <p className='text-sm'>
                                We ensure that your data is secure and protected at all times.
                            </p>
                          </div>
                      </div>
                      <div className="w-full md:w-1/2">
                         <div className="py-2 border-t-4 border-orange-200">
                            <h1 className='font-semibold text-xl mb-2'>1000+ users</h1>
                            <p className='text-sm'>
                                Over 1000+ happy users efficiently leveraging our tools.
                            </p>
                          </div>
                      </div>
                  </div>

            </section>
            <section className="flex-1 h-full p-10 flex justify-center" >
                <img src={photo} alt="" className='md:h-[600px] rounded-2xl' style={{objectFit:'cover'}}/>
            </section>

        </article>
      
    </main>
  )
}
