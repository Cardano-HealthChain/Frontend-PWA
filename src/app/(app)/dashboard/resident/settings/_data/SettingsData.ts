import { User, Lock, Shield, Bell, Share2, Settings, LogOut, Info } from "lucide-react";

// Mock Data for the current user's profile information
export const mockProfile = {
    fullName: "Joshua Aladeloye", 
    dob: "Feb 24, 2025", 
    gender: "Male", 
    bloodGroup: "O+", 
    genotype: "AA",
    phone: "0801 234 5678", 
    email: "joshua@healthchain.com",
    emergencyContact: { name: "Anya", relationship: "Spouse", phone: "0901 987 6543" },
    did: "DID:HC:345EUQX"
};

// Mock Data for device and session history
export const mockDevices = [
    { device: "iPhone 15 Pro", location: "Lagos, Nigeria", lastUsed: "Jan 05, 2025", daysAgo: "34 days", ipAddress: "192.168.1.1" },
    { device: "MacBook Pro M1", location: "Remote, Abuja", lastUsed: "Feb 24, 2025", daysAgo: "24 days", ipAddress: "192.168.1.2" },
];

// Navigation Menu Items
export const menuItems = [
    { id: 'profile', icon: User, title: 'Profile Information', subtitle: 'Personal data, contact info, health ID.' },
    { id: 'security', icon: Lock, title: 'Security & Login', subtitle: 'Password, 2FA, login history, connected devices.' },
    { id: 'privacy', icon: Shield, title: 'Privacy Controls', subtitle: 'Manage consent and data controls.' },
    { id: 'notifications', icon: Bell, title: 'Notification Preferences', subtitle: 'Manage reminders and alert settings.' },
    { id: 'permissions', icon: Share2, title: 'Permissions & Sharing', subtitle: 'Quick link to the permissions you already built.' },
    { id: 'app', icon: Settings, title: 'App Preferences', subtitle: 'Theme, language, time zone, data export.' },
    { id: 'about', icon: Info, title: 'About HealthChain', subtitle: 'Version, support, terms, licenses.' },
    { id: 'logout', icon: LogOut, title: 'Logout', subtitle: 'Sign out.' },
];