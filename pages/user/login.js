import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from 'next/router';
import Link from "next/link";
import Input from "../ui-components/Input";
import Button from "../ui-components/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormContainer from "../ui-components/FormContainer";
import { toast } from "react-hot-toast";

function Login() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error,setError]=useState(null)
  const router = useRouter()

  const loginProfile = async (e) => {
    e.preventDefault();
    setLoading(true)
    const res = await signIn('credentials', {
      redirect: false,
      name,
      password,
    });
    setLoading(false)
    if (res?.error) {
      toast.error("Login unsuccessful")
      setError(res?.error)
    } else {
      router.push("/")
    }
  };
  return (
    <FormContainer>
      <ArrowBackIcon onClick={() => { router.back() }} fontSize='medium' className='absolute top-4 left-4  rounded-full text-black font-bold w-[30px] h-[30px]' />
      <h1 className='font-bold text-black'>LogIn</h1>
      <form onSubmit={loginProfile} className='flex flex-col gap-[20px] w-[90%]'>
        <Input
          type="text"
          default="İsmayıl"
          placeholder="Usename or phone"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <p className="text-red-600">{error}</p>}
        <span className="font-bold text-black">Demo User:<br></br> Username: İsmayıl <br></br> Password: user1234</span>
        <Button
          type="submit"
          text={`${loading ? "Please wait" : "Log in"}`}
        />
      </form>
      <div className='flex gap-[10px]'>
        <span className="text-black">Dont have an account?</span>
        <Link href="/user/register" className='text-blue-700'>
          Register
        </Link>
      </div>
    </FormContainer>
  )
}
export default Login