import trainingImage from '../assets/computer-courses.jpg';
import {useForm} from "react-hook-form";
import { z } from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useAuth} from "../contexts/authContext.jsx";
import {useNavigate} from "react-router";

const schema = z.object({
    email: z.string(),
    password: z.string()
});

export default function LoginPage() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema)
    });
    const { login } = useAuth();

    const submit = async (values) => {
        if(await login(values)) {
            navigate('/dashboard/overview')
        } else {
            setError('“Email or password not correct')
        }
    }

    return (
        <div className="grid grid-cols-2">
            <div className="relative">
                <div className="absolute z-10 h-screen w-full bg-slate-900 bg-opacity-50 p-16 bg-sl">
                    <h1 className="text-6xl mt-12 font-bold">Welcome to the training portal</h1>
                </div>
                <img src={trainingImage} className="h-screen object-cover" alt="Training"/>
            </div>
            <div className="flex justify-center items-center h-screen">
                <form method="POST" className="w-[400px]" onSubmit={handleSubmit(submit)}>
                    {error && (
                        <p className="text-red-600 font-semibold mb-4 text-center">{error}</p>
                    )}
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input type="text" name="email" id="email" placeholder="Email"
                               className="text-black w-full p-2 rounded-md border-2 border-gray-500" {...register('email')}/>
                        {errors?.email && ( <p className={'text-red-600'}>{errors.email.message}</p> )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password"
                               className="text-black w-full p-2 rounded-md border-2 border-gray-500" {...register('password')}/>
                        {errors?.password && ( <p className={'text-red-600'}>{errors.password.message}</p> )}
                    </div>
                    <button
                        className="w-full p-2 mt-4 rounded-md border-2 bg-blue-500 text-white font-semibold border-blue-500">Sign
                        in
                    </button>
                </form>
            </div>
        </div>
    );
}
