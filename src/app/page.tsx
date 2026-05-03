import Link from "next/link";
import { ArrowRight, Shield, Zap, Layout, MobileFriendly, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '6rem 1.5rem', 
        textAlign: 'center', 
        background: 'radial-gradient(circle at top, rgba(37, 99, 235, 0.05), transparent)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container">
          <div className="animate-fade-in" style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '2rem', backgroundColor: 'var(--accent)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Univerzální Framework v1.0
          </div>
          <h1 style={{ fontSize: '3.5rem', maxWidth: '800px', margin: '0 auto 1.5rem auto', lineHeight: 1.1 }}>
            Moderní základ pro vaše <span style={{ color: 'var(--primary)' }}>příští projekty</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Čistý, rychlý a snadno přizpůsobitelný framework s připravenou administrací a uživatelskými profily.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/login" className="button button-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
              Začít projekt <ArrowRight size={20} />
            </Link>
            <Link href="/admin" className="button button-outline" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
              Administrace
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="card animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Shield size={24} />
              </div>
              <h3>Bezpečná autentizace</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                Implementované přihlašování pomocí NextAuth s podporou rolí a zabezpečením hesel přes bcrypt.
              </p>
            </div>

            <div className="card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Layout size={24} />
              </div>
              <h3>Admin Dashboard</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                Připravená sekce pro správu parametrů, technické konfigurace a uživatelů.
              </p>
            </div>

            <div className="card animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Smartphone size={24} />
              </div>
              <h3>Mobile First</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                Plně responzivní design optimalizovaný pro mobilní zařízení i desktop.
              </p>
            </div>

            <div className="card animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Zap size={24} />
              </div>
              <h3>Moderní Stack</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                Next.js, Prisma, PostgreSQL a Railway ready. Vše, co potřebujete pro rychlý start.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
