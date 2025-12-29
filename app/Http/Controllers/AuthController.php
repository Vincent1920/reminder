<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;

class AuthController extends Controller
{

public function register(Request $request)
{
    // dd($request->all());
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users',
        'password' => 'required|string|min:6|confirmed'
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password)
    ]);

    return response()->json([
        'message' => 'User berhasil dibuat',
        'data' => $user
    ], 201);
}

 public function login(Request $request)
    {
        // dd($request);
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        // Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // Cek apakah user dan password cocok
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email atau password salah'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken ?? null;

        return response()->json([
            'message' => 'Login berhasil',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    // AuthController.php
public function sendResetLink(Request $request) {
    $request->validate(['email' => 'required|email']);

    // Cek apakah email terdaftar
    $user = User::where('email', $request->email)->first();
    if (!$user) return response()->json(['message' => 'Email tidak ditemukan'], 404);

    // Buat token unik
    $token = Str::random(60);
    DB::table('password_reset_tokens')->updateOrInsert(
        ['email' => $request->email],
        ['token' => $token, 'created_at' => now()]
    );

$resetUrl = "http://localhost:8000/reset-password?token=" . $token . "&email=" . $request->email;
    // $resetUrl = route('password.reset', ['token' => $token, 'email' => $request->email]);
    Mail::to($request->email)->send(new ResetPasswordMail($resetUrl));

    return response()->json(['message' => 'Link reset password telah dikirim ke email Anda.']);
}
// AuthController.php

// Tambahkan di dalam AuthController.php
// AuthController.php

public function resetPassword(Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:6|confirmed',
    ]);

    $check = DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->where('token', $request->token)
                ->first();

    if (!$check) {
        // Kembali ke halaman Blade reset dengan pesan error
        return back()->withErrors(['message' => 'Token tidak valid atau sudah kadaluarsa']);
    }

    $user = User::where('email', $request->email)->first();
    if ($user) {
        $user->update([
            'password' => Hash::make($request->password)
        ]);

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        /** * PERBAIKAN: 
         * Karena Login dikelola Vue (port 5173 atau path /login), 
         * kita arahkan langsung ke URL absolut aplikasi Vue kamu.
         */
        return redirect('http://localhost:5173/login?reset=success');
    }

    return back()->withErrors(['message' => 'User tidak ditemukan.']);
}

public function updateProfile(Request $request)
{
    $user = $request->user();
    
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,'.$user->id,
    ]);

    $user->update([
        'name' => $request->name,
        'email' => $request->email,
    ]);

    return response()->json([
        'message' => 'Profil berhasil diperbarui',
        'user' => $user
    ]);
}
}
