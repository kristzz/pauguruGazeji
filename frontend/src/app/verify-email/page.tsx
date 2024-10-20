"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import axios from 'axios';

export default function VerifyEmail() {
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<string>('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const hash = urlParams.get('hash');
    const expires = urlParams.get('expires');
    const signature = urlParams.get('signature');

    console.log('Parameters:', { id, hash, expires, signature });

    // Check if all necessary query params are available
    if (id && hash && expires && signature) {
      verifyEmail(id, hash, expires, signature);
    } else {
      setVerificationStatus('Missing parameters. Please check your verification link.');
    }
  }, []);

  const verifyEmail = async (id: string, hash: string, expires: string, signature: string) => {
    try {
      console.log('Verifying email with parameters:', { id, hash, expires, signature });
      
      const response = await axios.get(`http://127.0.0.1:8000/api/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`,);
  
      console.log('Verification response:', response.data);
  
      if (response.status === 200) {
        setVerificationStatus('Email verified successfully!');
        setTimeout(() => {
          router.push('/login');
        }, 3000); // Redirect after 3 seconds
      } else {
        setVerificationStatus('Email verification failed.');
      }
    } catch (error) {
      console.error('Email verification failed:', error.response ? error.response.data : error);
      setVerificationStatus('Email verification failed.');
    }
  };
  

  return (
    <main>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1>{verificationStatus ? verificationStatus : 'Verifying your email...'}</h1>
        {verificationStatus && (
          <p>You will be redirected to the login page shortly.</p>
        )}
      </div>
    </main>
  );
}
