@extends('layouts.dashboard')
@section('main-content')
    <div class="grid grid-cols-4">
        <div>

        </div>
        <div class="col-span-3 p-8 pl-0">
            @include('tables.datatable')
        </div>

    </div>

@endsection
