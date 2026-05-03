"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, User, Settings, Shield, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="logo" style={{ fontWeight: 800, fontSize: "1.25rem", color: "var(--foreground)" }}>
          Framework<span style={{ color: "var(--primary)" }}>.</span>
        </Link>

        <nav className="nav-links">
          <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            Domů
          </Link>
          
          {session ? (
            <>
              {session.user && (session.user as any).role === 'ADMIN' && (
                <Link href="/admin" className={`nav-link ${pathname === "/admin" ? "active" : ""}`}>
                  <Shield size={18} style={{ marginRight: '4px' }} />
                  Admin
                </Link>
              )}
              <Link href="/profile" className={`nav-link ${pathname === "/profile" ? "active" : ""}`}>
                <User size={18} style={{ marginRight: '4px' }} />
                Profil
              </Link>
              <button 
                onClick={() => signOut()} 
                className="button button-outline"
                style={{ padding: '0.5rem 1rem' }}
              >
                <LogOut size={18} />
                Odhlásit
              </button>
            </>
          ) : (
            <Link href="/login" className="button button-primary">
              <LogIn size={18} />
              Přihlásit
            </Link>
          )}
        </nav>

        {/* Mobile menu could be added here */}
      </div>
    </header>
  );
}
