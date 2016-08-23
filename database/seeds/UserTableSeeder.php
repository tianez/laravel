<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'user_name' => 'tianez',
            'email' => 'saber_tz@163.com',
            'password' => bcrypt('123456'),
            'role'=>'1',
            'created_at'=> date("Y-m-d H:i:s"),
        ]);
        // DB::table('users')->insert([
        //     'user_name' => str_random(10),
        //     'email' => str_random(10).'@gmail.com',
        //     'password' => bcrypt('secret'),
        // ]);
    }
}
