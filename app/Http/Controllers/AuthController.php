<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if(!$user) {
            return response()->json(['message' => 'Email or password not correct'], 404);
        }

        if(Hash::check($request->password, $user->password)) {
            return response()->json([
                'token' => $user->createToken(now())->plainTextToken
            ]);
        } else {
            return response()->json(['message' => 'Email or password not correct'], 500);
        }
    }

    function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
