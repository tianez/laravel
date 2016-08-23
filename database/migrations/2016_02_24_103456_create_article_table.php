<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticleTable extends Migration
{
    /**
	 * 文档系统
	 * article:文档主表
	 * article_meta:文档扩展字段
	 * article_comments:文档评论
	 * article_category:文档分类表
	 * article_taxonomy:文档分类关系表
	 */
    public function up()
    {
        if (Schema::hasTable('article')) {
			Schema::drop('article');
		}
        Schema::create('article', function (Blueprint $table) {
            $table -> increments('id') -> comment('主键ID');
			$table -> string('title') -> unique() -> comment('标题');
			$table -> string('keyword') -> comment('关键词');
			$table -> string('excerpt') -> comment('简介');
			$table -> string('thumb') -> comment('缩略图 ');
			$table -> longText('content') -> comment('内容');
			$table -> string('link') -> comment('外链');
			$table -> integer('cat_id') -> default(0) -> comment('所属分类');
			$table -> tinyInteger('type') -> comment('类型');
			$table -> string('temp') -> comment('模板');
			$table -> integer('uid') -> default(0) -> comment('作者ID');
			$table -> integer('view') -> default(0) -> comment('浏览次数');
			$table -> integer('bookmark') -> default(0) -> comment('收藏数');
			$table -> integer('comment') -> default(0) -> comment('评论数');
			$table -> string('comment_status') -> comment('评论状态');
			$table -> tinyInteger('status') -> default(0) -> comment('状态，0：正常，1：锁定');
			$table -> timestamps();
        });
        
        if (Schema::hasTable('article_meta')) {
			Schema::drop('article_meta');
		}
		Schema::create('article_meta', function($table) {
			$table -> increments('id') -> comment('主键ID');
			$table -> integer('article_id') -> comment('文章id');
			$table -> string('meta_key') -> comment('字段名');
			$table -> longText('meta_value') -> comment('字段值');
		});
        
        if (Schema::hasTable('article_comments')) {
			Schema::drop('article_comments');
		}
		Schema::create('article_comments', function($table) {
			$table -> increments('id') -> comment('主键ID');
			$table -> integer('article_id') -> comment('文章id');
			$table -> text('content') -> comment('评论内容');
			$table -> integer('pid') -> comment('上级评论id');
			$table -> integer('author_id') -> comment('评论者id');
			$table -> string('author_name') -> comment('评论者名称');
			$table -> string('author_email') -> comment('评论者邮箱');
			$table -> string('author_url') -> comment('评论者网址');
			$table -> string('author_ip') -> comment('评论者IP');
			$table -> string('type') -> comment('评论所属模型');
			$table -> tinyInteger('status') -> default(0) -> comment('状态,0:正常,1:锁定');
			$table -> timestamps();
		});

		if (Schema::hasTable('article_category')) {
			Schema::drop('article_category');
		}
		Schema::create('article_category', function($table) {
			$table -> increments('id') -> comment('主键ID');
			$table -> string('category_name') -> comment('分类名称');
			$table -> string('category_ico') -> comment('分类图标');
			$table -> longText('category_des') -> comment('分类描述');
			$table -> integer('pid') -> comment('上级分类');
			$table -> integer('taxonomy') -> comment('所属分类法');
			$table -> tinyInteger('status') -> default(0) -> comment('状态,0:正常,1:锁定');
			$table -> timestamps();
		});

		if (Schema::hasTable('article_taxonomy')) {
			Schema::drop('article_taxonomy');
		}
		Schema::create('article_taxonomy', function($table) {
			$table -> integer('article_id') -> comment('文章id');
			$table -> integer('cat_id') -> comment('分类id');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('article');
        Schema::drop('article_meta');
        Schema::drop('article_comments');
        Schema::drop('article_category');
        Schema::drop('article_taxonomy');
    }
}
