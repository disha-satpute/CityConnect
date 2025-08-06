// components/ui/tabs.tsx
'use client';

import * as React from 'react';

interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ children, className }: TabsProps) {
  return <div className={`tabs ${className}`}>{children}</div>;
}

export function TabsList({ children, className }: TabsProps) {
  return <div className={`tabs-list ${className}`}>{children}</div>;
}

export function TabsTrigger({ children, className }: TabsProps) {
  return <button className={`tabs-trigger ${className}`}>{children}</button>;
}

export function TabsContent({ children, className }: TabsProps) {
  return <div className={`tabs-content ${className}`}>{children}</div>;
}
