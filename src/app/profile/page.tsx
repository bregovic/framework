"use client";

import { useState, useEffect } from "react";
import { User, Mail, Camera, Bell, Lock, Save, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    notifications: true
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        surname: (session.user as any).surname || "",
        notifications: (session.user as any).notifications ?? true
      });
      setPreview(session.user.image || null);
    }
  }, [session]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("surname", formData.surname);
    data.append("notifications", String(formData.notifications));
    if (file) {
      data.append("file", file);
    }

    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setMessage("Profil byl úspěšně aktualizován");
        await update();
        router.refresh();
      } else {
        setMessage("Chyba při ukládání profilu");
      }
    } catch (err) {
      setMessage("Něco se nepovedlo");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Načítání...</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Můj profil</h1>
        <p style={{ color: 'var(--muted-foreground)' }}>Spravujte své osobní údaje a nastavení</p>
      </div>

      {message && (
        <div style={{ 
          padding: '1rem', 
          borderRadius: 'var(--radius)', 
          backgroundColor: message.includes('Chyba') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
          color: message.includes('Chyba') ? 'var(--destructive)' : '#166534',
          marginBottom: '1.5rem',
          fontSize: '0.875rem'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Profile Image Section */}
        <section className="card" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'var(--accent)', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border)' }}>
            {preview ? (
              <img src={preview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={64} color="var(--muted-foreground)" />
            )}
            <label htmlFor="photo-upload" style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'var(--primary)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', color: 'white', border: '2px solid var(--card)', transition: 'transform 0.2s ease' }}>
              <Camera size={16} />
              <input type="file" id="photo-upload" style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: '0.25rem' }}>{formData.name} {formData.surname}</h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>{session.user?.email}</p>
            <p style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {(session.user as any).role || 'Uživatel'}
            </p>
          </div>
        </section>

        {/* Personal Info Form */}
        <section className="card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Osobní údaje</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="label">Jméno</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="Vaše jméno"
              />
            </div>
            <div className="form-group">
              <label className="label">Příjmení</label>
              <input 
                type="text" 
                value={formData.surname} 
                onChange={(e) => setFormData({...formData, surname: e.target.value})} 
                placeholder="Vaše příjmení"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">E-mail</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
              <input type="email" style={{ paddingLeft: '2.5rem', backgroundColor: 'var(--accent)', cursor: 'not-allowed' }} value={session.user?.email || ""} readOnly />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: 'var(--radius)', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Bell size={20} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Odesílat notifikace</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Budete dostávat důležité informace na e-mail</div>
              </div>
            </div>
            <div 
              onClick={() => setFormData({...formData, notifications: !formData.notifications})}
              style={{ 
                width: '44px', 
                height: '24px', 
                borderRadius: '12px', 
                backgroundColor: formData.notifications ? 'var(--primary)' : 'var(--muted)', 
                position: 'relative', 
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                backgroundColor: 'white', 
                position: 'absolute', 
                top: '2px', 
                left: formData.notifications ? '22px' : '2px',
                transition: 'left 0.2s ease',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }} />
            </div>
          </div>

          <button type="submit" className="button button-primary" style={{ marginTop: '2rem', width: '100%' }} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Uložit změny</>}
          </button>
        </section>

        {/* Password Change */}
        <section className="card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={20} />
            Změna hesla
          </h2>
          <div className="form-group">
            <label className="label">Současné heslo</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label className="label">Nové heslo</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label className="label">Potvrzení nového hesla</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="button" className="button button-outline" style={{ marginTop: '1rem', width: '100%' }}>
            Změnit heslo
          </button>
        </section>
      </form>
    </div>
  );
}
