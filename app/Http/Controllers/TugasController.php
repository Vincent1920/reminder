<?php

namespace App\Http\Controllers;

use App\Models\tugas;
use Illuminate\Http\Request;

class TugasController extends Controller
{
    public function CreateTugas(Request $request)
{
    // Validasi
    $request->validate([
        'nama' => 'required|string',
        'id_kategori' => 'required|exists:kategori,id', // Pastikan kategori ada
        'tanggal' => 'required|date',
        'prioritas' => 'required|string'
    ]);

    // Simpan
    $tugas = tugas::create([
        'id_user'     => $request->user()->id, // Ambil ID dari token login
        'id_kategori' => $request->id_kategori,
        'nama'        => $request->nama,
        'tanggal'     => $request->tanggal,
        'prioritas'   => $request->prioritas,
        'status'      => false, // Default belum selesai
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Tugas berhasil dibuat',
        'data'    => $tugas
    ], 201);
}
}
