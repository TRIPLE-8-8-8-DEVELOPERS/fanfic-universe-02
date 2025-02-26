
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  PenTool, 
  Star,
  CheckCircle,
  Clock3,
  Timer,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock active contests data
const activeContests = [
  {
    id: "contest1",
    title: "Summer Fantasy Challenge",
    description: "Write a fantasy short story under 5,000 words featuring a summer solstice celebration.",
    deadline: "August 15, 2023",
    daysLeft: 12,
    prizes: [
      { place: "1st", award: "$500 + Featured Publication" },
      { place: "2nd", award: "$250" },
      { place: "3rd", award: "$100" },
    ],
    entries: 145,
    views: 3421,
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
    category: "Short Story",
    wordLimit: "5,000 words",
    judges: [
      { name: "Eleanor Williams", avatar: "https://i.pravatar.cc/150?img=29" },
      { name: "Marcus Reed", avatar: "https://i.pravatar.cc/150?img=12" },
    ],
  },
  {
    id: "contest2",
    title: "Sci-Fi Microfiction Contest",
    description: "Create a sci-fi story in exactly 100 words that explores the theme of artificial intelligence.",
    deadline: "July 30, 2023",
    daysLeft: 5,
    prizes: [
      { place: "1st", award: "$300 + Publication" },
      { place: "2nd", award: "$150" },
      { place: "3rd", award: "$75" },
    ],
    entries: 287,
    views: 2938,
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
    category: "Microfiction",
    wordLimit: "Exactly 100 words",
    judges: [
      { name: "Sofia Garcia", avatar: "https://i.pravatar.cc/150?img=16" },
      { name: "James Holden", avatar: "https://i.pravatar.cc/150?img=11" },
    ],
  },
  {
    id: "contest3",
    title: "Character Monologue Challenge",
    description: "Write a compelling monologue that reveals a character's hidden depths. Any genre welcome.",
    deadline: "August 22, 2023",
    daysLeft: 19,
    prizes: [
      { place: "1st", award: "$400 + Feedback from Published Author" },
      { place: "2nd", award: "$200" },
      { place: "3rd", award: "$100" },
    ],
    entries: 112,
    views: 1876,
    banner: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    category: "Character Study",
    wordLimit: "1,000 words",
    judges: [
      { name: "Leo Zhang", avatar: "https://i.pravatar.cc/150?img=61" },
      {