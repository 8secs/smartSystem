<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 5/09/15
 * Time: 19:23
 */

namespace Arangel\SmartAuth\Http\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Zizaco\Entrust\EntrustPermission;

class Permission extends EntrustPermission {

    use SoftDeletes;

    protected $table = "permissions";

    protected $fillable = ['name', 'display_name', 'description'];

    protected $dates = ['deleted_at'];

    public function roles(){
        return $this->belongsToMany('\Arangel\SmartAuth\Http\Models\Role');
    }

}