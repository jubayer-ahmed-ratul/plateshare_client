import React from 'react';
import { Facebook, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#0c4428]">
            <div className="max-w-11/12 mx-auto py-10">
                <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center gap-6">
                  
                    <div className="flex items-center gap-2">
                        <a className="text-2xl text-white normal-case">PlateShare</a>
                    </div>

                
                    <div className="flex flex-col items-center md:items-end">
                        <h2 className="text-white text-2xl">Social Links</h2>
                        <div className="flex gap-4 mt-3">
                        
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    className="bg-white w-7 h-7 rounded-full box-border p-1 hover:opacity-80 transition"
                                >
                                    <path
                                        fill="black"
                                        d="M18.244 2H21.5l-7.59 8.67L22 22h-5.828l-4.573-6.236L6.234 22H3l8.083-9.22L2 2h5.828l4.167 5.736L18.244 2z"
                                    />
                                </svg>
                            </a>

                           
                            <Facebook className="bg-white w-7 h-7 rounded-full box-border p-1" />

                            <Linkedin className="bg-white w-7 h-7 rounded-full box-border p-1" />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-700 mt-5" />
            </div>

            <p className="text-white text-center pb-3">Copyright © 2025 - All rights reserved</p>
        </footer>
    );
};

export default Footer;
