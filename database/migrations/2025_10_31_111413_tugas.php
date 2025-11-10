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
            // $table->unsignedBigInteger('kategori_id');
            $table->string('nama');
            $table->dateTime('tanggal')->nullable();
            $table->text('catatan')->nullable();
            // $table->dateTime('pengingat')->nullable();
            // $table->boolean('prioritas')->default(false);
            $table->boolean('status')->default(false);
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
