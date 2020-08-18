@extends('website.layouts.master')

@section('content')


<!-- Content Wrapper. Contains page content -->

<div class="content-wrapper">
    <div id="article" data-id="{{ $blogId }}" data-category-id="{{ $categoryId }}"></div>
</div>


@endsection