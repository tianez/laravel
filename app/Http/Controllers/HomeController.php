<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Model\User;
use Auth;
use Illuminate\Http\Request;

class HomeController extends Controller {

	public function __construct() {
		$this->middleware('auth',['except' => 'login']);
	}

	public function index(Request $request) {
		return view('home');
	}

    public function login(Request $request) {
		return view('home');
	}
}
