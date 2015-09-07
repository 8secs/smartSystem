<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 5/09/15
 * Time: 19:22
 */

namespace Arangel\SmartAuth\Http\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Zizaco\Entrust\EntrustRole;

class Role extends EntrustRole {

    use SoftDeletes;

    protected $table = "roles";

    protected $fillable = ['name', 'display_name', 'description'];

    protected $dates = ['deleted_at'];

    public function permissions(){
        return $this->belongsToMany('\Arangel\SmartAuth\Http\Models\Permission');
    }
}