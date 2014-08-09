<?php
include_once 'DBConfig.php';

class DBConnection
{
    private $connection;
    private static $instance;

    private function __construct()
    {
        $this->connect();
    }

    public static function get_instance()
    {
        if (self::$instance == null) {
            self::$instance = new DBConnection();
        }

        return self::$instance;
    }

    private function connect()
    {
        if ($this->connection == null) {
            try {
                $this->connection = mysqli_connect(DBconfig::$config['DB_HOST'],
                    DBconfig::$config['DB_USERNAME'],
                    DBconfig::$config['DB_PASSWORD'],
                    DBconfig::$config['DB_NAME']);
                mysqli_set_charset($this->connection,'utf8');

            } catch (Exception $ex) {
                echo "I was unable to open a connection to the database. " . $ex->getMessage();
                return null;
            }
        }


    }

    public function query($query)
    {
        if ($this->connection == null) {
            die("error no connection");
        }
        $res = mysqli_query($this->connection, $query);
        return $res;
    }

    public function escape($values){
        foreach($values as $key => $value){
            $values[$key]= mysqli_real_escape_string($this->connection,$value);
        }
        return $values;
    }
} 