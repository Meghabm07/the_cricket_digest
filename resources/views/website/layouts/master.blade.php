<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>The Cricket Digest</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <link rel="icon" type="image/png" href="{{ URL::to('/') }}/storage/images/website/favicon.png" />

    <link rel="stylesheet" href="{{ mix('/css/website/app.css') }}">
</head>

<body>

    <div id="preloader"></div>

    @include('website.layouts.header')

    <div class="wrapper">

        @yield('content')

    </div>

    @include('website.layouts.footer')

    <script src="{{ mix('/js/website/app.js') }}"></script>
    <script>
    $(window).on('load', function() {
        $("#preloader").remove();
    });
    </script>
    <script type="text/javascript">
    $(document).ready(function() {
        $(window).scroll(function() {
            var header = $('header'),
                scroll = $(window).scrollTop();

            if (scroll >= 100) header.addClass('fixed');
            else header.removeClass('fixed');
        });
    });
    </script>
</body>


</html>