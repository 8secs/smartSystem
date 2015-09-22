<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 8/09/15
 * Time: 13:57
 */

namespace Arangel\SmartAdmin\Http\Models;


use Fenos\Notifynder\Notifable;
use Cmgmyr\Messenger\Traits\Messagable;

class User extends \Arangel\SmartAuth\Http\Models\User {

    use Notifable, Messagable;

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne Profile
     *
     */
    public function profile(){
        return $this->hasOne('\Arangel\SmartAdmin\Http\Models\Profile');
    }

    public function locations(){
        return $this->hasMany('\Arangel\SmartAdmin\Http\Models\Location');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany Friends
     */
    public function friends()
    {
        return $this->belongsToMany('\Arangel\SmartAdmin\Http\Models\User', 'friends_users', 'user_id', 'friend_id');
    }

    /**
     * Add new Friend to list
     *
     * @param User $user
     */
    public function addFriend(User $user)
    {
        $this->friends()->attach($user->id);
    }

    /**
     * @param User $user
     */
    public function removeFriend(User $user)
    {
        $this->friends()->detach($user->id);
    }

    public function followers(){
        return $this->belongsToMany('\Arangel\SmartAdmin\Http\Models\User', 'followers_users', 'user_id', 'follower_id');
    }

    public function following(){
        return $this->belongsToMany('\Arangel\SmartAdmin\Http\Models\User', 'followers_users', 'follower_id', 'user_id');
    }

    public function addFollower(\User $user){
        $this->followers()->attach($user->id);
    }

    public function removeFollower(User $user){
        $this->followers()->detach($user->id);
    }

    public function addFollowee(User $user){
        $this->following()->attach($user->id);
    }

    public function removeFollowee(User $user){
        $this->following()->detach($user->id);
    }

} 