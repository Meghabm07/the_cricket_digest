<header>
    <div class="container-fluid nav__container">
        <nav class="navbar top__navbar navbar-expand-lg">
            <a class="navbar-brand" href="/">
                <img src="{{ URL::to('/') }}/storage/images/website/logo.png" alt="logo" />
            </a>
            <ul class="navbar-nav mr-auto mobile__nav">
                <li class="nav-item pr-2">
                    <a class="nav-link {{ Request::is('/') ? 'active' : '' }} " href="/">
                        <div class="d-flex flex-row bd-highlight">
                            <div class="bd-highlight fa__nav__icon d-none">
                                <i class="fa fa-home" aria-hidden="true"></i>
                            </div>
                            <div class="bd-highlight">Home</div>
                        </div>
                    </a>
                </li>
                <li class="nav-item pr-2">
                    <a class="nav-link {{ Request::is('all-articles') ? 'active' : '' }}" href="/all-articles">
                        <div class="d-flex flex-row bd-highlight">
                            <div class="bd-highlight fa__nav__icon d-none">
                                <i class="fa fa-list" aria-hidden="true"></i>
                            </div>
                            <div class="bd-highlight">Category</div>
                        </div>
                    </a>
                </li>
                <li class="nav-item pr-2">
                    <a class="nav-link {{ Request::is('about-us') ? 'active' : '' }}" href="/">
                        <div class="d-flex flex-row bd-highlight">
                            <div class="bd-highlight fa__nav__icon d-none">
                                <i class="fa fa-address-card" aria-hidden="true"></i>
                            </div>
                            <div class="bd-highlight">About Us</div>
                        </div>
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav search__article ml-auto">
                <li class="nav-item pr-2">
                    <!-- <div class="input-group">
                        <input class="form-control" type="text" name="" placeholder="Search Article"
                            aria-label="Recipient's " aria-describedby="my-addon">
                        <div class="input-group-append">
                            <span class="input-group-text search__article__icon" id="my-addon">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div> -->
                    <div id="searchbar"></div>
                </li>
            </ul>

        </nav>
    </div>
</header>