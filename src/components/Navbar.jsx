/* eslint-disable react/prop-types */
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LogOut, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const links = [
  { name: "Home", href: "/" },
  { name: "Practice", href: "/home" },
  // { name: "Demo", href: "/demo" },
];

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

export default function Navbar({ authenticated, user, onLogout }) {



  const navigate = useNavigate();
  const { pathname } = useLocation();
  const storedUser = getStoredUser();
  const activeUser = typeof user === "object" && user ? user : storedUser;

  return (
<nav
  className="
    fixed inset-x-0 top-0 z-50 backdrop-blur-xl
    supports-[backdrop-filter]:bg-[#ECF2EE]/55
    dark:supports-[backdrop-filter]:bg-[#132428]/40

    shadow-[0_1px_0_rgba(255,255,255,0.04)]
  "
>      <div className="mx-auto item flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-bold tracking-tight text-zinc-950 dark:text-white"
        >
          <img
                    alt="User"
                    className="h-7 w-7 object-cover"
                    src= "icon.avif" 
                  />
          {/* <img src="icon.png" alt="logo" /> */}
          {/* <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white shadow-sm dark:bg-white dark:text-zinc-950">
            <Sparkles className="h-4 w-4" />
          </span> */}
          <span className="font-thin text-xl">Interview Valley</span>
        </Link>

        {/* <div className="hidden items-center gap-1 rounded-lg border border-zinc-900/10 bg-zinc-100/70 p-1 dark:border-white/10 dark:bg-white/5 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-white"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                }`}
                key={link.href}
                to={link.href}
              >
                {link.name}
              </Link>
            );
          })}
        </div> */}

        <div className="flex items-center gap-2">
          <ModeToggle />
          {authenticated ? (
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 rounded-lg border border-zinc-900/10 bg-white px-2 py-1.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10">
                {activeUser?.picture ? (
                  <img
                    alt={activeUser?.name || "User"}
                    className="h-7 w-7 rounded-md object-cover"
                    src={activeUser.picture}
                  />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-950 text-xs text-white dark:bg-white dark:text-zinc-950">
                    {(activeUser?.name || "U").slice(0, 1)}
                  </span>
                )}
                <span className="hidden max-w-28 truncate sm:inline">
                  {activeUser?.name || "Account"}
                </span>
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-lg border border-zinc-900/10 bg-white p-2 shadow-xl focus:outline-none dark:border-white/10 dark:bg-zinc-950">
                <div className="border-b border-zinc-900/10 px-3 py-2 dark:border-white/10">
                  <p className="truncate text-sm font-semibold text-zinc-950 dark:text-white">
                    {activeUser?.name || "Signed in"}
                  </p>
                  <p className="truncate text-xs text-zinc-500">
                    {activeUser?.email || "Ready to practice"}
                  </p>
                </div>
                <MenuItem>
                  <Link
                    className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-white/10"
                    onClick={onLogout}
                    to="/"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <Button
              className="h-10 rounded-lg px-4 font-semibold"
              onClick={() => navigate("/signin")}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
