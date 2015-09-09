<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLocationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('street')->before('formattedAddress');
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('formattedAddress')->nullable();
            $table->string('address')->nullable();
            $table->string('postCode')->nullable();
            $table->float('latitude', 10,6)->nullable();
            $table->float('longitude', 10,6)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('locations');
    }
}
