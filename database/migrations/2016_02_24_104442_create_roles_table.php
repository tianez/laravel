<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolesTable extends Migration
{
    /**
	 * 用户权限系统
	 * roles:用户组
     * role_user:用户与用户组关系表
	 * role_permissions:用户权限
	 * role_permission:用户组与权限关系表
	 */
    public function up()
    {      
        if (Schema::hasTable('roles')) {
			Schema::drop('roles');
		}
		Schema::create('roles', function(Blueprint $table) {
			$table -> increments('id');
			$table -> string('name') -> unique() -> comment('用户组名');
			$table -> string('display_name') -> nullable() -> comment('显示名称');
			$table -> string('thumb') -> comment('用户组头像');
			$table -> text('description') -> nullable() -> comment('用户组描述');
			$table -> string('status') -> default(0) -> comment('状态，0：正常，1：锁定');
			$table -> timestamps();
		});

		if (Schema::hasTable('role_permissions')) {
			Schema::drop('role_permissions');
		}
		Schema::create('role_permissions', function(Blueprint $table) {
			$table -> increments('id');
			$table -> string('name') -> unique() -> comment('权限名');
			$table -> string('display_name') -> comment('权限显示名称');
			$table -> string('group') -> comment('权限分组');
			$table -> string('description') -> comment('权限描述');
			$table -> timestamps();
		});

		if (Schema::hasTable('role_user')) {
			Schema::drop('role_user');
		}
		Schema::create('role_user', function(Blueprint $table) {
			$table -> integer('user_id') -> unsigned();
			$table -> integer('role_id') -> unsigned();
			$table -> foreign('user_id') -> references('id') -> on('users') -> onUpdate('cascade') -> onDelete('cascade');
			$table -> foreign('role_id') -> references('id') -> on('roles') -> onUpdate('cascade') -> onDelete('cascade');
			$table -> primary(array('user_id', 'role_id'));
		});

		if (Schema::hasTable('role_permission')) {
			Schema::drop('role_permission');
		}
		Schema::create('role_permission', function(Blueprint $table) {
			$table -> integer('role_id') -> unsigned();
			$table -> integer('permission_id') -> unsigned();
			$table -> foreign('permission_id') -> references('id') -> on('role_permissions') -> onUpdate('cascade') -> onDelete('cascade');
			$table -> foreign('role_id') -> references('id') -> on('roles') -> onUpdate('cascade') -> onDelete('cascade');
			$table -> primary(array('permission_id', 'role_id'));
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('roles');
        Schema::drop('role_user');
        Schema::drop('role_permissions');
        Schema::drop('role_permission');
    }
}
