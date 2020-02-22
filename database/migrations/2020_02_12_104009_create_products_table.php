<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('category_id')->index()->unsigned();
            $table->string('name')->unique();
            $table->integer('price');
            $table->text('description');
            $table->integer('brand_id')->index()->unsigned();
            $table->char('in_stock', 1)->default(0);
            $table->timestamps();

            $table->foreign('category_id')
                ->references('id')
                ->on('category');

            $table->foreign('brand_id')
                ->references('id')
                ->on('brand');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
