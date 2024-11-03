<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Foreign key to users table
            $table->text('content');
            $table->text('subject')->nullable();
            $table->string('task_answer')->nullable();
            $table->foreignId('task_id')->constrained('tasks')->onDelete('cascade');
            $table->enum('sender', ['app', 'user'])->default('app');
            $table->timestamps();
            $table->boolean('isSolved')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
