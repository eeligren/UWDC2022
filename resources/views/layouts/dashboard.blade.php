@extends('layouts.app')
@section('content')
    <header class="p-4 bg-slate-700 flex items-center justify-between">
        <div>
            <button class="py-2 px-4 border rounded-md uppercase font-semibold text-sm">+ Add new</button>
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
