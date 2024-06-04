<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainingSessionCreateRequest;
use App\Models\TrainingSession;
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

    }
}
