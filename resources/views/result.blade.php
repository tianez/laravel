@extends('layout.master') @section('title', 'Page Title') @section('content')
<form class="form-horizontal" method="post">
  <div class="weui_cells_title">体检查询</div>
  <div class="weui_cells weui_cells_form">
    <div class="weui_cell">
      <div class="weui_cell_hd">
        <label class="weui_label weui_cell_hd">体检单号</label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input type="tel" name="id" class="weui_input" placeholder="请输入体检单号" value="">
      </div>
    </div>
    <div class="weui_cell">
      <div class="weui_cell_hd">
        <label class="weui_label weui_cell_hd">查询密码</label>
      </div>
      <div class="weui_cell_bd weui_cell_primary">
        <input type="tel" name="password" class="weui_input" placeholder="请输入查询密码" value="">
      </div>
    </div>
  </div>
  <div class="weui_btn_area">
    <button type="submit" class="weui_btn weui_btn_primary">提交查询</button>
  </div>
</form>
<table class="table table-bordered">
  <tbody>
    <tr>
      <td>你的姓名</td>
      <td>{{$user->client_name}}</td>
      <td>身份证号</td>
      <td>{{ (isset($user->china_id) && $user->china_id!=='') ? $user->china_id : 'Default' }}</td>
    </tr>
    <tr>
      <td>体检单号</td>
      <td>{{$user->client_number}}</td>
      <td>手机号码</td>
      <td>{{$user->mobile_phone or 'sdsdsdssdsdsds'}}</td>
    </tr>
    <tr>
      <td>体检日期</td>
      <td>2015-08-21 14:53:02</td>
      <td>报告日期</td>
      <td></td>
    </tr>
  </tbody>
</table>
<table class="table table-bordered">
  <tr>
    <th>体检项目</th>
    <th>详细报告</th>
  </tr>
  @foreach ($res as $key=> $r)
  <tr>
    <td>{{$key}}</td>
    <td>{{$r}}</td>
  </tr>
  @endforeach
</table>
@endsection