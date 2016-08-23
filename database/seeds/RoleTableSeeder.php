<?php

use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'name' => 'admin',
            'display_name' => '管理员',
            'description' => '系统管理员',
            'created_at'=> date("Y-m-d H:i:s"),
        ]);
    }
}
