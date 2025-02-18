"use client";

import { useState, useMemo, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from 'react';
import { icons } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Icon } from "./icon";

export type IconName = keyof typeof icons;

const ICON_BUTTONS = Object.keys(icons).map((icon) => ({
  icon: icon as IconName,
}));

export function IconPicker({
  onSelect,
  children,
  searchable = true,
  searchPlaceholder = "Search for an icon...",
  iconsList = ICON_BUTTONS
}: { 
  onSelect?: (icon: IconName) => void,
  children?: React.ReactNode,
  searchable?: boolean,
  searchPlaceholder?: string,
  iconsList?: { icon: IconName, alias?: string[] }[]
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(36);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setDisplayCount(36);
      setSearch("");
    }
  };

  const filteredIcons = useMemo(() => 
    search.trim() === "" 
      ? iconsList 
      : iconsList.filter(({ icon, alias }) =>
          icon.toLowerCase().includes(search.toLowerCase().trim()) ||
          (alias || []).some(alias => alias.toLowerCase().includes(search.toLowerCase().trim()))
        ),
    [search, iconsList]
  );

  useEffect(() => {
    setDisplayCount(36);
  }, [search]);

  const displayedIcons = useMemo(() => 
    filteredIcons.slice(0, displayCount),
    [filteredIcons, displayCount]
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 36) {
      setDisplayCount(prev => Math.min(prev + 36, filteredIcons.length));
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal={true}>
      <PopoverTrigger asChild>
        {children || (
          <Button variant="outline">
            Select an icon
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        {searchable && (
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
        )}
        <div
          className="grid grid-cols-4 gap-2 max-h-60 overflow-auto"
          onScroll={handleScroll}
        >
          {displayedIcons.map(({ icon }) => (
            <TooltipProvider key={icon}>
              <Tooltip>
                <TooltipTrigger
                  className={cn(
                    "p-2 rounded-md border hover:bg-foreground/10 transition",
                    "flex items-center justify-center"
                  )}
                  onClick={() => {
                    onSelect?.(icon);
                    setOpen(false);
                    setDisplayCount(36);
                    setSearch("");
                  }}>
                  <Icon name={icon} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{icon}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          {filteredIcons.length === 0 && (
            <div className="text-center text-gray-500 col-span-4">
              No icon found
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}