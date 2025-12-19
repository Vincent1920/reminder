<?php

namespace App\Http\Controllers;

use App\Models\Tugas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class TugasController extends Controller
{

    public function getTugas(Request $request)
    {
        try {
            // Mengambil tugas milik user login beserta data kategorinya
            $tugas = Tugas::with('kategori')
                ->where('id_user', $request->user()->id)
                ->get();

            return response()->json([
                'success' => true,
                'data'    => $tugas
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    // TugasController.php
        public function updateStatus(Request $request, $id)
        {
            $tugas = Tugas::findOrFail($id);
            
            // Update kolom is_done sesuai migrasi
            $tugas->is_done = $request->is_done; 
            $tugas->save();

            return response()->json(['success' => true]);
        }

    public function CreateTugas(Request $request)
    {
        // 1. Manual Validation agar detail error bisa dikustomisasi
        $validator = Validator::make($request->all(), [
            'id_kategori' => 'required|exists:kategori,id',
            'tanggal'     => 'required|date',
            'prioritas'   => 'required|in:ya,tidak',
            'tugas'       => 'required|string|max:255',
        ], [
            // Custom Message (Opsional)
            'id_kategori.exists' => 'Kategori tidak ditemukan di database.',
            'prioritas.in'       => 'Prioritas harus bernilai "ya" atau "tidak".',
        ]);

        // Jika Validasi Gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors() // Menampilkan detail field mana yang salah
            ], 422);
        }

        try {
            // 2. Simpan ke Database
            $tugas = Tugas::create([
                'id_user'     => $request->user()->id,
                'id_kategori' => $request->id_kategori,
                'tanggal'     => $request->tanggal,
                'prioritas'   => $request->prioritas,
                'tugas'       => $request->tugas,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Tugas berhasil dibuat',
                'data'    => $tugas
            ], 201);

        } catch (Exception $e) {
            // 3. Menangani error sistem (seperti database mati atau kolom kurang)
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan sistem',
                'error_detail' => $e->getMessage() // Menampilkan pesan error teknis
            ], 500);
        }

        
    }
}