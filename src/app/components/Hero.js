import React from 'react'

function Hero() {
  return (
   <>
   <div>
   <video
  autoPlay
  muted
  loop
    preload="auto"
  playsInline
  className="w-full h-auto object-cover"
>
  <source src="stvideo.mp4" type="video/mp4" />
 
</video>

    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-6xl md:text-6xl font-bold drop-shadow-lg"  style={{ fontFamily: 'TTRamillas' }}




>
        Your All-In-One <br></br>Accessories Destination
        </h1>
        <button className="mt-6 px-8 py-3 bg-white/20 border border-white text-white text-lg font-semibold rounded-full backdrop-blur-md hover:bg-white/30 transition">
          Shop Now
        </button>
      </div>


   </div>
   </>
  )
}

export default Hero