"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ThemeToggle } from '@/components/shared/theme-toggle';


const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
       <TooltipProvider>
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm shadow-lg rounded-full p-2 border">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300',
                      isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
           <ThemeToggle />
        </div>
      </TooltipProvider>
    </nav>
  );
}
