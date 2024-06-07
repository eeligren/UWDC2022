<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ExpertController extends Controller
{
    public function competitors()
    {
        $competitors = User::where('is_expert', false)->get();
        $competitors->each(function ($competitor) {
            $trainingSessions = $competitor->training_sessions;
            $totalHours = 0;
            $lastMonth = 0;

            $trainingSessions->each(function ($session) use (&$totalHours, &$lastMonth) {
                if(Carbon::make($session->created_at)->month == now()->month) {
                    $totalHours += $session->time_spent;
                }

                if(Carbon::make($session->created_at)->month == now()->subMonth()->month) {
                    $lastMonth += $session->time_spent;
                }
            });

            $_month = now()->subYear();

            for($i = 0; $i < 12; $i++) {
                global $last12months;
                $_month = $_month->addMonth();
                $monthHours = $competitor->training_sessions()->whereMonth('created_at', $_month->month)->sum('time_spent');

                $month = [
                    str_split($_month->monthName)[0],
                    $monthHours
                ];

                $last12months[] = $month;
            }

            $tags = [];
            $competitor->training_sessions()->with('tags')->get()->each(function ($session) use (&$tags) {
                $session->tags->each(function ($tag) use (&$tags) {
                    if (isset($tags[$tag->tag])) {
                        $tags[$tag->tag] += 1;
                    } else {
                        $tags[$tag->tag] = 1;
                    }
                });
            });

            arsort($tags);

            $tagsArray = [];
            foreach ($tags as $tag => $count) {
                $tagsArray[] = [$tag, $count];
            }

            $competitor->total = $totalHours;
            $competitor->last_month = $lastMonth;
            $competitor->last_12_months = $last12months;
            $competitor->used_technologies = $tagsArray;
            $competitor->sessions = $competitor->training_sessions()->with(['tags', 'type', 'category'])->get();
        });

        return response()->json([
            'competitors' => $competitors
        ]);
    }
}
