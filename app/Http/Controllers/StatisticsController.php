<?php

namespace App\Http\Controllers;

use App\Models\TrainingSessionTag;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class StatisticsController extends Controller
{
    public function index()
    {
        $trainingSessions = auth()->user()->training_sessions;
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
            $monthHours = auth()->user()->training_sessions()->whereMonth('created_at', $_month->month)->sum('time_spent');

            $month = [
                str_split($_month->monthName)[0],
                $monthHours
            ];

            $last12months[] = $month;
        }

        $tags = [];
        auth()->user()->training_sessions()->with('tags')->get()->each(function ($session) use (&$tags) {
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

        return response()->json([
            'working_hours' => [
                'total' => $totalHours,
                'last_month' => $lastMonth
            ],
            'last_12_months' => $last12months,
            'used_technologies' => $tagsArray
        ]);
    }
}
