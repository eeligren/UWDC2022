<table id="sessions" class="w-full bg-slate-800 rounded">
    <thead>
        <tr>
            <th class="uppercase">Date</th>
            <th class="uppercase">Type</th>
            <th class="uppercase">Category</th>
            <th class="uppercase">Time</th>
            <th class="uppercase">Notes</th>
            <th class="uppercase">Tags</th>
        </tr>
    </thead>
    <tbody>
        @foreach(auth()->user()->training_sessions as $session)
            <tr>
                <td>{{ \Carbon\Carbon::make($session->created_at)->format('d.m.Y') }}</td>
                <td>{{ $session->type->name }}</td>
                <td>{{ $session->category->name }}</td>
                <td>{{ $session->time_spent }} h</td>
                <td>{{ $session->notes }}</td>
                <td class="flex gap-2">
                    @foreach($session->tags as $tag)
                        <p class="py-1 px-2 text-sm font-semibold bg-blue-800 rounded">{{ $tag->tag }}</p>
                    @endforeach
                </td>
            </tr>
        @endforeach

    </tbody>
</table>

@push('scripts')
    <script>
        new DataTable('#sessions', {
            columns: [null, null, null, null, { orderable: false }, { orderable: false }],
            paging: false,
            searching: false,
        });
    </script>
@endpush

