import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Award, List, BarChart2, Menu, X } from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', icon: Home, href: '/' },
  { name: 'Generate Heats', icon: Users, href: '/generate-heats' },
  { name: 'Record Heat Result', icon: Award, href: '/record-heat-result' },
  { name: 'Sub-Event Leaderboard', icon: BarChart2, href: '/sub-event-leaderboard' },
  { name: 'Round Summary', icon: List, href: '/round-summary' },
  { name: 'Round Participants', icon: Users, href: '/round-participants' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-6 left-3 z-40 md:hidden text-white bg-gray-500 rounded-md p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex h-20 items-center justify-center">
          <h2 className="text-2xl font-semibold text-white">Faculty Portal</h2>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="mr-3 h-6 w-6" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default FacultySidebar;