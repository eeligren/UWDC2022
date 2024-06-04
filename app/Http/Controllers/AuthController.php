<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function show()
    {
        return view('auth.login');
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if(!$user) {
            return redirect()->back()->withErrors(['login' => 'Email or password not correct']);
        }

        $credentials = $request->only(['email', 'password']);
        if(Auth::attempt($credentials)) {
            return redirect()->route('dashboard.overview');
        } else {
            return redirect()->back()->withErrors(['login' => 'Email or password not correct']);
        }
    }

    function logout(Request $request)
    {
        \auth()->logout();
        return redirect()->route('login');
    }
}
