import React from 'react';
import { Linkedin, Github } from 'lucide-react';


const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f3840] text-white py-1 mt-0">
      <div className="container mx-auto text-center text-sm">

        <div className="flex justify-center space-x-3">
          <a href="https://github.com/LeeAaron702" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            <Github size={24} />
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/lee-aaron-s/" className="flex items-center space-x-2">
            <Linkedin size={24} />
            <span>LinkedIn</span>
          </a>
        </div>
        
        <div className="flex justify-center space-x-2">
          <a href="/features">Features</a>
          <a href="/pricing">Pricing</a>
        </div>

        <div className="flex justify-center space-x-3">
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>


        <div>
        <a href="/about">About Us</a>
        </div>

        {/* Here you can add a newsletter signup form if you have an implementation. */}

      </div>
    </footer>
  );
}

export default Footer;
