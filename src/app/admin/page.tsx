import { prisma } from "@/lib/prisma";
import { Settings, Server, Globe, MessageSquare, Database, Mail, Github, Cloud } from "lucide-react";

export default async function AdminPage() {
  // Fetch configs
  const configs = await prisma.config.findMany({
    orderBy: { category: 'asc' }
  });

  const categories = {
    GENERAL: { icon: <Settings size={20} />, label: "Obecné nastavení" },
    TECHNICAL: { icon: <Server size={20} />, label: "Technické parametry" },
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Administrace</h1>
        <p style={{ color: 'var(--muted-foreground)' }}>Správa parametrů a konfigurace systému</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* General Config */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ color: 'var(--primary)' }}>{categories.GENERAL.icon}</div>
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{categories.GENERAL.label}</h2>
          </div>
          
          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Klíč</th>
                  <th style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Hodnota</th>
                </tr>
              </thead>
              <tbody>
                {configs.filter(c => c.category === 'GENERAL').map(config => (
                  <tr key={config.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem 0', fontSize: '0.875rem', fontWeight: 500 }}>{config.key}</td>
                    <td style={{ padding: '1rem 0', fontSize: '0.875rem' }}>{config.value || <span style={{ color: 'var(--muted-foreground)', fontStyle: 'italic' }}>nenastaveno</span>}</td>
                  </tr>
                ))}
                {configs.filter(c => c.category === 'GENERAL').length === 0 && (
                  <tr>
                    <td colSpan={2} style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                      Žádné parametry nenalezeny
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Technical Config */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ color: 'var(--primary)' }}>{categories.TECHNICAL.icon}</div>
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{categories.TECHNICAL.label}</h2>
          </div>
          
          <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: 'var(--radius)', backgroundColor: 'var(--accent)' }}>
                <Mail size={18} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Mail Server</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Konfigurace SMTP pro odesílání emailů</div>
                </div>
                <button className="button button-outline" style={{ padding: '0.25rem 0.75rem', height: 'auto' }}>Nastavit</button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: 'var(--radius)', backgroundColor: 'var(--accent)' }}>
                <Cloud size={18} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Externí úložiště</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>S3, Azure, nebo Google Cloud Storage</div>
                </div>
                <button className="button button-outline" style={{ padding: '0.25rem 0.75rem', height: 'auto' }}>Nastavit</button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: 'var(--radius)', backgroundColor: 'var(--accent)' }}>
                <Github size={18} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Git Projekt</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Propojení s GitHub/GitLab repozitářem</div>
                </div>
                <button className="button button-outline" style={{ padding: '0.25rem 0.75rem', height: 'auto' }}>Nastavit</button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: 'var(--radius)', backgroundColor: 'var(--accent)' }}>
                <MessageSquare size={18} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>ChatGPT API</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Klíč k API pro funkce umělé inteligence</div>
                </div>
                <button className="button button-outline" style={{ padding: '0.25rem 0.75rem', height: 'auto' }}>Nastavit</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
