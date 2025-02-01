import { useState } from 'react';
import axios from 'axios';
import Input from '@/ui-components/Input';
import Button from '@/ui-components/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import FormContainer from '@/ui-components/FormContainer';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
export default function Register() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false)
    const register = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:3001/api/register',
             { name,
               phone,
               password });
               setLoading(false)
               toast.success("Account created succesfully")
               router.push("/user/login")
              
        
        } catch (err) {
            setError(err.response?.data?.message)
            setLoading(false)
        }
    };

    return (
        <FormContainer>
            <ArrowBackIcon onClick={() => { router.back() }} fontSize='medium' className='absolute top-4 left-4  rounded-full text-black font-bold w-[30px] h-[30px]' />
            <h1 className='font-bold text-black'>Register</h1>
                <form onSubmit={register} className='flex flex-col gap-[20px] w-[90%]'>
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
                        type="number"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {error&& <p>{error}</p>}
                    <Button
                        text={loading ? "Please wait..." : "Register"}
                        type="submit"
                    />
                </form>
            <div className='flex gap-[10px]'>
                <span className='text-black'>Already have a account?</span>
                <Link href="/user/login" className='text-blue-700'>
                    LogIn
                </Link>
            </div>
        </FormContainer>
    );
}
