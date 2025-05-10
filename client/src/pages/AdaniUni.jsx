import React from 'react';

const AdaniUni = () => {
  return (
    <div className="p-8 pt-24 text-white">
      <h1 className="text-3xl font-bold mb-4">Adani University</h1>
      <p>5G4V+JQ4, nr. Vaishnodevi Circle, Shantigram, Khodiyar, Gujarat 382421</p>
      <p>📞 Phone: +91-XXX-XXX-XXXX</p>
      <p>🌐 Website: <a href="https://www.adaniuni.ac.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">adaniuni.ac.in</a></p>
      <iframe
        title="Adani Uni Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.3821473895396!2d72.48479761536877!3d23.083534584919343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e837fddc6f3f3%3A0xf23a09b805cbd26b!2sAdani%20University!5e0!3m2!1sen!2sin!4v1651924924982"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
      <div className="mt-4">
        <img src="/university.jpg" alt="Adani University" className="rounded shadow-lg" />
      </div>
    </div>
  );
};

export default AdaniUni;
