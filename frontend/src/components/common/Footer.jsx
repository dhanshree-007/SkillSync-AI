import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#F2F4F0] border-t border-[#D2D8CF] mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <span className="text-sm font-semibold text-[#506153]">
              © {new Date().getFullYear()} SkillSync AI. All rights reserved.
            </span>
          </div>
          <div className="mt-4 flex justify-center md:mt-0 space-x-6 text-sm font-semibold">
            <a href="#" className="text-[#506153] hover:text-[#1E2B21] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#506153] hover:text-[#1E2B21] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-[#506153] hover:text-[#1E2B21] transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
