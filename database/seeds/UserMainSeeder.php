<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 17/09/15
 * Time: 12:29
 */


use Arangel\SmartAdmin\Http\Models\User as User;
use Arangel\SmartAuth\Http\Models\Role as Role;
use Arangel\SmartAuth\Http\Models\Permission as Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserMainSeeder extends Seeder {


    public function __construct(User $user,
                                Role $role,
                                Arangel\SmartAuth\Http\Models\Permission $permission){
        $this->user = $user;
        $this->role = $role;
        $this->permission = $permission;
    }

    public function run()
    {

        $admin = array(
            'displayName'			=> 'Andres Rangel',
            'email'					=> 'arangeltorres@gmail.com',
            'password'				=> bcrypt('12345'),
            'active'    			=> 1,
            'created_at'			=> date("Y-m-d H:i:s"),
            'updated_at'			=> date("Y-m-d H:i:s"),
            'image' 				=> '55fa8e7a612e4.png'
        );
        $user = array(
            'displayName'			=> 'User Andres',
            'email'					=> 'a28rangel@gmail.com',
            'password'				=> bcrypt('12345'),
            'active'    			=> 0,
            'activation_code'		=> md5(microtime().Config::get('app.key')),
            'created_at'			=> date("Y-m-d H:i:s"),
            'updated_at'			=> date("Y-m-d H:i:s"),
            'image' 				=> '55fa8e7a612e4.png'
        );
        $permissions = array(
            [
                'display_name'		=> 'Manage Admin',
                'name'				=> 'manage_admin',
                'description'		=> 'Give permission to user to access the admin area.',
                'created_at'		=> date("Y-m-d H:i:s"),
                'updated_at'		=> date("Y-m-d H:i:s"),
            ],
            [
                'display_name'		=> 'Manage Own Data',
                'name'				=> 'manage_own',
                'description'		=> 'Allow users to manage their own data.',
                'created_at'		=> date("Y-m-d H:i:s"),
                'updated_at'		=> date("Y-m-d H:i:s"),
            ],
        );
        $roles = array(
            [
                'display_name'		=> 'Admin',
                'name'				=> 'admin',
                'description'		=> 'Give user full permission to site functions.',
                'created_at'		=> date("Y-m-d H:i:s"),
                'updated_at'		=> date("Y-m-d H:i:s"),
            ],
            [
                'display_name'		=> 'User',
                'name'				=> 'user',
                'description'		=> 'Standard User',
                'created_at'    	=> date("Y-m-d H:i:s"),
                'updated_at'		=> date("Y-m-d H:i:s"),
            ],
        );
// Create Permissions
        DB::table('permissions')->delete();
        $statement = "ALTER TABLE permissions AUTO_INCREMENT = 1;";
        DB::unprepared($statement);
        DB::table('permissions')->insert( $permissions );
// Create Roles
        DB::table('roles')->delete();
        $statement = "ALTER TABLE roles AUTO_INCREMENT = 1;";
        DB::unprepared($statement);
        DB::table('roles')->insert( $roles );
// Clear relationships
        DB::table('permission_role')->delete();
        $statement = "ALTER TABLE permission_role AUTO_INCREMENT = 1;";
        DB::unprepared($statement);
        DB::table('role_user')->delete();
        $statement = "ALTER TABLE role_user AUTO_INCREMENT = 1;";
        DB::unprepared($statement);
// Create Users
        DB::table('users')->delete();
        $statement = "ALTER TABLE users AUTO_INCREMENT = 1;";
        DB::unprepared($statement);
        DB::table('users')->insert($admin);
        DB::table('users')->insert($user);
// Attach permission to role
        $role = $this->role->find(1);
        $role2 = $this->role->find(2);
        /*$perm_1 = $this->permission->find(1);
        $role->attachPermission($perm_1);

        $perm_2 = $this->permission->find(2);
        $role2->attachPermission($perm_2);*/
// Attach role to user
        $user = User::find(1);
        $user->roles()->attach($role);
        $user = User::find(2);
        $user->roles()->attach($role2);
    }

} 