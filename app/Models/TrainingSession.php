<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TrainingSession extends Model
{
    use HasFactory;

    public function type() : BelongsTo
    {
        return $this->belongsTo(Type::class);
    }

    public function category() : BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags() : BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'training_session_tags');
    }
}
