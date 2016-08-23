<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('fields')) {
            Schema::drop('fields');
        }
        Schema::create('fields', function(Blueprint $table) {
            $table -> increments('id');
            $table -> string('key') -> unique() -> comment('字段key');
            $table -> string('title') -> comment('字段名称');
            $table -> string('type') -> comment('字段形式');
            $table -> string('f_module') -> comment('所属模块');
            $table -> string('f_groups') -> nullable() -> comment('字段分组');
            $table -> text('f_description') -> nullable() -> comment('字段描述');
            $table -> string('f_add') -> nullable() -> comment('新增权限');
            $table -> string('f_edit') -> nullable() -> comment('编辑权限');
            $table -> string('f_visible') -> nullable() -> comment('可见权限');
            $table -> string('status') -> default(0) -> comment('状态，0：正常，1：锁定');
            $table -> timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('fields');
    }
}
