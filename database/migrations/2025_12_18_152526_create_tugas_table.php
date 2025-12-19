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
        
        // Relasi ke tabel users
        $table->unsignedBigInteger('id_user');
        $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
        
        // Relasi ke tabel kategori
        $table->unsignedBigInteger('id_kategori');
        $table->foreign('id_kategori')->references('id')->on('kategori')->onDelete('cascade');
        
        $table->date('tanggal');
        
        // Perbaikan: Menambahkan pilihan enum
        $table->enum('prioritas', ['ya', 'tidak'])->default('tidak'); 
        // $table->enum('prioritas', ['rendah', 'sedang', 'tinggi']);
        $table->string('tugas');
        $table->boolean('is_done')->default(false);
        $table->timestamps();
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
