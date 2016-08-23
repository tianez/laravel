<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        date_default_timezone_set("Asia/Shanghai");
        $this->call(UserTableSeeder::class);
        $this->call(RoleTableSeeder::class);
    }
}
