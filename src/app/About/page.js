import React from 'react';

function About() {
  return (
    <div className="min-h-screen p-6">
     
      <h1
        className="text-4xl font-bold text-center my-8 mb-10 text-[#334d2c]" style={{ fontFamily: "'Playfair Display', serif" }}
       
      >
        About StudyStuff
      </h1>

      
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-b-3xl flex flex-col md:flex-row overflow-hidden">
        
       
        <div className="p-10 md:w-1/2 text-gray-800 flex flex-col justify-center">
          <p className="text-lg leading-relaxed mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s. It has survived not only five centuries, but also
            the leap into electronic typesetting. It was popularised in the 1960s and more recently with desktop
            publishing software like Aldus PageMaker.
          </p>

         
          <div className="text-center">
            <button className="px-6 py-3 bg-[#637D37] text-white font-semibold rounded-full shadow-md hover:bg-[#526730] transition-all duration-300 ease-in-out">
              Read Full Story
            </button>
          </div>
        </div>

       
        <div className="md:w-1/2 p-6 flex items-center justify-center">
          <img
            src="/about-image.webp"
            alt="About us"
            className="w-full h-auto object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
