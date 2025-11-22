<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tugas extends Model
{
    use HasFactory;
    
    protected $table = 'tugas';

    protected $fillable = [
        'id_user',
        'id_kategori',
        'nama',
        'tanggal',
        'prioritas',
        'status'
    ];

    // Relasi ke Kategori
    public function kategori() {
        return $this->belongsTo(Kategori::class, 'id_kategori');
    }

    // Relasi ke User
    public function user() {
        return $this->belongsTo(User::class, 'id_user');
    }
}