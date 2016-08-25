<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    /**
    * 指定表
    */
    protected $table = 'members';
    /**
    * 表明模型是否应该被打上时间戳
    *
    * @var bool
    */
    public $timestamps = false;
}