"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Download, Sun, Moon, Home, FileText, Menu, X } from "lucide-react";
import dynamic from "next/dynamic";

// Enhanced loading components with mobile-optimized skeletons
const HeroSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-8">
    <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
      <Skeleton className="h-12 sm:h-16 w-full sm:w-3/4 mx-auto" />
      <Skeleton className="h-6 sm:h-8 w-3/4 sm:w-1/2 mx-auto" />
      <Skeleton className="h-4 sm:h-6 w-5/6 sm:w-2/3 mx-auto" />
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-6 sm:pt-8">
        <Skeleton className="h-10 sm:h-12 w-full sm:w-32" />
        <Skeleton className="h-10 sm:h-12 w-full sm:w-32" />
      </div>
    </div>
  </div>
);

const ProjectsSkeleton = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8">
    <div className="text-center space-y-3 sm:space-y-4">
      <Skeleton className="h-10 sm:h-12 w-40 sm:w-48 mx-auto" />
      <Skeleton className="h-5 sm:h-6 w-80 sm:w-96 mx-auto" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3 sm:space-y-4 p-4 sm:p-6 border rounded-lg">
          <Skeleton className="h-40 sm:h-48 w-full" />
          <Skeleton className="h-5 sm:h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 sm:h-6 w-12 sm:w-16" />
            <Skeleton className="h-5 sm:h-6 w-12 sm:w-16" />
            <Skeleton className="h-5 sm:h-6 w-12 sm:w-16" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkillsSkeleton = () => (
  <div className="space-y-6 sm:space-y-8">
    <div className="text-center space-y-3 sm:space-y-4">
      <Skeleton className="h-10 sm:h-12 w-40 sm:w-48 mx-auto" />
      <Skeleton className="h-5 sm:h-6 w-80 sm:w-96 mx-auto" />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border rounded-lg">
          <Skeleton className="h-6 sm:h-8 w-6 sm:w-8 rounded" />
          <Skeleton className="h-4 sm:h-5 w-16 sm:w-20" />
        </div>
      ))}
    </div>
  </div>
);

