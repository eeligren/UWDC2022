@extends('layouts.app')
@section('content')
    <div class="grid grid-cols-2">
        <div class="relative">
            <div class="absolute z-10 h-screen w-full bg-slate-900 bg-opacity-50 p-16 bg-sl">
                <h1 class="text-6xl mt-12 font-bold">Welcome to the training portal</h1>
            </div>
            <img src="{{ asset('computer-courses.jpg') }}" class="h-screen object-cover" alt="Training">
        </div>
        <div class="flex justify-center items-center h-screen">
            <form action="{{ route('auth.login') }}" method="POST" class="w-[400px]">
                @csrf
                @error('login')
                <p class="text-red-600 font-semibold mb-4 text-center">{{ $message }}</p>
                @enderror
                <div class="flex flex-col gap-1 mb-2">
                    <label for="email" class="font-semibold">Email</label>
                    <input type="text" name="email" id="email" placeholder="Email" class="text-black w-full p-2 rounded-md border-2 border-gray-500">
                    @error('email')
                    <p class="text-red-600 font-semibold">{{ $message }}</p>
                    @enderror
                </div>
                <div class="flex flex-col gap-1">
                    <label for="password" class="font-semibold">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" class="text-black w-full p-2 rounded-md border-2 border-gray-500">
                    @error('password')
                    <p class="text-red-600 font-semibold">{{ $message }}</p>
                    @enderror
                </div>
                <button class="w-full p-2 mt-4 rounded-md border-2 bg-blue-500 text-white font-semibold border-blue-500">Sign in</button>
            </form>
        </div>
    </div>
@endsection
