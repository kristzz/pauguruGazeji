'use client';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Define the type for a Certificate
interface Certificate {
    id: number;
    subject: {
        name: string;
    };
}

export default function Certificates() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const certificateRef = useRef<HTMLDivElement>(null);  // Create a ref for the certificate design

    // Fetch certificates when the component mounts
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user-certificates', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                    },
                });
                console.log(response.data); // Log the response to check the structure
                setCertificates(response.data.data); // Set the certificates data
            } catch (err) {
                console.error('Error fetching certificates:', err);
                setError('Failed to fetch certificates. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    // Function to export the certificate as PDF
    const exportToPdf = async () => {
        const certificateElement = certificateRef.current;

        if (certificateElement) {
            const canvas = await html2canvas(certificateElement);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: [canvas.width, canvas.height],
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('certificate.pdf');
        }
    };

    if (loading) {
        return (
            <main className="flex h-screen w-screen items-center justify-center bg-main-white">
                <div className="flex flex-col items-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-main-blue h-12 w-12 mb-4"></div>
                    <p className="text-lg text-main-blue">Loading...</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="bg-main-blue flex flex-row w-full h-16 rounded-b-lg">
                <button className='ml-4' onClick={() => router.push('/profile')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="white" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
            </div>
            <p className='text-main-blue text-center text-lg mt-4'>Certificates</p>

            {error ? (
                <p className='text-main-blue text-center text-lg mt-4'>{error}</p>
            ) : (
                <div className='flex flex-col mt-4 md:flex-row md:flex-wrap md:justify-center'>
                    {certificates.length > 0 ? (
                        certificates.map((certificate) => (
                            <div key={certificate.id} ref={certificateRef} className='h-96 md:w-80 rounded-lg bg-main-blue ml-6 mr-6 mb-6 text-center'>
                                <p className='text-main-white mt-6 text-xl'>Certificate</p>
                                <div className='bg-main-white w-36 h-36 rounded-full mx-auto mt-4 text-center flex flex-col'>
                                    <p className='mt-auto mb-auto text-6xl text-main-blue'>50</p>
                                </div>
                                <div className="flex justify-center mt-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow" className="w-10 h-10">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow" className="w-12 h-12">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow" className="w-10 h-10">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                    </svg>
                                </div>
                                <p className='text-main-white mt-4 text-lg'>GOOD JOB!!</p>
                                <p className='text-main-white mt-2 text-base'>
                                    You have earned 50 points in {certificate.subject ? certificate.subject.name : 'Unknown Subject'}
                                </p>
                                <button
                                    onClick={exportToPdf}
                                    className="bg-main-white text-main-blue px-4 py-2 rounded-lg mt-4"
                                >
                                    Export to PDF
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className='text-main-blue text-center text-lg mt-4'>No certificates available</p>
                    )}
                </div>
            )}
        </main>
    );
}
