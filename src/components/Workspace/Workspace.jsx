import React , { useState, useEffect, useRef, createContext, useContext } from 'react';
import {
  Files,
  Search,
  GitBranch,
  play,
  Blocks,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  X,
  code2,
  Terminal,
  Cpu,
  Monitor,
  Layout,
  Globe,
  Database,
  Folder,
  FolderOpen,
  Star,
  UserCircle,
  Briefcase,
  Wrench,
  Layers,
  Trophy,
  Mail,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Workspace.css';

gsap.registerPlugin(ScrollTrigger);

export const Work