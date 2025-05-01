import { TopNavItem } from "../interfaces";
import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
  IconCreditCard,
  IconHeartHandshake,
} from "@tabler/icons-react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { type SidebarData } from "../types";

export const topNav: TopNavItem[] = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
    disabled: false,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
    disabled: true,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
    disabled: true,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
    disabled: true,
  },
];

export const sidebarData: SidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Shadcn Admin",
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navGroups: [
    {
      title: "Admin",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard/overview",
          icon: IconLayoutDashboard,
        },
        {
          title: "Planes y suscripciones",
          icon: IconCreditCard,
          items: [
            {
              title: "Planes",
              url: "/plans",
            },
            {
              title: "Suscripciones",
              url: "/subscriptions",
            },
          ],
        },
        {
          title: "Usuarios",
          icon: IconUsers,
          items: [
            {
              title: "Admin. Usuarios",
              url: "/admin-users",
            },
            {
              title: "Admin. Roles",
              url: "/admin-roles",
            },
            {
              title: "Historial de acciones",
              url: "/admin-actions-history",
            },
          ],
        },
        {
          title: "Clientes",
          url: "/clients",
          // badge: "3",
          icon: IconHeartHandshake,
        },
      ],
    },
    // {
    //   title: "Pages",
    //   items: [
    //     {
    //       title: "Auth",
    //       icon: IconLockAccess,
    //       items: [
    //         {
    //           title: "Sign In",
    //           url: "/sign-in",
    //         },
    //         {
    //           title: "Sign In (2 Col)",
    //           url: "/sign-in-2",
    //         },
    //         {
    //           title: "Sign Up",
    //           url: "/sign-up",
    //         },
    //         {
    //           title: "Forgot Password",
    //           url: "/forgot-password",
    //         },
    //         {
    //           title: "OTP",
    //           url: "/otp",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Errors",
    //       icon: IconBug,
    //       items: [
    //         {
    //           title: "Unauthorized",
    //           url: "/401",
    //           icon: IconLock,
    //         },
    //         {
    //           title: "Forbidden",
    //           url: "/403",
    //           icon: IconUserOff,
    //         },
    //         {
    //           title: "Not Found",
    //           url: "/404",
    //           icon: IconError404,
    //         },
    //         {
    //           title: "Internal Server Error",
    //           url: "/500",
    //           icon: IconServerOff,
    //         },
    //         {
    //           title: "Maintenance Error",
    //           url: "/503",
    //           icon: IconBarrierBlock,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "Other",
    //   items: [
    //     {
    //       title: "Settings",
    //       icon: IconSettings,
    //       items: [
    //         {
    //           title: "Profile",
    //           url: "/settings",
    //           icon: IconUserCog,
    //         },
    //         {
    //           title: "Account",
    //           url: "/settings/account",
    //           icon: IconTool,
    //         },
    //         {
    //           title: "Appearance",
    //           url: "/settings/appearance",
    //           icon: IconPalette,
    //         },
    //         {
    //           title: "Notifications",
    //           url: "/settings/notifications",
    //           icon: IconNotification,
    //         },
    //         {
    //           title: "Display",
    //           url: "/settings/display",
    //           icon: IconBrowserCheck,
    //         },
    //       ],
    //     },
    //     {
    //       title: "Help Center",
    //       url: "/help-center",
    //       icon: IconHelp,
    //     },
    //   ],
    // },
  ],
};
