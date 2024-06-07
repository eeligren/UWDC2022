<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainingSessionCreateRequest;
use App\Models\Category;
use App\Models\Tag;
use App\Models\TrainingSession;
use App\Models\TrainingSessionTag;
use App\Models\Type;
use Illuminate\Http\Request;

class TrainingSessionController extends Controller
{
    /*
     * Get all own sessions
     */
    public function index()
    {
        $sessions = auth()->user()->training_sessions()->with(['tags', 'type', 'category'])->get();
        return response()->json($sessions);
    }

    /*
     * Create new session
     */
    public function store(TrainingSessionCreateRequest $request)
    {
        if(!$request->type_id && $request->new_type) {
            $newType = Type::create([
                'name' => $request->new_type,
                'user_id' => auth()->user()->id
            ]);
        }

        if(!$request->category_id && $request->new_category) {
            $newCategory = Category::create([
                'name' => $request->new_category,
                'user_id' => auth()->user()->id
            ]);
        }

        $session = TrainingSession::create([
            'type_id' => $request->type_id ? $request->type_id : $newType->id,
            'category_id' => $request->category_id ? $request->category_id : $newCategory->id,
            'time_spent' => floatval($request->time_spent),
            'notes' => $request->notes,
            'created_at' => $request->date,
            'user_id' => auth()->user()->id
        ]);

        foreach ($request->tags as $tag) {
            $exists = Tag::where('tag', $tag)->first();
            if($exists) {
                TrainingSessionTag::create([
                    'training_session_id' => $session->id,
                    'tag_id' => $exists->id
                ]);
            } else {
                $newTag = Tag::create([
                    'tag' => $tag,
                    'user_id' => auth()->user()->id
                ]);

                TrainingSessionTag::create([
                    'training_session_id' => $session->id,
                    'tag_id' => $newTag->id
                ]);
            }
        }

        return response()->json([
            'message' => 'Created!'
        ], 201);
    }

    /*
     * Update existing session
     */
    public function update(TrainingSessionCreateRequest $request, TrainingSession $session)
    {
        if(!$request->type_id && $request->new_type) {
            $newType = Type::create([
                'name' => $request->new_type,
                'user_id' => auth()->user()->id
            ]);
        }

        if(!$request->category_id && $request->new_category) {
            $newCategory = Category::create([
                'name' => $request->new_category,
                'user_id' => auth()->user()->id
            ]);
        }

        $session->update([
            'type_id' => $request->type_id ? $request->type_id : $newType->id,
            'category_id' => $request->category_id ? $request->category_id : $newCategory->id,
            'time_spent' => floatval($request->time_spent),
            'notes' => $request->notes,
            'created_at' => $request->date
        ]);

        $existingTags = $session->tags->pluck('tag')->toArray();
        $newTags = $request->tags;

        foreach ($existingTags as $existingTag) {
            if (!in_array($existingTag, $newTags)) {
                $tag = Tag::where('tag', $existingTag)->first();
                TrainingSessionTag::where('training_session_id', $session->id)->where('tag_id', $tag->id)->delete();
            }
        }

        foreach ($newTags as $tag) {
            $exists = Tag::where('tag', $tag)->first();
            if ($exists) {
                $tagInSession = TrainingSessionTag::where('training_session_id', $session->id)->where('tag_id', $exists->id)->exists();
                if (!$tagInSession) {
                    TrainingSessionTag::create([
                        'training_session_id' => $session->id,
                        'tag_id' => $exists->id
                    ]);
                }
            } else {
                $newTag = Tag::create([
                    'tag' => $tag,
                    'user_id' => auth()->user()->id
                ]);

                TrainingSessionTag::create([
                    'training_session_id' => $session->id,
                    'tag_id' => $newTag->id
                ]);
            }
        }

        return response()->json([
            'message' => 'Updated!'
        ], 202);
    }
}
