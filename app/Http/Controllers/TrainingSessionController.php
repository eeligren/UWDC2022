<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainingSessionCreateRequest;
use App\Models\TrainingSession;
use App\Models\TrainingSessionTag;
use Illuminate\Http\Request;

class TrainingSessionController extends Controller
{
    public function index()
    {
        $sessions = auth()->user()->training_sessions()->with(['tags', 'type', 'category'])->get();
        return response()->json($sessions);
    }

    public function store(TrainingSessionCreateRequest $request)
    {
        $session = TrainingSession::create([
            'type_id' => $request->type_id,
            'category_id' => $request->category_id,
            'time_spent' => $request->time_spent,
            'notes' => $request->notes,
            'created_at' => $request->date,
            'user_id' => auth()->user()->id
        ]);

        foreach ($request->tags as $tag) {
            TrainingSessionTag::create([
                'training_session_id' => $session->id,
                'tag_id' => $tag
            ]);
        }

        return response()->json([
            'message' => 'Created!'
        ], 201);
    }
}
