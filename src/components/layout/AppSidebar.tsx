'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINK_MAP = [{ name: '대시보드', href: '/', icon: Home }];

export default function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <h1>하나루프</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {LINK_MAP.map((link) => {
              const isActive =
                path === '/' ? path === link.href : path.includes(link.href);

              return (
                <SidebarMenuItem key={link.name}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={link.href} className='flex items-center gap-1'>
                      <link.icon />
                      {link.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
