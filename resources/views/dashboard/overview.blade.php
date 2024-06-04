@extends('layouts.dashboard')
@section('main-content')
    @foreach(auth()->user()->training_sessions as $session)

    @endforeach
@endsection
