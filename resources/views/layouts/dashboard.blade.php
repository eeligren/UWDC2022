@extends('layouts.app')
@section('content')
    <header class="p-4 bg-slate-700 flex items-center justify-between">
        <div>
            <div x-data="{ open: false }">
                <button @click="open = true" class="py-2 px-4 border rounded-md uppercase font-semibold text-sm">+ Add new</button>

                <div x-show="open" @click.outside="open = false" class="fixed top-0 left-0 bg-slate-900 bg-opacity-50 w-full h-screen z-20">
                    <div x-show="open" @click.outside="open = false" class="fixed top-0 left-0 h-screen bg-slate-700 p-6 w-[350px]">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="font-semibold text-xl">Add new entry</h2>
                            <button @click="open = false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
                        </div>
                        <div>
                            <form action="{{ route('trainingsessions.create') }}" method="POST">
                                @csrf
                                <div class="flex flex-col gap-1 mb-2">
                                    <label for="date" class="font-semibold">Date *</label>
                                    <input type="date" name="date" id="date" class="text-black w-full p-2 rounded-md border-2 border-gray-500">
                                    @error('date')
                                    <p class="text-red-600 font-semibold">{{ $message }}</p>
                                    @enderror
                                </div>
                                <div class="flex flex-col gap-1 mb-2">
                                    <label for="date" class="font-semibold">Type *</label>
                                    <input type="date" name="date" id="date" class="text-black w-full p-2 rounded-md border-2 border-gray-500">
                                    @error('date')
                                    <p class="text-red-600 font-semibold">{{ $message }}</p>
                                    @enderror
                                </div>
                                <div class="flex flex-col gap-1 mb-2">
                                    <label for="date" class="font-semibold">Category *</label>
                                    <input type="date" name="date" id="date" class="text-black w-full p-2 rounded-md border-2 border-gray-500">
                                    @error('date')
                                    <p class="text-red-600 font-semibold">{{ $message }}</p>
                                    @enderror
                                </div>
                                <div class="flex flex-col gap-1 mb-2">
                                    <label for="notes" class="font-semibold">Notes *</label>
                                    <input type="text" name="notes" id="notes" class="text-black w-full p-2 rounded-md border-2 border-gray-500">
                                    @error('notes')
                                    <p class="text-red-600 font-semibold">{{ $message }}</p>
                                    @enderror
                                </div>
                                <div class="flex flex-col gap-1 mb-2">
                                    <label for="tags" class="font-semibold">Tags *</label>
                                    <input type="tags" name="tags" id="tags" class="text-black w-full p-2 rounded-md border-2 border-gray-500">
                                    @error('tags')
                                    <p class="text-red-600 font-semibold">{{ $message }}</p>
                                    @enderror
                                </div>
                                <button class="uppercase py-2 px-4 mt-4 rounded-md border-2 bg-blue-500 text-white font-semibold border-blue-500">Add entry</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-4">
            <div>
                <p class="font-semibold">{{ auth()->user()->name }}</p>
                <p class="text-sm">competitor</p>
            </div>
            <form action="{{ route('logout') }}" method="POST">
                @csrf
                @method('DELETE')
                <button class="py-2 px-4 border rounded-md uppercase font-semibold text-sm">Sign Out</button>
            </form>
        </div>
    </header>
    <main>
        @yield('main-content')
    </main>
@endsection
