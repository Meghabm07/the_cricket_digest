<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ config('app.name') }}</title>

    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ URL::asset('dist/plugins/fontawesome-free/css/all.min.css')}}">

    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">

    <!-- icheck bootstrap -->
    <link rel="stylesheet" href="{{ URL::asset('dist/plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">

    <link rel="icon" type="image/png" href="{{ URL::to('/') }}/storage/images/website/favicon.png" />

    <!-- Theme style -->
    <link rel="stylesheet" href="{{ URL::asset('dist/css/adminlte.min.css')}}">

    <link rel="stylesheet" href="{{ URL::asset('css/app.css')}}">
    <!-- Google Font: Source Sans Pro -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

</head>

<body class="hold-transition login-page"
    style="background:url('/storage/images/website/stadium.jpg');background-size:cover;">
    <div class="login-box">

        <!-- /.login-logo -->
        <div class="card" style="box-shadow: 1px 1px 6px rgba(0,0,0,.16); ">
            <div class="card-body login-card-body">
                <p class="login-box-msg">
                    <a href="/">
                        <img src="{{ URL::to('/') }}/storage/images/website/logo.png" style="width:80%" alt="logo" />
                    </a>
                </p>

                <form method="POST" action="{{ route('login') }}">
                    @csrf
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" name="email" placeholder="Email">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>

                        @if ($errors->has('email'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                        @endif
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" name="password" placeholder="Password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                        @if ($errors->has('password'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                        @endif
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" name="remember" id="remember"
                                    {{ old('remember') ? 'checked' : '' }}>
                                <label for="remember">
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <!-- /.col -->
                        <div class="col-4">
                            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
            </div>
            <!-- /.login-card-body -->
        </div>
    </div>
    <!-- /.login-box -->

    <!-- jQuery -->
    <script src="{{ URL::asset('dist/plugins/jquery/jquery.min.js')}}"></script>
    <!-- Bootstrap 4 -->
    <script src="{{ URL::asset('dist/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <!-- AdminLTE App -->
    <script src="{{ URL::asset('dist/js/adminlte.min.js')}}"></script>

</body>

</html>