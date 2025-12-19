<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tugas extends Model
{
    use HasFactory;

    // Nama tabel di database
    protected $table = 'tugas';

    // Field yang boleh diisi
    protected $fillable = [
        'id_user',
        'id_kategori',
        'tanggal',
        'prioritas',
        'tugas',
        'is_done',
    ];

    // app/Models/Tugas.php

public function kategori()
{
    // Sesuaikan 'id_kategori' dengan nama kolom foreign key di tabel tugas Anda
    return $this->belongsTo(Kategori::class, 'id_kategori');
}
}