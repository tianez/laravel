<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
	 * 用户系统
	 * users:用户主表
	 * users_social:第三方账号
	 */
    public function up()
    {
        if (Schema::hasTable('users')) {
			Schema::drop('users');
		}
		Schema::create('users', function(Blueprint $table) {
			$table -> increments('id');
			$table -> tinyInteger('role') -> default(0) -> comment('用户角色，0：普通用户，1：超级管理员，2：普通管理员');
			$table -> string('user_name') -> unique() -> comment('用户名');
            $table -> string('email') -> unique() -> comment('邮箱');  
			$table -> string('password', 60) -> comment('用户密码');
			$table -> string('real_name') -> comment('真实姓名');
			$table -> string('china_id') -> comment('身份证号码');
			$table -> string('head_img') -> comment('用户头像');
			$table -> string('office_phone') -> comment('办公号码');
			$table -> string('mobile_phone') -> comment('手机号码');
			$table -> string('qq') -> comment('QQ号码');
			$table -> tinyInteger('sex') -> default(1) -> comment('性别，0：男，1：女');
			$table -> integer('score') -> default(0) -> comment('用户积分');
			$table -> string('job') -> comment('职位职称');
			$table -> string('team') -> comment('部门');
			$table -> integer('company_id') -> default(0) -> comment('单位，0：系统人员');
			$table -> string('remarks') -> comment('备注');
			$table -> integer('status') -> default(0) -> comment('用户状态,0:正常,1:锁定');
			$table -> integer('login_totals') -> default(0) -> comment('累计登录次数');
			$table -> bigInteger('reg_ip') -> comment('注册IP');
			$table -> bigInteger('last_login_ip') -> comment('最后登录IP');
			$table -> integer('uid') -> default(0) -> comment('操作人员ID，0：自己注册用户');
			$table -> rememberToken();
			$table -> timestamps();
		});

		if (Schema::hasTable('users_social')) {
			Schema::drop('users_social');
		}
		Schema::create('users_social', function($table) {
			$table -> increments('id');
			$table -> integer('uid') -> comment('本地账号id');
			$table -> string('openid') -> comment('第三方openid');
			$table -> string('nickname') -> comment('昵称');
			$table -> tinyInteger('sex') -> default(1) -> comment('性别，0：男，1：女');
			$table -> string('city') -> comment('所在城市');
			$table -> string('province') -> comment('所在省份');
			$table -> string('country') -> comment('国家');
			$table -> string('headimgurl') -> comment('头像');
			$table -> string('subscribe_time') -> comment('关注时间');
			$table -> string('plat') -> comment('所属第三方平台');
			$table -> tinyInteger('status') -> default(1) -> comment('状态,1:已关注,0:已取消关注');
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
        Schema::drop('users');
        Schema::drop('users_social');
    }
}