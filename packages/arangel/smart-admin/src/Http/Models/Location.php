<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 8/09/15
 * Time: 14:12
 */

namespace Arangel\SmartAdmin\Http\Models;


use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model {

    use SoftDeletes;

    protected $table = 'locations';
    protected $fillable = ['user_id', 'city', 'country', 'formattedAddress', 'address', 'postCode', 'latitude', 'longitude'];
    protected $dates = ['deleted_at'];

    public function user(){
        $this->belongsTo('\Arangel\SmartAdmin\Http\Models\User');
    }

} 