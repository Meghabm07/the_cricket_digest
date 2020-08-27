<header>
    <div class="container-fluid nav__container">
        <nav class="navbar top__navbar navbar-expand-lg">
            <div class="logo">
            <a class="navbar-brand" href="/">
                <img src="{{ URL::to('/') }}/storage/images/website/logo.png" alt="logo" />
            </a>
            </div>
            <ul class="navbar-nav mr-auto mobile__nav">
                <li class="nav-item pr-2">
                    <a class="nav-link {{ Request::is('/') ? 'active' : '' }} " href="/">
                        <div class="d-flex flex-row bd-highlight">
                            <div class="bd-highlight fa__nav__icon d-none">
                                <i class="fa fa-home" aria-hidden="true"></i>
                            </div>
                            <div class="bd-highlight font-weight-bold">Home</div>
                        </div>
                    </a>
                </li>
                <li class="nav-item  pr-2">
                    <a class="nav-link {{ Request::is('category/3') ? 'active' : '' }}" href="/category/3">
                        <div class="d-flex flex-row bd-highlight">
                            <div class="bd-highlight fa__nav__icon d-none">
                                <i class="fa fa-user-secret" aria-hidden="true"></i>
                            </div>
                            <div class="bd-highlight font-weight-bold">Umpiring</div>
                        </div>
                    </a>
                </li>

                <li class="nav-item pr-2 more__button">
                    <div class="nav-link navbar-toggler font-weight-bold" type="button" data-toggle="collapse"
                        data-target="#navBarCategories" aria-controls="navBarCategories" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i> More
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav m-auto d-flex flex-row justify-content-center mobile__top__menu">
                <li class="nav-item">
                    <a class="nav-link {{ Request::is('category/2') ? 'active' : '' }}" href="/category/2">
                        <div class="d-flex flex-row bd-highlight">
                            <div class="bd-highlight fa__nav__icon d-none">
                                <i class="fa fa-gavel" aria-hidden="true"></i>
                            </div>
                            <div class="bd-highlight font-weight-bold">Cricket Laws</div>
                        </div>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ Request::is('videos') ? 'active' : '' }}" href="/videos">
                        <div class="d-flex flex-row bd-highlight">
                            <div class="bd-highlight fa__nav__icon d-none">
                                <i class="fa fa-video-camera" aria-hidden="true"></i>
                            </div>
                            <div class="bd-highlight font-weight-bold">Videos</div>
                        </div>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {{ Request::is('category/1') ? 'active' : '' }}" href="/category/1">
                        <div class="d-flex flex-row bd-highlight">
                            <div class="bd-highlight fa__nav__icon d-none">
                                <i class="fa fa-stack-exchange" aria-hidden="true"></i>
                            </div>
                            <div class="bd-highlight font-weight-bold">Stat Attack</div>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="collapse navbar-collapse mobile__more__nav" id="navBarCategories">

            </div>
            <ul class="navbar-nav search__article ml-auto">
                <li class="nav-item pr-2">
                    <div id="searchbar"></div>
                </li>
            </ul>

        </nav>
    </div>
</header>