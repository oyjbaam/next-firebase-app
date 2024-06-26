'use client'
import React, { useState } from 'react'
import { IoMoon } from 'react-icons/io5'
import { LuSunDim } from 'react-icons/lu'
import ThemeDropdownMenu from './ThemeDropdownMenu'
import { useTheme } from 'next-themes'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { IconButton } from '@/components/ui/button'
import IsOpenBackdrop from '@/components/IsOpenBackdrop'

const ToggleThemeButton = () => {
  const [open, setOpen] = useState(false)
  const { theme } = useTheme()

  return (
    <li>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <IconButton aria-label="테마 아이콘" icon={theme === 'light' ? LuSunDim : IoMoon} intent="text" />
        </DropdownMenuTrigger>
        <ThemeDropdownMenu />
      </DropdownMenu>
      <IsOpenBackdrop open={open} />
    </li>
  )
}

export default ToggleThemeButton
