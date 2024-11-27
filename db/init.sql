CREATE DATABASE IF NOT EXISTS kintai;

use kintai;

CREATE TABLE IF NOT EXISTS employee(
    employee_id INT(4) PRIMARY KEY,
    employee_name VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    workplace VARCHAR(30) NOT NULL,
    admin_flag BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS attendance(
    attendance_id INT,
    year CHAR(4) DEFAULT '',
    month CHAR(2) DEFAULT '',
    day CHAR(2) DEFAULT '',
    employee_id INT(4),
    day_of_week INT(1),
    start_time TIME DEFAULT '09:00:00' NOT NULL,
    finish_time TIME DEFAULT '18:00:00' NOT NULL,
    break_time TIME DEFAULT '01:00:00' NOT NULL,
    over_time TIME DEFAULT '00:00:00' NOT NULL,
    notes VARCHAR(10) DEFAULT '' NOT NULL,
    PRIMARY KEY(attendance_id),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE IF NOT EXISTS request(
    request_id INT,
    attendance_date DATE,
    employee_id INT(4) NOT NULL,
    request_date DATETIME NOT NULL,
    start_time TIME DEFAULT '09:00:00',
    finish_time TIME DEFAULT '18:00:00',
    break_time TIME DEFAULT '01:00:00',
    over_time TIME DEFAULT '00:00:00',
    notes VARCHAR(10) DEFAULT '' NOT NULL,
    is_approved INT(1) DEFAULT 0,
    approved_date DATETIME,
    PRIMARY KEY(request_id, attendance_date),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);
