"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  CalendarCheck2,
  Building2,
  LogOut,
  User,
  Compass,
  Edit2,
  Check,
  Camera,
  Trash2,
  Loader2,
  HelpCircle,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";

interface UserProfile {
  id?: string;
  name: string;
  email: string;
  image?: string | null;
}

function NavContent() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Image load error fallback
  const [imageError, setImageError] = useState(false);

  // Edit states
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [updatingName, setUpdatingName] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputDesktopRef = useRef<HTMLInputElement>(null);
  const fileInputMobileRef = useRef<HTMLInputElement>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const [glider, setGlider] = useState({ left: 0, width: 0, ready: false });

  // ইউজার সেশন লোড করা
  useEffect(() => {
    function loadUser() {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("studiospace_user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setCurrentUser(parsed);
            setEditedName(parsed.name || "");
            setImageError(false);
          } catch {}
        }
      }
    }
    loadUser();
  }, []);

  const navItems = [
    { name: "Home", href: "/", id: "home" },
    { name: "Explore", href: "/studios", id: "studios", icon: Compass },
    { name: "How It Works", href: "/how-it-works", id: "how-it-works", icon: HelpCircle },
    { name: "About Us", href: "/about-us", id: "about-us", icon: Info },
    { name: "Dashboard", href: "/dashboard", id: "dashboard", icon: LayoutDashboard },
  ];

  const getActiveIndex = useCallback(() => {
    if (pathname === "/") return 0;
    if (pathname.startsWith("/studios")) return 1;
    if (pathname.startsWith("/how-it-works")) return 2;
    if (pathname.startsWith("/about-us")) return 3;
    if (pathname.startsWith("/dashboard")) return 4;
    return -1;
  }, [pathname]);

  const updateGlider = useCallback(() => {
    const idx = getActiveIndex();
    if (navRef.current && idx !== -1) {
      const targetBtn = navRef.current.children[idx + 1] as HTMLElement;
      if (targetBtn) {
        setGlider({
          left: targetBtn.offsetLeft,
          width: targetBtn.offsetWidth,
          ready: true,
        });
      }
    } else {
      setGlider((prev) => ({ ...prev, ready: false }));
    }
  }, [getActiveIndex]);

  useEffect(() => {
    updateGlider();
    window.addEventListener("resize", updateGlider);
    return () => window.removeEventListener("resize", updateGlider);
  }, [updateGlider]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ফটো ফাইল আপলোড
  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser?.email) return;

    if (file.size > 3 * 1024 * 1024) {
      toast.error("Please select an image smaller than 3MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setUploadingImage(true);
      try {
        const res = await fetch("/api/user/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: currentUser.email, image: base64 }),
        });

        const data = await res.json();
        if (res.ok && data.user) {
          setCurrentUser(data.user);
          setImageError(false);
          localStorage.setItem("studiospace_user", JSON.stringify(data.user));
          toast.success("Profile photo updated!");
        } else {
          toast.error(data.message || "Failed to update photo");
        }
      } catch {
        toast.error("Network error while uploading photo");
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // ফটো রিমুভ
  const handleRemovePhoto = async () => {
    if (!currentUser?.email) return;
    if (!confirm("Are you sure you want to remove your profile photo?")) return;

    setUploadingImage(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email, image: "" }),
      });

      const data = await res.json();
      if (res.ok && data.user) {
        setCurrentUser(data.user);
        setImageError(false);
        localStorage.setItem("studiospace_user", JSON.stringify(data.user));
        toast.success("Profile photo removed!");
      } else {
        toast.error(data.message || "Failed to remove photo");
      }
    } catch {
      toast.error("Network error while removing photo");
    } finally {
      setUploadingImage(false);
    }
  };

  // নাম সেভ
  const handleSaveName = async () => {
    if (!editedName.trim() || !currentUser?.email) {
      toast.error("Name cannot be empty");
      return;
    }

    setUpdatingName(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email, name: editedName.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.user) {
        setCurrentUser(data.user);
        localStorage.setItem("studiospace_user", JSON.stringify(data.user));
        toast.success("Name updated successfully!");
        setIsEditingName(false);
      } else {
        toast.error(data.message || "Failed to update name");
      }
    } catch {
      toast.error("Network error while saving name");
    } finally {
      setUpdatingName(false);
    }
  };

  // সাইন আউট
  const handleLogout = () => {
    localStorage.removeItem("studiospace_user");
    document.cookie = "studiospace_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setCurrentUser(null);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    toast.success("Logged out");
    window.location.href = "/login";
  };

  const hasValidImage = Boolean(currentUser?.image && currentUser.image.trim() !== "" && !imageError);

  return (
    <nav suppressHydrationWarning
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-slate-950/90 shadow-lg shadow-cyan-950/20 backdrop-blur-xl"
          : "border-b border-white/5 bg-slate-950/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-md shadow-cyan-500/20 transition-all duration-300 group-hover:scale-110">
            <Sparkles className="h-5 w-5 text-white transition-transform duration-500 group-hover:rotate-12" />
          </div>
          <span className="text-lg font-black tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-300">
            Studio<span className="text-cyan-400">Space</span>
          </span>
        </Link>

        {/* Center Navbar (Desktop) */}
        <div
          ref={navRef}
          className="relative hidden md:flex items-center rounded-full border border-white/10 bg-slate-900/40 p-1 backdrop-blur-md"
        >
          <div
            className={`absolute top-1 bottom-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 transition-all duration-300 ease-out pointer-events-none ${
              glider.ready ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translateX(${glider.left}px)`,
              width: `${glider.width}px`,
            }}
          >
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
          </div>

          {navItems.map((item, idx) => {
            const isActive = getActiveIndex() === idx;
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                  isActive ? "text-cyan-400" : "text-slate-400 hover:text-white"
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Profile */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-900/60 py-1 pl-1 pr-3 text-xs font-medium text-white hover:border-cyan-500/40 hover:bg-white/10 transition shadow-md cursor-pointer"
              >
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-xs font-black text-slate-950 uppercase overflow-hidden border border-white/20">
                  {hasValidImage ? (
                    <img
                      src={currentUser?.image as string}
                      alt={currentUser?.name || "User"}
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{currentUser?.name?.trim().charAt(0) || "U"}</span>
                  )}
                </div>
                <span className="max-w-28 truncate font-semibold">{currentUser.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-3xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-2xl z-50">
                  <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-950/70 border border-white/5 mb-3 text-center">
                    <div className="relative mb-2">
                      <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-cyan-400/50 bg-slate-900 flex items-center justify-center">
                        {uploadingImage ? (
                          <Loader2 className="h-6 w-6 text-cyan-400 animate-spin" />
                        ) : hasValidImage ? (
                          <img
                            src={currentUser?.image as string}
                            alt="Profile"
                            referrerPolicy="no-referrer"
                            onError={() => setImageError(true)}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-black text-cyan-400 uppercase">
                            {currentUser?.name?.trim().charAt(0) || "U"}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputDesktopRef.current?.click()}
                        className="absolute bottom-0 right-0 p-1.5 rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition cursor-pointer"
                      >
                        <Camera className="h-3 w-3" />
                      </button>
                      <input
                        type="file"
                        ref={fileInputDesktopRef}
                        accept="image/*"
                        onChange={handleImageFile}
                        className="hidden"
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <button
                        type="button"
                        onClick={() => fileInputDesktopRef.current?.click()}
                        className="text-cyan-400 font-semibold hover:underline cursor-pointer"
                      >
                        Change Photo
                      </button>
                      {hasValidImage && (
                        <>
                          <span className="text-slate-600">•</span>
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="text-rose-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="h-2.5 w-2.5" /> Remove
                          </button>
                        </>
                      )}
                    </div>

                    {isEditingName ? (
                      <div className="flex items-center gap-1.5 w-full mt-1">
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="w-full rounded-lg border border-cyan-400/50 bg-slate-900 px-2.5 py-1 text-xs text-white focus:outline-none"
                          placeholder="Your Name"
                          autoFocus
                        />
                        <button
                          type="button"
                          disabled={updatingName}
                          onClick={handleSaveName}
                          className="p-1.5 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition cursor-pointer"
                        >
                          {updatingName ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingName(false);
                            setEditedName(currentUser.name);
                          }}
                          className="p-1.5 rounded-lg bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1.5 w-full mt-1">
                        <p className="text-sm font-bold text-white truncate max-w-44">{currentUser.name}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setEditedName(currentUser.name);
                            setIsEditingName(true);
                          }}
                          className="p-1 text-slate-400 hover:text-cyan-400 transition cursor-pointer"
                          title="Edit Name"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}

                    <p className="text-[11px] text-slate-400 truncate max-w-48 mt-0.5">{currentUser.email}</p>
                  </div>

                  <div className="space-y-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400 transition"
                    >
                      <LayoutDashboard className="h-4 w-4 text-cyan-400" />
                      Dashboard Hub
                    </Link>
                    <Link
                      href="/dashboard/my-studios"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400 transition"
                    >
                      <Building2 className="h-4 w-4 text-cyan-400" />
                      Host Manager
                    </Link>
                    <Link
                      href="/dashboard/bookings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400 transition"
                    >
                      <CalendarCheck2 className="h-4 w-4 text-cyan-400" />
                      My Bookings
                    </Link>
                    <Link
                      href="/dashboard/add-studio"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400 transition"
                    >
                      <PlusCircle className="h-4 w-4 text-cyan-400" />
                      List a Studio
                    </Link>
                  </div>

                  <div className="border-t border-white/10 my-2" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition">
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 h-9 text-xs font-semibold text-white shadow-md shadow-cyan-600/20 hover:from-blue-500 hover:to-cyan-500 transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {currentUser && (
            <div className="h-8 w-8 rounded-full overflow-hidden border border-white/20 bg-slate-900 flex items-center justify-center text-xs font-bold text-white uppercase">
              {hasValidImage ? (
                <img
                  src={currentUser.image as string}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{currentUser.name?.trim().charAt(0) || "U"}</span>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/98 px-5 py-6 space-y-6 backdrop-blur-2xl max-h-[85vh] overflow-y-auto">
          {currentUser ? (
            <div className="p-4 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-cyan-400/50 bg-slate-950 flex items-center justify-center">
                    {uploadingImage ? (
                      <Loader2 className="h-5 w-5 text-cyan-400 animate-spin" />
                    ) : hasValidImage ? (
                      <img
                        src={currentUser.image as string}
                        alt="Mobile Profile"
                        referrerPolicy="no-referrer"
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-black text-cyan-400 uppercase">
                        {currentUser.name?.trim().charAt(0) || "U"}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputMobileRef.current?.click()}
                    className="absolute bottom-0 right-0 p-1.5 rounded-full bg-cyan-500 text-slate-950 shadow-md cursor-pointer"
                  >
                    <Camera className="h-3 w-3" />
                  </button>

                  <input
                    type="file"
                    ref={fileInputMobileRef}
                    accept="image/*"
                    onChange={handleImageFile}
                    className="hidden"
                  />
                </div>

                <div className="overflow-hidden flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">Profile Sector</span>
                    {!isEditingName && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditedName(currentUser.name);
                          setIsEditingName(true);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:underline cursor-pointer"
                      >
                        <Edit2 className="h-3 w-3" /> Edit Name
                      </button>
                    )}
                  </div>

                  {isEditingName ? (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="w-full rounded-lg border border-cyan-400/50 bg-slate-950 px-2 py-1 text-xs text-white focus:outline-none"
                        placeholder="Your Name"
                        autoFocus
                      />
                      <button
                        type="button"
                        disabled={updatingName}
                        onClick={handleSaveName}
                        className="p-1 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 cursor-pointer"
                      >
                        {updatingName ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingName(false);
                          setEditedName(currentUser.name);
                        }}
                        className="p-1 rounded-lg bg-white/10 text-slate-400 cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
                  )}

                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{currentUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => fileInputMobileRef.current?.click()}
                  className="text-cyan-400 font-semibold cursor-pointer hover:underline"
                >
                  Upload Photo
                </button>
                {hasValidImage && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-rose-400 font-semibold flex items-center gap-1 cursor-pointer hover:underline"
                  >
                    <Trash2 className="h-3 w-3" /> Remove Photo
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 p-3 rounded-2xl bg-slate-900/50 border border-white/10">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-cyan-500 text-xs font-bold text-slate-950 shadow-md"
              >
                Create Account
              </Link>
            </div>
          )}

          {/* Links with How It Works & About Us */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3">Menu</span>
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ))}
          </div>

          {currentUser && (
            <div className="space-y-1 pt-2 border-t border-white/10">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3">Management</span>
              <Link
                href="/dashboard/my-studios"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400"
              >
                <Building2 className="h-4 w-4 text-cyan-400" />
                Host Manager
              </Link>
              <Link
                href="/dashboard/bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400"
              >
                <CalendarCheck2 className="h-4 w-4 text-cyan-400" />
                My Bookings
              </Link>
              <Link
                href="/dashboard/add-studio"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-cyan-400"
              >
                <PlusCircle className="h-4 w-4 text-cyan-400" />
                List a Studio
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition mt-2 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
export default function Nav() {
  return (
    <Suspense fallback={<div className="h-16 w-full bg-slate-950/60 border-b border-white/5" />}>
      <NavContent />
    </Suspense>
  );
}