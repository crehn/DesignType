<?php
class LogLevel {
    public static function debug() {
        return new LogLevel(0, 'DEBUG');
    }
    
    public static function info() {
        return new LogLevel(1, 'INFO');
    }
    
    public static function warn() {
        return new LogLevel(2, 'WARN');
    }
    
    public static function error() {
        return new LogLevel(3, 'ERROR');
    }

    private $value;
    private $name;
    
    private function __construct($value, $name) {
        $this->value = $value;
        $this->name = $name;
    }
    
    public function getValue() {
        return $this->value;
    }
    
    public function __toString() {
        return $this->name;
    }
}

class Logger {
    private $loggername;
    private $loglevel;
    private $requestId;
    const APPLOG = 'log/app';
    const ERRLOG = 'log/error';
    
    public function __construct($loggername) {
	$this->loglevel = LogLevel::info();
        $this->loggername = $loggername;
        $this->requestId = uniqid();
    }
    
    public function setLogLevel(LogLevel $loglevel) {
	$this->loglevel = $loglevel;
    }
    
    public function getRequestid() {
	return $this->requestId;
    }
    
    public function error($message, $details = '') {
        $this->log(self::ERRLOG, LogLevel::error(), "$message $details {$this->getStacktrace()}");
        $this->log(self::APPLOG, LogLevel::error(), $message);
    }

    private function log($filePrefix, $level, $message) {
        if ($level->getValue() >= $this->loglevel->getValue()) {
            $file = $filePrefix . '-' . date('Y-m-d') . '.log';
            file_put_contents($file, $this->logline($level, $message), FILE_APPEND);
        }
    }
    
    private function logline($level, $message) {
        $t = microtime(true);
        $micro = sprintf("%06d",($t - floor($t)) * 1000000);
        $now = new DateTime(date("Y-m-d H:i:s.$micro", $t));
        $timestamp = $now->format("Y-m-d\TH:i:s.uP");
        return "$timestamp|$level|{$this->requestId}|{$this->loggername}|$message\n";
    }
    
    private function getStacktrace() {
        $e = new Exception;
        return $e->getTraceAsString();
    }
    
    public function warn($message) {
        $this->log(self::APPLOG, LogLevel::warn(), $message);
    }
    
    public function info($message) {
        $this->log(self::APPLOG, LogLevel::info(), $message);
    }
    
    public function debug($message) {
        $this->log(self::APPLOG, LogLevel::debug(), $message);
    }
}
?>
