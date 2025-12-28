<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReminderTugasMail;
use App\Models\Tugas;
// Route::get('/', function () {
//     return view('welcome');
// });
// Route::get('/{any}', fn() => view('welcome'))->where('any', '.*');

// Fallback route untuk SPA - menangani semua route Vue Router
Route::fallback(function () {
    return view('welcome');
});

Route::get('/cek-session', function () {
    return session()->all();
});

// routes/web.php

// Menampilkan form reset password (Blade)
Route::get('/reset-password-form', function (Illuminate\Http\Request $request) {
    return view('auth.reset-password', [
        'token' => $request->token,
        'email' => $request->email
    ]);
})->name('password.reset');

// Memproses perubahan password
Route::post('/reset-password-post', [App\Http\Controllers\AuthController::class, 'resetPassword'])->name('password.update');
// Route::get('user/email', [UserController::class, 'index']);

// Route::get('/test-email', function () {
//     $tugas = Tugas::first(); // Ambil satu contoh tugas dari DB
//     Mail::to('email_tujuan_anda@gmail.com')->send(new ReminderTugasMail($tugas));
//     return "Email berhasil dikirim!";
// });


// Route::get('/cek-smtp', function () {
//     try {
//         Mail::raw('Halo, ini tes koneksi SMTP RememberME!', function ($message) {
//             $message->to('vincentluhulima6010@gmail.com') // Ganti dengan email Anda
//                     ->subject('Tes SMTP');
//         });
//         return "Berhasil Terkirim!";
//     } catch (\Exception $e) {
//         return "Gagal: " . $e->getMessage();
//     }
// });

// Route::get('/test-reminder', function () {
//     // Mengambil satu tugas yang belum selesai beserta data usernya
//     $tugas = Tugas::with('user')->where('is_done', false)->first();

//     if (!$tugas) {
//         return "Tidak ada tugas di database. Buat tugas dulu!";
//     }

//     if (!$tugas->user || !$tugas->user->email) {
//         return "Tugas ditemukan, tapi user atau email tidak ada di tabel users.";
//     }

//     try {
//         // Mengirim email ke alamat yang ada di tabel users
//         Mail::to($tugas->user->email)->send(new ReminderTugasMail($tugas));
//         return "Email pengingat berhasil dikirim ke: " . $tugas->user->email;
//     } catch (\Exception $e) {
//         return "Gagal mengirim email: " . $e->getMessage();
//     }
// });

