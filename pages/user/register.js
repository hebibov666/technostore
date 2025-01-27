import { useState } from 'react';
import axios from 'axios';
import Input from '../ui-components/Input';
import Button from '../ui-components/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import FormContainer from '../ui-components/FormContainer';
import { useRouter } from 'next/router';
export default function Register() {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('');
    const router = useRouter()
    const handleSendOtp = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/api/send-otp', { name, phone });
            console.log(response.data.message);
            setStep(2);
        } catch (err) {
            console.error('Error:', err.response?.data?.message);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/api/verify-otp', { phone, otp, name, password });
        } catch (err) {
            console.error('Error:', err.response?.data?.message);
        }
    };

    return (
        <FormContainer>
            <ArrowBackIcon onClick={() => { router.back() }} fontSize='medium' className='absolute top-4 left-4  rounded-full text-black font-bold w-[30px] h-[30px]' />
            <h1 className='font-bold text-black'>Register</h1>
            {step === 1 && (
                <form onSubmit={handleSendOtp} className='flex flex-col gap-[20px] w-[90%]'>
                    <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Button
                        text="Send"
                        type="submit"
                    />
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerifyOtp} className='flex flex-col gap-[20px] w-[50%]'>
                    <Input
                        type="text"
                        placeholder="Enter otp code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <Button
                        text="Verify"
                        type="submit"
                    />
                </form>
            )}
            <div className='flex gap-[10px]'>
                <span className='text-black'>Already have a account?</span>
                <Link href="/user/login" className='text-blue-700'>
                    LogIn
                </Link>
            </div>
        </FormContainer>
    );
}
