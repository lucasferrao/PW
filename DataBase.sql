CREATE TABLE IF NOT EXISTS login_type (
    id_login_type INT AUTO_INCREMENT PRIMARY KEY,
    user_type INT NOT NULL
);

CREATE TABLE IF NOT EXISTS login (
    id_login INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    keyword VARCHAR(50) NOT NULL,
    id_login_type INT,
    FOREIGN KEY (id_login_type)
		REFERENCES login_type (id_login_type)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_profile (
    id_user_profile INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    user_name VARCHAR (25) NOT NULL,
    id_login INT,
    FOREIGN KEY (id_login)
		REFERENCES login (id_login)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sponser_candidature (
    id_sponser_candidature INT AUTO_INCREMENT PRIMARY KEY,
    sponser_name VARCHAR (50) NOT NULL,
    email VARCHAR (100) NOT NULL,
    mobile_number INT NOT NULL,
    nif INT NOT NULL,
    id_user_profile INT,
    FOREIGN KEY (id_user_profile)
		REFERENCES user_profile (id_user_profile)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sponser (
    id_sponser INT AUTO_INCREMENT PRIMARY KEY,
    sponser_name VARCHAR (50) NOT NULL,
    email VARCHAR (100) NOT NULL,
    address VARCHAR (100) NOT NULL,
    mobile_number INT NOT NULL,
    nif INT NOT NULL,
    id_sponser_candidature INT,
    FOREIGN KEY (id_sponser_candidature)
		REFERENCES sponser_candidature (id_sponser_candidature)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS manager_candidature (
    id_manager_candidature INT AUTO_INCREMENT PRIMARY KEY,
    manager_name VARCHAR (50) NOT NULL,
    email VARCHAR (100) NOT NULL,
    mobile_number INT NOT NULL,
    nif INT NOT NULL,
    nib INT NOT NULL,
    id_user_profile INT,
    FOREIGN KEY (id_user_profile)
		REFERENCES user_profile (id_user_profile)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS manager (
    id_manager INT AUTO_INCREMENT PRIMARY KEY,
    id_manager_candidature INT,
    FOREIGN KEY (id_manager_candidature)
		REFERENCES manager_candidature (id_manager_candidature)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS space_candidature (
    id_space_candidature INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR (100) NOT NULL,
    price INT NOT NULL,
    max_capacity INT NOT NULL,
    picture VARCHAR (1000) NOT NULL,
    balneary BOOLEAN NOT NULL,
    id_manager INT,
    FOREIGN KEY (id_manager)
		REFERENCES manager (id_manager)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS space (
    id_space INT AUTO_INCREMENT PRIMARY KEY,
    space_description VARCHAR (500) NOT NULL,
    id_space_candidature INT,
    FOREIGN KEY (id_space_candidature)
		REFERENCES space_candidature (id_space_candidature)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS player (
    id_player INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR (20) NOT NULL,
    genre VARCHAR (6) NOT NULL,
    birthdate DATE NOT NULL,
    city VARCHAR (20) NOT NULL,
    id_user_profile INT,
    FOREIGN KEY (id_user_profile)
		REFERENCES user_profile (id_user_profile)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS promotion (
    id_promotion INT AUTO_INCREMENT PRIMARY KEY,
    percentage INT NOT NULL
);

CREATE TABLE IF NOT EXISTS payment (
    id_payment INT AUTO_INCREMENT PRIMARY KEY,
    ammount DOUBLE NOT NULL
);

CREATE TABLE IF NOT EXISTS register (
    id_register INT AUTO_INCREMENT PRIMARY KEY,
    id_player INT,
    id_promotion INT,
    id_payment INT,
    FOREIGN KEY (id_player)
		REFERENCES player (id_player)
        ON DELETE CASCADE,
	FOREIGN KEY (id_promotion)
		REFERENCES promotion (id_promotion)
        ON DELETE CASCADE,
	FOREIGN KEY (id_payment)
		REFERENCES payment (id_payment)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS room (
    id_room INT AUTO_INCREMENT PRIMARY KEY,
    capacity INT NOT NULL,
    id_space INT,
    id_register INT,
    FOREIGN KEY (id_space)
		REFERENCES space (id_space)
        ON DELETE CASCADE,
	FOREIGN KEY (id_register)
		REFERENCES register (id_register)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS score (
    id_score INT AUTO_INCREMENT PRIMARY KEY,
    final_score VARCHAR (7) NOT NULL,
    number_kill INT NOT NULL,
    number_death INT NOT NULL,
    id_register INT,
    FOREIGN KEY (id_register)
		REFERENCES register (id_register)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activity (
    id_activity INT AUTO_INCREMENT PRIMARY KEY,
    activity_description VARCHAR (50) NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE IF NOT EXISTS match_event (
    id_match_event INT AUTO_INCREMENT PRIMARY KEY,
    id_score INT,
    id_activity INT,
    FOREIGN KEY (id_score)
		REFERENCES score (id_score)
        ON DELETE CASCADE,
	FOREIGN KEY (id_activity)
		REFERENCES activity (id_activity)
        ON DELETE CASCADE
	
);

CREATE TABLE IF NOT EXISTS space_activity (
    id_space INT,
    id_match_event INT,
    FOREIGN KEY (id_space)
		REFERENCES space (id_space)
        ON DELETE CASCADE,
	FOREIGN KEY (id_match_event)
		REFERENCES match_event (id_match_event)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS space_sponser (
	price INT NOT NULL,
    id_space INT,
    id_sponser INT,
    FOREIGN KEY (id_space)
		REFERENCES space (id_space)
        ON DELETE CASCADE,
    FOREIGN KEY (id_sponser)
		REFERENCES sponser (id_sponser)
        ON DELETE CASCADE
);