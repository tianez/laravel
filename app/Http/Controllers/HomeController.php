<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Model\User;
use Auth;
use DB;
use Illuminate\Http\Request;

class HomeController extends Controller {
    
    public function __construct() {
        // $this->middleware('auth',['except' => 'login']);
    }
    
    public function index(Request $request) {
        $user = session('cur_user');
        dump($user);
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
        return view('login');
    }
    
    public function login(Request $request) {
        return view('login');
    }
    
    public function login_post(request $request) {
        $req = $request->all();
        $data = array('user_name' => $req['username'], 'password' => $req['password']);
        $auth = Auth::attempt($data, true);
        $res = array();
        if ($auth) {
            $res['state'] = 'ok';
            $res['data'] =  Auth::user();
        } else {
            $res['state'] = 'error';
            $res['msg'] = '用户名或密码错误！';
        }
        return response()->json($res);
    }
}