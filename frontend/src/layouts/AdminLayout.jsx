import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import CustomCursor from '../components/common/CustomCursor';
import GlobalBackground from '../components/common/GlobalBackground';
import { motion } from 'framer-motion';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#05070D] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      <CustomCursor />
      <GlobalBackground />

      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex min-h-[calc(100vh-64px)] relative z-10">
        <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} role="ADMIN" />
        
        <main className="flex-1 w-full min-w-0 bg-transparent md:ml-64 flex flex-col justify-between">
          <div className="w-full p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-130px)]">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
