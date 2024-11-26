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
    attendance_id INT AUTO INCREMENT,
    year INT(4),
    month INT(2),
    day INT(2),
    employee_id INT(4),
    day_of_week INT(1),
    start_time TIME DEFAULT '09:00:00',
    finish_time TIME DEFAULT '18:00:00',
    break_time TIME DEFAULT '01:00:00',
    over_time TIME DEFAULT '00:00:00',
    notes VARCHAR(10),
    PRIMARY KEY(attendance_id),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE IF NOT EXISTS request(
    request_id INT,
    attendance_date DATE,
    employee_id INT(4),
    request_date DATETIME,
    day_of_week INT(1),
    start_time TIME DEFAULT '09:00:00',
    finish_time TIME DEFAULT '18:00:00',
    break_time TIME DEFAULT '01:00:00',
    over_time TIME DEFAULT '00:00:00',
    notes VARCHAR(10),
    is_approved INT(1) NOT NULL,
    approved_date DATETIME,
    PRIMARY KEY(request_id, attendance_date),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);
