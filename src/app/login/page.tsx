"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User, Lock, Eye, Shield, Globe } from 'lucide-react';
import { message } from 'antd';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      const loginEmail = email === 'founder' ? 'founder@calf.one' : email;

      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

      if (error) {
        setErrorMsg(error.message || 'INVALID CREDENTIALS');
      } else {
        messageApi.success('ACCESS GRANTED. INITIALIZING...');
        setTimeout(() => {
          router.refresh();
          router.push('/');
        }, 1500);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'SYSTEM ERROR');
    } finally {
      setLoading(false);
    }
  };

  const panelStyle = {
    backgroundColor: '#020617', // Very dark slate
    border: '1px solid rgba(59, 130, 246, 0.4)',
    borderRadius: '16px',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
  };

  const statusRow = (label: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '12px', color: '#94a3b8', letterSpacing: '1px' }}>
      <span>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#10b981', fontSize: '11px', letterSpacing: '1px' }}>ONLINE</span>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
      </div>
    </div>
  );

  const statRow = (label: string, value: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '12px', color: '#94a3b8', letterSpacing: '1px' }}>
      <span>{label}</span>
      <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>{value}</span>
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw',
      backgroundColor: '#000000', // Pure black background
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      overflowX: 'hidden'
    }}>
      {contextHolder}

      {/* TOP NEON HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginBottom: '60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '250px' }}>
          <div style={{ height: '8px', backgroundColor: '#ef4444', boxShadow: '0 0 15px #ef4444', borderRadius: '4px' }} />
          <div style={{ height: '8px', backgroundColor: '#ef4444', boxShadow: '0 0 15px #ef4444', borderRadius: '4px' }} />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontFamily: 'cursive, Georgia, serif', 
            fontSize: '5rem', 
            fontWeight: 800, 
            margin: 0, 
            color: '#3b82f6', 
            textShadow: '0 0 30px rgba(59,130,246,0.8)',
            lineHeight: 1
          }}>
            Calf
          </h1>
          <div style={{ fontSize: '13px', letterSpacing: '6px', color: '#3b82f6', marginTop: '8px', fontWeight: 700 }}>
            COFFEE & MILKBAR
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '250px' }}>
          <div style={{ height: '8px', backgroundColor: '#ef4444', boxShadow: '0 0 15px #ef4444', borderRadius: '4px' }} />
          <div style={{ height: '8px', backgroundColor: '#ef4444', boxShadow: '0 0 15px #ef4444', borderRadius: '4px' }} />
        </div>
      </div>

      {/* 3-COLUMN GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(280px, 320px) minmax(400px, 560px) minmax(280px, 320px)', 
        gap: '30px',
        maxWidth: '1400px',
        width: '100%',
        alignItems: 'stretch'
      }}>
        
        {/* LEFT PANELS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={panelStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'cursive', fontSize: '2rem', color: '#3b82f6', textShadow: '0 0 10px rgba(59,130,246,0.6)', lineHeight: 1 }}>Calf</div>
                <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#60a5fa', marginTop: '4px' }}>COFFEE & MILKBAR</div>
              </div>
            </div>
            
            <div style={{ fontSize: '12px', color: '#e2e8f0', letterSpacing: '2px', borderBottom: '1px solid rgba(59,130,246,0.3)', paddingBottom: '10px', marginBottom: '20px' }}>
              SYSTEM STATUS
            </div>
            <div style={{ paddingRight: '10px' }}>
              {statusRow('OPERATIONS')}
              {statusRow('SUPPLY CHAIN')}
              {statusRow('INVENTORY')}
              {statusRow('STORE NETWORK')}
            </div>
          </div>

          <div style={{ ...panelStyle, flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <Globe size={160} color="#3b82f6" strokeWidth={0.5} style={{ opacity: 0.5, filter: 'drop-shadow(0 0 15px rgba(59,130,246,0.5))' }} />
            <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(circle, transparent 40%, #020617 70%)' }}></div>
          </div>
        </div>

        {/* CENTER LOGIN FORM */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ 
            ...panelStyle, 
            padding: '50px 40px', 
            borderRadius: '24px', 
            flex: 1,
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontSize: '13px', letterSpacing: '4px', color: '#94a3b8', marginBottom: '16px' }}>WELCOME BACK!</div>
              <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 12px', letterSpacing: '1px', color: '#ffffff' }}>COMMAND CENTER ACCESS</h2>
              <div style={{ fontSize: '15px', color: '#94a3b8' }}>Please sign in to continue</div>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: '0 auto', width: '100%' }}>
              {errorMsg && (
                <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', color: '#fca5a5', fontSize: '13px', textAlign: 'center' }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ position: 'relative' }}>
                <User size={18} color="#64748b" style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    borderRadius: '8px',
                    padding: '16px 16px 16px 48px',
                    color: '#ffffff',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.boxShadow = '0 0 10px rgba(59,130,246,0.3)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#64748b" style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)' }} />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    borderRadius: '8px',
                    padding: '16px 48px 16px 48px',
                    color: '#ffffff',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.boxShadow = '0 0 10px rgba(59,130,246,0.3)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
                <Eye size={18} color="#64748b" style={{ position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)', cursor: 'pointer' }} />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                style={{
                  backgroundColor: '#2563eb', // Solid blue like the reference
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '15px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  cursor: loading ? 'wait' : 'pointer',
                  boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)',
                  marginTop: '8px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(59, 130, 246, 0.2)' }} />
                <div style={{ padding: '0 16px', color: '#64748b', fontSize: '13px' }}>or</div>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(59, 130, 246, 0.2)' }} />
              </div>

              <button 
                type="button" 
                style={{
                  backgroundColor: 'transparent',
                  color: '#e2e8f0',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <Shield size={18} color="#94a3b8" />
                Use Single Sign-On
              </button>
            </form>
          </div>
          
          <div style={{ 
            ...panelStyle, 
            padding: '20px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '4px', color: '#94a3b8', marginBottom: '8px' }}>DAILY BRIEFING</div>
            <div style={{ fontSize: '13px', letterSpacing: '3px', color: '#ffffff', fontWeight: 600 }}>FOCUS. EXECUTE. DELIVER.</div>
          </div>
        </div>

        {/* RIGHT PANELS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ ...panelStyle, flex: 1, position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '12px', color: '#e2e8f0', letterSpacing: '2px', marginBottom: '20px' }}>
              STORE NETWORK
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Globe size={180} color="#1e3a8a" strokeWidth={0.5} style={{ opacity: 0.6 }} />
            </div>
            {/* Red glowing dots imitating the map in the reference */}
            <div style={{ position: 'absolute', top: '40%', left: '40%', width: '4px', height: '4px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444, 0 0 20px #ef4444' }} />
            <div style={{ position: 'absolute', top: '60%', left: '50%', width: '4px', height: '4px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444, 0 0 20px #ef4444' }} />
            <div style={{ position: 'absolute', top: '35%', left: '70%', width: '4px', height: '4px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444, 0 0 20px #ef4444' }} />
            <div style={{ position: 'absolute', top: '55%', left: '20%', width: '4px', height: '4px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444, 0 0 20px #ef4444' }} />
            <div style={{ position: 'absolute', top: '70%', left: '80%', width: '4px', height: '4px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444, 0 0 20px #ef4444' }} />
          </div>

          <div style={panelStyle}>
            <div style={{ fontSize: '12px', color: '#e2e8f0', letterSpacing: '2px', borderBottom: '1px solid rgba(59,130,246,0.3)', paddingBottom: '10px', marginBottom: '20px' }}>
              PERFORMANCE OVERVIEW
            </div>
            
            <div style={{ paddingRight: '10px' }}>
              {statRow('TOTAL STORES', '128')}
              {statRow('TODAY\'S SALES', '3,520')}
              {statRow('ACTIVE ORDERS', '84')}
              {statRow('SYSTEM UPTIME', '99.9%')}
            </div>

            <div style={{ marginTop: '20px', height: '50px', display: 'flex', alignItems: 'flex-end', gap: '4px', borderBottom: '1px solid rgba(59,130,246,0.3)' }}>
              {/* Fake bar chart */}
              {[30, 45, 25, 60, 40, 70, 50, 80, 60, 95].map((height, i) => (
                <div key={i} style={{ 
                  flex: 1, 
                  height: `${height}%`, 
                  backgroundColor: 'rgba(59, 130, 246, 0.8)', 
                  boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
                  borderTopLeftRadius: '2px',
                  borderTopRightRadius: '2px'
                }} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
