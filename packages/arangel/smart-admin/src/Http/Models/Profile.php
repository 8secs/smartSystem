<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 8/09/15
 * Time: 14:13
 */

namespace Arangel\SmartAdmin\Http\Models;


use Illuminate\Database\Eloquent\Model;

class Profile extends Model {

    use SoftDeletes;

    protected $table = 'profiles';

    protected $fillable = ['user_id', 'position', 'education', 'about_me'];

    protected $dates = ['deleted_at'];


    public function user(){
        $this->belongsTo('\Arangel\SmartAdmin\Http\Models\User');
    }

} 