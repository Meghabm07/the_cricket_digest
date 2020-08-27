<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('category_id')->index()->unsigned();
            $table->integer('user_id')->index()->unsigned();
            $table->string('name')->unique();
            $table->string('main_name');
            $table->string('image');
            $table->longText('content');
            $table->char('is_most_view', 1)->default(0);
            $table->char('is_trending', 1)->default(0);
            $table->timestamps();

            $table->foreign('category_id')
                ->references('id')
                ->on('category')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogs');
    }
}