import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <div>
            <h3 className="text-xl font-semibold mb-4">Career<span className="text-blue-500">Hub</span></h3>
            <p className="text-gray-600">
              Your go-to platform for finding top-notch job opportunities and enhancing your career prospects.
            </p>
          </div>
    
          <div>
            <h4 className="text-lg font-semibold mb-4 text-center">Quick Links</h4>
            <ul className='text-center'>
              <li><a href="/" className="hover:text-blue-500 transition">Home</a></li>
              <li><a href="/jobs" className="hover:text-blue-500 transition">Jobs</a></li>
              <li><a href="/about" className="hover:text-blue-500 transition">Browse</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-center">Follow Us</h4>
            <div className="flex flex-col justify-center items-center">

              <a href="#" className="hover:text-blue-500 transition">
                <i className="fab fa-linkedin-in"></i> LinkedIn
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <i className="fab fa-github"></i> Github
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} CareerHub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
