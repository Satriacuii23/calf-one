"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Row, Col, Typography, Input, Button, Checkbox, Divider, Space, message } from 'antd';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      messageApi.warning('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const loginEmail = email === 'founder' ? 'founder@calf.one' : email;

      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

      if (error) {
        messageApi.error(error.message || 'Invalid email or password');
      } else {
        messageApi.success('Welcome to CALF Data Hub! Initializing dashboard...');
        setTimeout(() => {
          router.refresh();
          router.push('/about');
        }, 1200);
      }
    } catch (err: any) {
      messageApi.error(err.message || 'Authentication System Error');
    } finally {
      setLoading(false);
    }
  };

  function handleGoogleLogin() {
    messageApi.info('Google SSO integration is configured for enterprise domains.');
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%', 
      backgroundColor: '#E2E8F0', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '24px 16px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {contextHolder}

      <div style={{ 
        maxWidth: '1120px', 
        width: '100%', 
        backgroundColor: '#1E3A8A', 
        borderRadius: '24px', 
        overflow: 'hidden', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
      }}>
        <Row align="stretch">
          
          {/* LEFT PANEL: BRANDING & ILLUSTRATION */}
          <Col xs={24} lg={12} style={{ background: '#1E3A8A', padding: '48px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
            
            <div style={{ width: '100%', paddingTop: '12px' }}>
              {/* SCRIPT LOGO WITH RED DASHES */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '45px' }}>
                  <div style={{ height: '4px', background: '#EF4444', borderRadius: '2px' }} />
                  <div style={{ height: '4px', background: '#EF4444', borderRadius: '2px' }} />
                </div>
                <span style={{ fontFamily: 'cursive, Georgia, serif', fontSize: '56px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>Calf</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '45px' }}>
                  <div style={{ height: '4px', background: '#EF4444', borderRadius: '2px' }} />
                  <div style={{ height: '4px', background: '#EF4444', borderRadius: '2px' }} />
                </div>
              </div>

              {/* DATA HUB TYPOGRAPHY */}
              <div style={{ fontSize: '42px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.08em', lineHeight: 1.1, marginBottom: '12px' }}>
                DATA HUB
              </div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#93C5FD', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
                INSIGHTS • ANALYTICS • GROWTH
              </div>
            </div>

            {/* ILLUSTRATION ARTWORK */}
            <div style={{ margin: '36px 0 12px 0', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src="/images/login-illustration.png" 
                alt="CALF Data Hub Cans Illustration" 
                style={{ maxWidth: '95%', maxHeight: '340px', objectFit: 'contain', filter: 'drop-shadow(0 20px 13px rgba(0, 0, 0, 0.3))' }}
                onError={(e: any) => { e.target.style.display = 'none'; }}
              />
            </div>

            <div style={{ fontSize: '12px', color: '#60A5FA', opacity: 0.8 }}>
              Enterprise Centralized Repository v2.0
            </div>
          </Col>

          {/* RIGHT PANEL: WHITE LOGIN FORM */}
          <Col xs={24} lg={12} style={{ background: '#FFFFFF', padding: '54px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
              
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <Title level={2} style={{ color: '#1E3A8A', fontSize: '28px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
                  Welcome Back
                </Title>
                <Text style={{ color: '#64748B', fontSize: '14px' }}>
                  Sign in to access CALF Data Hub
                </Text>
              </div>

              <form onSubmit={handleLogin}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div>
                    <Text style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>
                      Email Address
                    </Text>
                    <Input 
                      size="large"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      prefix={<User size={16} color="#94A3B8" style={{ marginRight: '6px' }} />}
                      style={{ height: '46px', borderRadius: '8px', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <Text style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>
                      Password
                    </Text>
                    <Input.Password 
                      size="large"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      prefix={<Lock size={16} color="#94A3B8" style={{ marginRight: '6px' }} />}
                      style={{ height: '46px', borderRadius: '8px', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                    <Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}>
                      <span style={{ color: '#475569', fontWeight: 500 }}>Remember me</span>
                    </Checkbox>
                    <a style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }} onClick={() => messageApi.info('Please contact HR IT administrator to reset credentials.')}>
                      Forgot password?
                    </a>
                  </div>

                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large" 
                    loading={loading}
                    style={{ 
                      background: '#1D4ED8', 
                      height: '48px', 
                      borderRadius: '8px', 
                      fontWeight: 700, 
                      fontSize: '15px',
                      boxShadow: '0 4px 6px -1px rgba(29, 78, 216, 0.3)',
                      marginTop: '4px'
                    }}
                  >
                    Sign In
                  </Button>

                  <Divider style={{ color: '#94A3B8', fontSize: '13px', margin: '12px 0', borderColor: '#E2E8F0' }}>or</Divider>

                  <Button 
                    size="large" 
                    onClick={handleGoogleLogin}
                    style={{ 
                      width: '100%', 
                      height: '48px', 
                      borderRadius: '8px', 
                      border: '1px solid #CBD5E1', 
                      background: '#FFFFFF', 
                      color: '#334155', 
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.745-.065-1.47-.19-2.17H12v4.51h6.645c-.29 1.535-1.14 2.84-2.4 3.71v3.08h3.875c2.27-2.09 3.625-5.17 3.625-9.13z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.875-3.08c-1.08.725-2.455 1.16-4.055 1.16-3.125 0-5.77-2.11-6.715-4.945H1.28v3.125C3.265 20.915 7.33 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.285 14.225c-.24-.725-.375-1.5-.375-2.225s.135-1.5.375-2.225V6.65H1.28C.465 8.275 0 10.085 0 12s.465 3.725 1.28 5.35l4.005-3.125z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.425-3.425C17.945 1.19 15.24 0 12 0 7.33 0 3.265 3.085 1.28 7.025l4.005 3.125C6.23 7.315 8.875 4.75 12 4.75z"/>
                    </svg>
                    Sign in with Google
                  </Button>

                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Text style={{ fontSize: '13px', color: '#64748B' }}>
                      Need access? Contact your administrator.
                    </Text>
                  </div>

                </div>
              </form>

            </div>
          </Col>

        </Row>
      </div>
    </div>
  );
}
