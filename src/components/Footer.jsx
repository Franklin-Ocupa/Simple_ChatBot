
import { FaGithub } from 'react-icons/fa';

const Footer = () => (
  <footer className="w-full text-center py-6 mt-6 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 select-none">
    <div className="flex flex-col items-center space-y-1">
      <a
        href="https://github.com/SRCarlo"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline"
      >
        <FaGithub className="w-5 h-5" />
        SRCarlo
      </a>
      <p className="text-xs">&copy; {new Date().getFullYear()} SRCarlo. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
