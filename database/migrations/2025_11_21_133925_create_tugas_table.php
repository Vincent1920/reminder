<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('tugas', function (Blueprint $table) {
            $table->id();
            
            // 1. Relasi ke User (Siapa yang buat tugas)
            $table->unsignedBigInteger('id_user'); 
            
            // 2. Relasi ke Kategori
            $table->unsignedBigInteger('id_kategori'); 
            
            $table->string('nama'); // Isi tugasnya
            $table->dateTime('tanggal')->nullable();
            
            // 3. Prioritas (Bisa pakai Enum atau String: 'Rendah', 'Sedang', 'Tinggi')
            // Di desain pakai toggle, jadi kita anggap boolean (Penting/Biasa) atau String.
            $table->string('prioritas')->default('Biasa'); 

            // 4. Status (Selesai / Belum)
            // Pakai boolean: 0 = Belum, 1 = Selesai
            $table->boolean('status')->default(false); 
            
            $table->timestamps();

            // Definisi Foreign Key
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_kategori')->references('id')->on('kategori')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tugas');
    }
};
