// src/user/Student/components/AboutUni.jsx
import React from 'react';
 import universityLogo from "../../../assets/university.jpg";
import FacultyLayout from './FacultyLayout';



const AboutUni = () => {
  return (
    <FacultyLayout>
    <div className="pt-24 px-4 md:px-20 pb-10 min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-10 hover:shadow-2xl transition duration-300 ease-in-out">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={universityLogo}
            alt="Adani University"
            className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-md hover:scale-105 transition-transform duration-300"
          />
          <div>
            <h1 className="text-4xl font-extrabold text-purple-800">Adani University</h1>
            <p className="text-grrray-600 mt-3 text-lg max-w-2xl leading-relaxed">
              Located in the heart of Shantigram Township, Ahmedabad, Adani University is a research-intensive private institution focused on solving real-world problems. The university offers programs in Technology, Management, and Infrastructure with a vision to drive innovation, sustainability, and global competence.
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">Key Highlights</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>State Private University established in 2022</li>
              <li>Programs: B.Tech, M.Tech, MBA, Ph.D.</li>
              <li>AICTE & UGC approved</li>
              <li>Focus on sustainability, infrastructure, and interdisciplinary research</li>
              <li>Highly qualified faculty and industry tie-ups</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">Contact & Location</h2>
            <p className="text-gray-700 mb-2">
              <strong>Address:</strong><br />
              Shantigram Township, Near Vaishnodevi Circle,<br />
              S.G. Highway, Ahmedabad, Gujarat
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> <a href="mailto:admissions.fest@adaniuni.ac.in" className="text-purple-600 hover:underline">admissions.fest@adaniuni.ac.in</a>
            </p>
            <p className="text-gray-700">
              <strong>Website:</strong>{' '}
              <a href="https://www.adaniuni.ac.in" target="_blank" rel="noreferrer" className="text-purple-600 hover:underline">
                www.adaniuni.ac.in
              </a>
            </p>
          </div>
        </div>

        {/* Map Section */}
        <div>
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">University Location</h2>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Adani University Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.0852042112144!2d72.6223983149471!3d23.09304768492626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b25a524e47d%3A0xd1e5942be91bb3dc!2sAdani%20University!5e0!3m2!1sen!2sin!4v1681031737201!5m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
      </FacultyLayout>
  );
};

export default AboutUni;

