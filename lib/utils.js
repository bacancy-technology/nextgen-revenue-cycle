import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Activity,
  BadgeDollarSign,
  CalendarDays,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  PieChart,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export function formatCompactNumber(value) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value || 0);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export const appNavigation = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Patients", href: "/patients", icon: UserRound },
  { title: "Appointments", href: "/appointments", icon: CalendarDays },
  { title: "Claims", href: "/claims", icon: ClipboardList },
  { title: "Payments", href: "/payments", icon: CreditCard },
  { title: "Reports", href: "/reports", icon: PieChart },
  { title: "Portal", href: "/portal", icon: Activity },
  { title: "Settings", href: "/settings", icon: Settings },
];

export const quickActions = [
  { label: "New patient", icon: UserRound },
  { label: "Create claim", icon: ClipboardList },
  { label: "Post payment", icon: BadgeDollarSign },
  { label: "Audit trail", icon: ShieldCheck },
];
