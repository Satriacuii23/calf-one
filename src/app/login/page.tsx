"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Title, 
  Text, 
  Box, 
  Alert,
  Center,
  Divider,
  Group,
  Anchor,
  Paper
} from '@mantine/core';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Sparkles, Coffee } from 'lucide-react';
import { AppleOutlined, GoogleOutlined } from '@ant-design/icons';
import { message, Grid } from 'antd';

const { useBreakpoint } = Grid;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      // Map username to email behind the scenes if needed
      const loginEmail = email === 'founder' ? 'founder@calf.one' : email;

      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      });

      if (error) {
        setErrorMsg(error.message || 'Invalid login credentials');
      } else {
        messageApi.success('Berhasil login ke dalam dashboard!');
        setTimeout(() => {
          router.refresh();
          router.push('/');
        }, 1000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'relative',
      minHeight: '100vh', 
      width: '100%',
      backgroundColor: '#f5f5f5',
      backgroundImage: isMobile ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' : 'url("/images/login-illustration.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-start',
      paddingLeft: isMobile ? '0' : 'max(5%, 40px)',
      padding: isMobile ? '20px' : undefined,
      paddingBottom: '80px', // Space for the wave footer
      overflow: 'hidden',
    }}>
      {contextHolder}

      {/* Floating Card */}
      <Paper 
        shadow="xl"
        p={{ base: 30, sm: 40 }}
        style={{ 
          width: '100%', 
          maxWidth: 420, 
          borderRadius: 24,
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#ffffff'
        }}
      >
        {/* Logo Section */}
        <Center mb={20} style={{ flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ height: 4, width: 45, backgroundColor: '#e53e3e', borderRadius: 2 }} />
              <div style={{ height: 4, width: 45, backgroundColor: '#e53e3e', borderRadius: 2 }} />
            </div>
            
            <Title style={{ 
              color: '#063A8D', 
              fontFamily: 'cursive, Georgia, serif', 
              fontSize: '3.2rem',
              fontWeight: 800,
              fontStyle: 'italic',
              lineHeight: 1
            }}>
              Calf
            </Title>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ height: 4, width: 45, backgroundColor: '#e53e3e', borderRadius: 2 }} />
              <div style={{ height: 4, width: 45, backgroundColor: '#e53e3e', borderRadius: 2 }} />
            </div>
          </div>
          <Text size="xs" fw={800} mt={5} style={{ letterSpacing: '2px', color: '#063A8D' }}>
            COFFEE & MILKBAR
          </Text>
        </Center>

        {/* Welcome Text */}
        <Box mb={30} ta="center">
          <Title order={2} style={{ color: '#063A8D', fontWeight: 800, fontSize: '1.6rem' }}>
            Welcome Back! <Sparkles size={20} color="#e53e3e" style={{ display: 'inline', marginBottom: -2 }} />
          </Title>
          <Text color="dimmed" size="sm" mt={8}>
            Login to continue your good days with Calf.
          </Text>
        </Box>

        <form onSubmit={handleLogin}>
          {errorMsg && (
            <Alert color="red" mb="md" variant="light" radius="md">
              {errorMsg}
            </Alert>
          )}

          <TextInput
            label="Email"
            placeholder="Enter your email"
            required
            size="md"
            mb="md"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            leftSection={<Mail size={18} color="#9ca3af" />}
            styles={{
              label: { color: '#063A8D', fontWeight: 700, marginBottom: 8, fontSize: 13 },
              input: { borderRadius: 8, borderColor: '#e5e7eb' }
            }}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required
            size="md"
            mb={5}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            leftSection={<Lock size={18} color="#9ca3af" />}
            styles={{
              label: { color: '#063A8D', fontWeight: 700, marginBottom: 8, fontSize: 13 },
              input: { borderRadius: 8, borderColor: '#e5e7eb' }
            }}
          />
          
          <Box style={{ display: 'flex', justifyContent: 'flex-end' }} mb={24}>
            <Anchor href="#" size="sm" style={{ color: '#063A8D', fontWeight: 700, fontSize: 12 }}>
              Forgot password?
            </Anchor>
          </Box>

          <Button 
            fullWidth 
            size="lg" 
            type="submit" 
            loading={loading}
            style={{ backgroundColor: '#063A8D', borderRadius: 8, height: 46, fontWeight: 700, fontSize: 15 }}
          >
            Log In
          </Button>
        </form>
        
        <Divider my={24} label="or continue with" labelPosition="center" styles={{ label: { color: '#9ca3af', fontSize: 12 } }} />

        <Group grow mb={30}>
          <Button 
            variant="default" 
            size="md" 
            radius="md" 
            leftSection={<GoogleOutlined style={{ color: '#DB4437', fontSize: 16 }} />}
            styles={{ root: { borderColor: '#e5e7eb', color: '#4b5563', height: 42 } }}
          >
            Google
          </Button>
          <Button 
            variant="default" 
            size="md" 
            radius="md" 
            leftSection={<AppleOutlined style={{ fontSize: 18, color: '#000' }} />}
            styles={{ root: { borderColor: '#e5e7eb', color: '#4b5563', height: 42 } }}
          >
            Apple
          </Button>
        </Group>

        <Center>
          <Text size="sm" style={{ color: '#6b7280' }}>
            Don't have an account? <Anchor href="#" style={{ color: '#063A8D', fontWeight: 700 }}>Sign Up</Anchor>
          </Text>
        </Center>
      </Paper>

      {/* Wavy Footer */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" style={{ display: 'block', width: '100%', height: 'auto', marginBottom: '-1px' }}>
          <path fill="#063A8D" fillOpacity="1" d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
        </svg>
        <div style={{ 
          backgroundColor: '#063A8D', 
          color: 'white', 
          padding: '0px 20px 30px', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          
          {/* Decorative Seal from Mockup */}
          <div style={{ 
            position: 'absolute', 
            left: 'max(5%, 40px)', 
            top: -40, 
            width: 80, 
            height: 80, 
            backgroundColor: '#ffffff', 
            borderRadius: '50%',
            border: '2px solid #e53e3e',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
          }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
              <path id="curve" fill="transparent" d="M 15 50 a 35 35 0 1 1 70 0" />
              <text fontSize="11" fontWeight="bold" fill="#063A8D" letterSpacing="1.5">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">MADE FOR</textPath>
              </text>
              <path id="curve-bottom" fill="transparent" d="M 85 50 a 35 35 0 1 1 -70 0" />
              <text fontSize="11" fontWeight="bold" fill="#063A8D" letterSpacing="1.5">
                <textPath href="#curve-bottom" startOffset="50%" textAnchor="middle">GOOD DAYS</textPath>
              </text>
            </svg>
            <Coffee size={24} color="#063A8D" style={{ marginTop: 6 }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <Text fw={700} style={{ letterSpacing: '2px', fontSize: 13, marginBottom: 4 }}>CALF COFFEE & MILKBAR</Text>
             <Text style={{ fontFamily: 'cursive, Georgia, serif', fontStyle: 'italic', fontSize: '1.4rem' }}>
               Made for Good Days.
             </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
