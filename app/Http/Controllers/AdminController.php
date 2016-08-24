<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Model\User;
use Auth;
use DB;
use Illuminate\Http\Request;

class AdminController extends Controller {

	public function __construct() {
		// $this->middleware('auth',['except' => 'login']);
	}

	public function index(Request $request) {
		return view('admin');
	}
}
