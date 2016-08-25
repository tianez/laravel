<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
// use App\Http\Model\User;
use App\User;
use Auth;
use DB;
use Illuminate\Http\Request;


use Schema;
use Illuminate\Database\Schema\Blueprint;

class TestController extends Controller {
    
    public function __construct() {
        // $this->middleware('auth',['except' => 'login']);
    }
    
    public function index(Request $request) {
        
        $user = session('cur_user');
        if($user){
            $results = DB::table('report')->where('client_number', $user->client_number)->get();
            $res = array();
            foreach ($results as $result) {
                if ($result->result == ' 空')
                    continue;
                if (empty($res[$result->item])) {
                    $res[$result->item] = $result->result;
                } else {
                    $res[$result->item] .= '<br>' . $result->result;
                }
            }
            $d['res'] = $res;
            $d['user'] = $user;
            return view('result',$d);
        }else{
            return view('home');
        }
    }
    
    public function index_post(Request $request) {
        $name = $request->id;
        $password = $request->password;
        if(empty($name) ||empty($password) ){
            $request->session()->flash('msg', '体检单号或查询密码不能为空！');
        }
        $user = DB::table('members')->where('client_number', $name)->where('password', $password)->first();
        if($user){
            session(['cur_user' => $user]);
        }else {
            // $request->session()->put('msg', 'value2');
            $request->session()->flash('msg', 'Task was successful!');
            // session(['msg' => 'value']);
        }
        return redirect('/');
    }
    
    public function result(Request $request) {
        // $user = new User();
        // // 调用方法
        // $sd = $user->getTableColumns();
        // dump(DB::getConnection());
        // dump($sd );
        return view('db');
    }
    
    public function result_post(Request $request) {
        $db_name = $request->dbname;
        dump($db_name);
        if(empty($db_name)){
            $request->session()->flash('msg', '数据库表名不能为空！');
        }elseif (Schema::hasTable($db_name)) {
            $request->session()->flash('msg', '数据表已存在！');
        }else{
            Schema::create($db_name, function(Blueprint $table) {
                $table -> increments('id');
                // $table -> string('key') -> unique() -> comment('字段key');
                // $table -> string('title') -> comment('字段名称');
                // $table -> string('type') -> comment('字段形式');
                // $table -> string('f_module') -> comment('所属模块');
                // $table -> string('f_groups') -> nullable() -> comment('字段分组');
                // $table -> text('f_description') -> nullable() -> comment('字段描述');
                // $table -> string('f_add') -> nullable() -> comment('新增权限');
                // $table -> string('f_edit') -> nullable() -> comment('编辑权限');
                // $table -> string('f_visible') -> nullable() -> comment('可见权限');
                // $table -> string('status') -> default(0) -> comment('状态，0：正常，1：锁定');
                $table -> timestamps();
            });
            $request->session()->flash('msg', '数据库创建成功！');
        }
        // $user = new User();
        // // 调用方法
        // $sd = $user->getTableColumns();
        // dump(DB::getConnection());
        // dump($sd );
        return view('db');
    }
    
    public function addtb(Request $request) {
        return view('db');
    }
    
    public function addtb_post(Request $request) {
        $db_name = $request->dbname;
        $this->db_file = $db_file = $request->dbfile;
        $this->sd = '11111';
        dump($db_name);
        dump($db_file);
        if(empty($db_name)){
            $request->session()->flash('msg', '数据库表名不能为空！');
        }elseif (empty($db_file)) {
            $request->session()->flash('msg', '字段不能为空！');
        }elseif (!Schema::hasTable($db_name)) {
            $request->session()->flash('msg', '数据表不存在！');
        }elseif (Schema::hasColumn($db_name, $db_file)) {
            $request->session()->flash('msg', '字段已存在！');
        }else{
            Schema::table($db_name, function($table)
            {
               $res =  $table->string($this->db_file)->after('u8');
               dump($res);
            });
            // Schema::create($db_name, function(Blueprint $table) {
            //     $table->string('ss');
            //     // $table -> string('key') -> unique() -> comment('字段key');
            //     // $table -> string('title') -> comment('字段名称');
            //     // $table -> string('type') -> comment('字段形式');
            //     // $table -> string('f_module') -> comment('所属模块');
            //     // $table -> string('f_groups') -> nullable() -> comment('字段分组');
            //     // $table -> text('f_description') -> nullable() -> comment('字段描述');
            //     // $table -> string('f_add') -> nullable() -> comment('新增权限');
            //     // $table -> string('f_edit') -> nullable() -> comment('编辑权限');
            //     // $table -> string('f_visible') -> nullable() -> comment('可见权限');
            //     // $table -> string('status') -> default(0) -> comment('状态，0：正常，1：锁定');
            // });
            $request->session()->flash('msg', '数据库创建成功！');
        }
        return view('db');
    }
    
    public function login(Request $request) {
        return view('login');
    }
    
    public function logout(Request $request) {
        return view('login');
    }
}