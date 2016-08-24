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
		return view('home');
	}

	public function index_post(Request $request) {
		$name = $request->id;
		$password = $request->password;
		$user = DB::connection('tj')->select('SELECT * FROM day_members WHERE day_members.client_number = '.$name.' AND day_members.`password` = '.$password);
		if($user){
			dump($user);
			echo count($user);
			cookie('cur_user', $user[0]);
			return redirect('result');
		}else {
			// $request->session()->put('msg', 'value2');
			$request->session()->flash('msg', 'Task was successful!');
			// session(['msg' => 'value']);
			return redirect('/');
		}
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