const ExperienceSkeleton = () => (
  <div className="space-y-6 sm:space-y-8">
    <div className="text-center space-y-3 sm:space-y-4">
      <Skeleton className="h-10 sm:h-12 w-40 sm:w-48 mx-auto" />
      <Skeleton className="h-5 sm:h-6 w-80 sm:w-96 mx-auto" />
    </div>
    <div className="space-y-4 sm:space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 border rounded-lg">
          <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded self-start" />
          <div className="flex-1 space-y-2 sm:space-y-3">
            <Skeleton className="h-5 sm:h-6 w-40 sm:w-48" />
            <Skeleton className="h-4 sm:h-5 w-28 sm:w-32" />
            <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactSkeleton = () => (
  <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
    <div className="text-center space-y-3 sm:space-y-4">
      <Skeleton className="h-10 sm:h-12 w-40 sm:w-48 mx-auto" />
      <Skeleton className="h-5 sm:h-6 w-80 sm:w-96 mx-auto" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div className="space-y-3 sm:space-y-4">
        <Skeleton className="h-10 sm:h-12 w-full" />
        <Skeleton className="h-10 sm:h-12 w-full" />
        <Skeleton className="h-24 sm:h-32 w-full" />
        <Skeleton className="h-10 sm:h-12 w-full" />
      </div>
      <div className="space-y-3 sm:space-y-4">
        <Skeleton className="h-6 sm:h-8 w-28 sm:w-32" />
        <div className="space-y-2 sm:space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <Skeleton className="h-4 sm:h-5 w-4 sm:w-5 rounded" />
              <Skeleton className="h-4 sm:h-5 w-32 sm:w-40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Dynamic imports with enhanced skeleton loading
const Hero = dynamic(() => import("@/components/sections/hero"), {
  loading: () => <HeroSkeleton />,
});
const Projects = dynamic(() => import("@/components/sections/project"), {
  loading: () => <ProjectsSkeleton />,
});
const Experience = dynamic(() => import("@/components/sections/experience"), {
  loading: () => <ExperienceSkeleton />,
});
const Skills = dynamic(() => import("@/components/sections/skill"), {
  loading: () => <SkillsSkeleton />,
});
const Contact = dynamic(() => import("@/components/sections/contact"), {
  loading: () => <ContactSkeleton />,
});
const Footer = dynamic(() => import("@/components/shared/footer"), {
  loading: () => (
    <div className="py-8 sm:py-12 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Skeleton className="h-5 sm:h-6 w-28 sm:w-32" />
          <div className="flex gap-3 sm:gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-6 sm:h-8 w-6 sm:w-8 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
});

type Theme = 'light' | 'dark';

export default function PortfolioHome() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Client-side hydration check
  useEffect(() => {
    setIsClient(true);
    
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Theme management with better performance
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isDarkTheme = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDarkTheme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Enhanced scroll handler with mobile-optimized section detection and earlier dulling
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setLastScrollY(currentScrollY);

    // Mobile menu auto-close on scroll
    if (isMobileMenuOpen && Math.abs(currentScrollY - lastScrollY) > 50) {
      setIsMobileMenuOpen(false);
    }

    // Enhanced section detection with earlier dulling for mobile
    const sections = ['home', 'projects', 'skills', 'experience', 'contact'];
    let currentSection = 'home';
    
    const viewportHeight = window.innerHeight;
    // Reduced threshold for earlier dulling effect - mobile gets even earlier dulling
    const scrollThreshold = isMobile ? viewportHeight * 0.3 : viewportHeight * 0.5;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const sectionId = sections[i];
      let element;
      
      if (sectionId === 'home') {
        // For home, check if we're still in the hero area
        element = document.querySelector('#hero') || document.body;
      } else {
        element = document.getElementById(sectionId);
      }
      
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Enhanced visibility calculation for earlier dulling
        // Element starts dulling when it's only 30% visible on mobile, 50% on desktop
        const visibleHeight = Math.min(viewportHeight - Math.max(elementTop, 0), elementHeight);
        const visibilityRatio = visibleHeight / Math.min(viewportHeight, elementHeight);
        
        // More aggressive section switching for mobile
        const switchThreshold = isMobile ? 0.2 : 0.3;
        
        if (visibilityRatio > switchThreshold || 
            (elementTop <= scrollThreshold && elementTop + elementHeight > scrollThreshold)) {
          currentSection = sectionId;
          break;
        }
      }
    }

    setActiveSection(currentSection);
  }, [isMobile, isMobileMenuOpen, lastScrollY]);

  // Throttled scroll listener with reduced throttling for mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    throttledScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  // Optimized resume download with error handling
  const handleDownloadResume = useCallback(async () => {
    try {
      setIsDownloading(true);

      // Check if file exists with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch("/Resume.pdf", { 
        method: "HEAD",
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Resume file not found");
      }

      // Create optimized download
      const link = document.createElement("a");
      link.href = "/Resume.pdf";
      link.download = "Hrushi_Bhanvadiya_Resume.pdf";
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Brief delay for UX
      setTimeout(() => setIsDownloading(false), 800);

    } catch (error) {
      console.error("Resume download failed:", error);
      alert("Resume temporarily unavailable. Please try again later.");
      setIsDownloading(false);
    }
  }, []);

  // Memoized navigation items
  const navItems = useMemo(() => [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ], []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Optimized smooth scroll with mobile considerations
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu
    
    const element = document.querySelector(href);
    if (element) {
      // Offset for fixed header - more offset on mobile
      const offset = isMobile ? 80 : 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, [isMobile]);

  // Memoized breadcrumb name getter
  const getBreadcrumbName = useCallback((section: string) => {
    const names: { [key: string]: string } = {
      'home': 'Portfolio',
      'projects': 'Projects',
      'skills': 'Skills',
      'experience': 'Experience',
      'contact': 'Contact'
    };
    return names[section] || 'Portfolio';
  }, []);

  // Memoized scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, []);

  // Enhanced loading state with mobile-optimized skeletons
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        {/* Navigation Skeleton */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 sm:gap-8">
                <Skeleton className="h-5 sm:h-6 w-10 sm:w-12" />
                <Skeleton className="hidden sm:block h-4 sm:h-5 w-28 sm:w-32" />
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Skeleton className="h-8 sm:h-9 w-16 sm:w-24" />
                <Skeleton className="h-8 sm:h-9 w-8 sm:w-9 rounded-full" />
                <Skeleton className="h-8 sm:h-9 w-16 sm:w-20 rounded-full" />
              </div>
            </div>
          </div>
        </nav>
        
        {/* Main Content Skeleton */}
        <div className="pt-16 sm:pt-20">
          <HeroSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-700 ease-out relative overflow-hidden font-light">
      {/* Premium Static Background System - Mobile Optimized */}
      <div className="fixed inset-0 z-0">
        {/* Base layer with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-white dark:from-black dark:via-gray-950/20 dark:to-black" />
        
        {/* Responsive geometric grid pattern */}
        <div className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02] dark:opacity-[0.03] sm:dark:opacity-[0.04]">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: isMobile ? '40px 40px' : '60px 60px'
            }}
          />
        </div>
        
        {/* Mobile-optimized radial gradient overlays */}
        <div className="absolute inset-0">
          {/* Top-left ethereal glow - smaller on mobile */}
          <div 
            className="absolute top-0 left-0 opacity-[0.02] sm:opacity-[0.03] dark:opacity-[0.04] sm:dark:opacity-[0.06]"
            style={{
              width: isMobile ? '400px' : '800px',
              height: isMobile ? '300px' : '600px',
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
              filter: 'blur(1px)'
            }}
          />
          
          {/* Center focal point - adjusted for mobile */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.01] sm:opacity-[0.015] dark:opacity-[0.02] sm:dark:opacity-[0.03]"
            style={{
              width: isMobile ? '500px' : '1000px',
              height: isMobile ? '200px' : '400px',
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 60%, transparent 90%)'
            }}
          />
        </div>
        
        {/* Mobile-optimized noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.01] sm:opacity-[0.015] dark:opacity-[0.02] sm:dark:opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: isMobile ? '120px 120px' : '180px 180px'
          }}
        />
        
        {/* Subtle vignette effect */}
        <div 
          className="absolute inset-0 opacity-[0.3] sm:opacity-[0.4] dark:opacity-[0.5] sm:dark:opacity-[0.6]"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.02) 100%)'
          }}
        />
        
        {/* Minimal geometric accents - hidden on small mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
          <div className="absolute top-[10%] left-[8%] w-px h-32 bg-black/[0.08] dark:bg-white/[0.08] rotate-12" />
          <div className="absolute top-[12%] left-[8.5%] w-16 h-px bg-black/[0.06] dark:bg-white/[0.06] rotate-12" />
          <div className="absolute bottom-[15%] right-[10%] w-px h-24 bg-black/[0.06] dark:bg-white/[0.06] -rotate-12" />
          <div className="absolute bottom-[17%] right-[10.5%] w-12 h-px bg-black/[0.08] dark:bg-white/[0.08] -rotate-12" />
        </div>
      </div>

      {/* Enhanced Mobile-First Custom Scrollbar Styles */}
      <style jsx global>{`
        /* Smooth transitions for all elements */
        * {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .fast-transition {
          transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        /* Mobile-first scrollbar - only visible on desktop */
        @media (min-width: 768px) {
          ::-webkit-scrollbar {
            width: 6px;
          }
          
          ::-webkit-scrollbar-track {
            background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
            border-radius: 3px;
            margin: 4px 0;
          }
          
          ::-webkit-scrollbar-thumb {
            background: ${theme === 'dark' 
              ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.2) 100%)' 
              : 'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.08) 50%, rgba(0, 0, 0, 0.15) 100%)'
            };
            border-radius: 3px;
            border: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            backdrop-filter: blur(10px);
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: ${theme === 'dark' 
              ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.3) 100%)' 
              : 'linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.25) 100%)'
            };
            border-color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'};
            transform: scaleX(1.2);
          }
          
          html {
            scrollbar-width: thin;
            scrollbar-color: ${theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.02)' 
              : 'rgba(0, 0, 0, 0.12) rgba(0, 0, 0, 0.02)'
            };
          }
        }
        
        /* Mobile touch scrolling enhancement */
        @media (max-width: 767px) {
          * {
            -webkit-overflow-scrolling: touch;
          }
          
          body {
            overscroll-behavior-y: contain;
          }
        }
        
        /* Mobile-optimized selection styling */
        ::selection {
          background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          color: inherit;
        }
        
        ::-moz-selection {
          background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          color: inherit;
        }
        
        /* Prevent horizontal scroll on mobile */
        @media (max-width: 767px) {
          body {
            overflow-x: hidden;
          }
        }
        
        /* Enhanced mobile backdrop blur support */
        @supports (-webkit-backdrop-filter: blur(10px)) {
          .mobile-backdrop-blur {
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
          }
        }
        
        /* Mobile menu animation */
        .mobile-menu-enter {
          opacity: 0;
          transform: translateY(-10px);
        }
        
        .mobile-menu-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.2s ease-out, transform 0.2s ease-out;
        }
        
        .mobile-menu-exit {
          opacity: 1;
          transform: translateY(0);
        }
        
        .mobile-menu-exit-active {
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.15s ease-in, transform 0.15s ease-in;
        }
      `}</style>

      {/* Navigation - Always Visible */}
      {/* Mobile-First Navigation - Always Visible */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-white/80 dark:bg-black/80 mobile-backdrop-blur border-b border-black/[0.06] dark:border-white/[0.06] shadow-sm transition-all duration-500 ease-out">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Left side - Logo and breadcrumb */}
              <div className="flex items-center gap-4 sm:gap-8">
                <div className="font-mono text-base sm:text-lg font-medium tracking-tight hover:scale-105 transition-transform duration-300 ease-out cursor-pointer touch-manipulation">
                  HB<span className="text-black/40 dark:text-white/40">.</span>
                </div>

                {/* Desktop breadcrumb - hidden on mobile */}
                <Breadcrumb className="hidden lg:flex">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToTop();
                        }}
                        className="flex items-center gap-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all duration-300 ease-out hover:scale-105 touch-manipulation"
                      >
                        <Home className="w-3.5 h-3.5 transition-transform duration-300 ease-out" />
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-black/30 dark:text-white/30" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-black dark:text-white font-medium">
                        {getBreadcrumbName(activeSection)}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Right side - Actions and mobile menu */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Desktop navigation - hidden on mobile */}
                <div className="hidden md:flex items-center space-x-1">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`relative transition-all duration-300 ease-out font-normal text-sm px-4 py-2 rounded-full hover:scale-105 group touch-manipulation ${
                        activeSection === item.href.substring(1)
                          ? 'text-black dark:text-white bg-black/[0.06] dark:bg-white/[0.06]'
                          : 'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                      }`}
                    >
                      {item.name}
                      {/* Subtle underline effect */}
                      <div className={`absolute bottom-1 left-1/2 h-0.5 bg-black/20 dark:bg-white/20 rounded-full transition-all duration-300 ease-out ${
                        activeSection === item.href.substring(1)
                          ? 'w-6 -translate-x-1/2'
                          : 'w-0 group-hover:w-6 group-hover:-translate-x-1/2 translate-x-0'
                      }`} />
                    </a>
                  ))}
                </div>

                {/* Theme toggle - always visible */}
                <Button
                  onClick={toggleTheme}
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 sm:w-9 sm:h-9 p-0 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] rounded-full border border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-black/60 mobile-backdrop-blur transition-all duration-300 ease-out hover:scale-110 hover:rotate-12 touch-manipulation"
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                >
                  {theme === 'light' ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </Button>

                {/* Resume download - always visible */}
                <Button
                  onClick={handleDownloadResume}
                  disabled={isDownloading}
                  variant="outline"
                  size="sm"
                  className="group relative overflow-hidden border-black/[0.12] dark:border-white/[0.12] bg-white/70 dark:bg-black/70 mobile-backdrop-blur hover:bg-white/90 dark:hover:bg-black/90 hover:border-black/[0.16] dark:hover:border-white/[0.16] transition-all duration-300 ease-out px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-normal text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg touch-manipulation"
                  aria-label="Download resume PDF"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2.5">
                    {isDownloading ? (
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-0.5" />
                    )}
                    <span className="hidden sm:inline transition-all duration-300 ease-out">
                      {isDownloading ? 'Downloading...' : 'Resume'}
                    </span>
                    <FileText className="hidden sm:inline w-3 h-3 opacity-50 transition-all duration-300 ease-out group-hover:opacity-70 group-hover:scale-110" />
                  </div>

                  {/* Subtle hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.02] dark:via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                </Button>

                {/* Mobile menu button - only visible on mobile */}
                <Button
                  onClick={toggleMobileMenu}
                  variant="ghost"
                  size="sm"
                  className="md:hidden w-8 h-8 p-0 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] rounded-full border border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-black/60 mobile-backdrop-blur transition-all duration-300 ease-out hover:scale-110 touch-manipulation"
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-4 h-4 transition-all duration-300 ease-out" />
                  ) : (
                    <Menu className="w-4 h-4 transition-all duration-300 ease-out" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0'
          }`}>
            <div className="border-t border-black/[0.06] dark:border-white/[0.06] bg-white/90 dark:bg-black/90 mobile-backdrop-blur">
              <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
                {/* Mobile breadcrumb */}
                <div className="flex items-center gap-2 px-4 py-2 text-xs text-black/60 dark:text-white/60">
                  <Home className="w-3 h-3" />
                  <span>/</span>
                  <span className="text-black dark:text-white font-medium">
                    {getBreadcrumbName(activeSection)}
                  </span>
                </div>

                {/* Mobile navigation items */}
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ease-out touch-manipulation ${
                      activeSection === item.href.substring(1)
                        ? 'bg-black/[0.06] dark:bg-white/[0.06] text-black dark:text-white'
                        : 'text-black/70 dark:text-white/70 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:text-black dark:hover:text-white'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isMobileMenuOpen ? 'slideInFromTop 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    <span className="font-normal text-base">{item.name}</span>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${
                      activeSection === item.href.substring(1)
                        ? 'bg-black/30 dark:bg-white/30 scale-100'
                        : 'bg-black/10 dark:bg-white/10 scale-0'
                    }`} />
                  </a>
                ))}

                {/* Mobile menu footer */}
                <div className="flex items-center justify-center pt-4 mt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <div className="text-xs text-black/40 dark:text-white/40 font-light tracking-wide">
                    NAVIGATE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay - for better UX */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 dark:bg-white/10 z-40 transition-opacity duration-300 ease-out"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ top: '72px' }} // Offset by nav height
        />
      )}

      {/* Additional mobile-specific styles */}
      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Enhanced mobile touch targets */
        @media (max-width: 767px) {
          .touch-manipulation {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            min-height: 44px;
            min-width: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          /* Mobile menu item hover states */
          .mobile-menu-item:active {
            transform: scale(0.98);
            transition: transform 0.1s ease-out;
          }
          
          /* Prevent zoom on input focus */
          input, select, textarea {
            font-size: 16px;
          }
        }
        
        /* Mobile-optimized backdrop blur */
        .mobile-backdrop-blur {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        @media (max-width: 767px) {
          .mobile-backdrop-blur {
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
        }
      `}</style>

      {/* Hero Section */}
      <Hero lastScrollY={lastScrollY} />

      {/* Projects Section */}
      <section id="projects" className="pt-16 pb-12">
        <div className="relative max-w-6xl mx-auto px-8 mb-12">
          <div className="flex items-center justify-center">
            <Separator className="flex-1 bg-black/[0.08] dark:bg-white/[0.08] h-px" />
            <div className="px-6 text-black/40 dark:text-white/40 text-sm font-light tracking-wide">
              WORK
            </div>
            <Separator className="flex-1 bg-black/[0.08] dark:bg-white/[0.08] h-px" />
          </div>
        </div>
        <Projects />
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12">
        <div className="relative max-w-6xl mx-auto px-8 mb-12">
          <div className="flex items-center justify-center">
            <Separator className="flex-1 bg-black/[0.08] dark:bg-white/[0.08] h-px" />
            <div className="px-6 text-black/40 dark:text-white/40 text-sm font-light tracking-wide">
              SKILLS
            </div>
            <Separator className="flex-1 bg-black/[0.08] dark:bg-white/[0.08] h-px" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-8">
          <Skills />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12">
        <div className="relative max-w-6xl mx-auto px-8 mb-12">
          <div className="flex items-center justify-center">
            <Separator className="flex-1 bg-black/[0.08] dark:bg-white/[0.08] h-px" />
            <div className="px-6 text-black/40 dark:text-white/40 text-sm font-light tracking-wide">
              EXPERIENCE
            </div>
            <Separator className="flex-1 bg-black/[0.08] dark:bg-white/[0.08] h-px" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-8">
          <Experience />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12">
        <div className="relative max-w-6xl mx-auto px-8 mb-12">
          <div className="flex items-center justify-center">
            <Separator className="flex-1 bg-black/[0.08] dark:bg-white/[0.08] h-px" />
            <div className="px-6 text-black/40 dark:text-white/40 text-sm font-light tracking-wide">
              CONTACT
            </div>
            <Separator className="flex-1 bg-black/[0.08] dark:bg-white/[0.08] h-px" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-8">
          <Contact />
        </div>
      </section>

      {/* Bottom Separator */}
      <div className="relative max-w-6xl mx-auto px-8 py-12">
        <div className="flex items-center justify-center">
          <Separator className="flex-1 bg-black/[0.08] dark:bg-white/[0.08] h-px" />
          <div className="px-6 text-black/40 dark:text-white/40 text-xs font-light tracking-wider">
            ◦
          </div>
          <Separator className="flex-1 bg-black/[0.08] dark:bg-white/[0.08] h-px" />
        </div>
      </div>
      <Footer />
      
      {/* Back to Top */}
      <div className="fixed bottom-8 right-8 z-40">
        <Button
          onClick={scrollToTop}
          variant="outline"
          size="sm"
          className="rounded-full w-12 h-12 border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl hover:bg-white/80 dark:hover:bg-black/80 transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg"
          style={{
            opacity: lastScrollY > 500 ? 1 : 0,
            transform: `translateY(${lastScrollY > 500 ? '0' : '20px'}) scale(${lastScrollY > 500 ? 1 : 0.8})`
          }}
          aria-label="Back to top"
        >
          ↑
        </Button>
      </div>
    </div>
  );
}