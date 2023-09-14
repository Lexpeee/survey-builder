import {
  Card, 
  CardContent, 
  Container,
  Grid,
  List, 
  ListItem, 
  ListItemButton,
  ListItemContent, 
  ListItemDecorator
} from '@mui/joy'
import { 
  Home as HomeIcon, 
  Settings as SettingsIcon, 
  List as ListIcon,
  LogOut as LogOutIcon
} from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'
import { styled } from '@/stitches.config'

const HomePage = () => {
  const router = useRouter()
  
  return (
    <>
      Home page
    </>
  )
}

export default HomePage