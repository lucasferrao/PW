CREATE TABLE IF NOT EXISTS tipo_login (
    id_tipo INT PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS login (
    id_login INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    palavra_chave VARCHAR(50) NOT NULL,
    id_tipo INT,
    FOREIGN KEY (id_tipo)
		REFERENCES tipo_login (id_tipo)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS perfil (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    id_login INT,
    FOREIGN KEY (id_login)
		REFERENCES login (id_login)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS patrocinador (
    id_patrocinador INT AUTO_INCREMENT PRIMARY KEY,
    id_perfil INT,
    FOREIGN KEY (id_perfil)
		REFERENCES perfil (id_perfil)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidatura_patrocinador (
    id_candidatura_patrocinador INT AUTO_INCREMENT PRIMARY KEY,
    id_patrocinador INT,
    FOREIGN KEY (id_patrocinador)
		REFERENCES patrocinador (id_patrocinador)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS gestor (
    id_gestor INT AUTO_INCREMENT PRIMARY KEY,
    id_perfil INT,
    FOREIGN KEY (id_perfil)
		REFERENCES perfil (id_perfil)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS candidatura_espaco (
    id_candidatura_espaco INT AUTO_INCREMENT PRIMARY KEY,
    id_gestor INT,
    FOREIGN KEY (id_gestor)
		REFERENCES gestor (id_gestor)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS participante (
    id_participante INT AUTO_INCREMENT PRIMARY KEY,
    id_perfil INT,
    FOREIGN KEY (id_perfil)
		REFERENCES perfil (id_perfil)
        ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS promocao (
    id_promocao INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS pagamento (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS espaco (
    id_espaco INT AUTO_INCREMENT PRIMARY KEY,
    id_gestor INT,
    FOREIGN KEY (id_gestor)
		REFERENCES gestor (id_gestor)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sala (
    id_sala INT AUTO_INCREMENT PRIMARY KEY,
    id_espaco INT,
    FOREIGN KEY (id_espaco)
		REFERENCES espaco (id_espaco)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS registo (
    id_registo INT AUTO_INCREMENT PRIMARY KEY,
    id_participante INT,
    id_promocao INT,
    id_pagamento INT,
    id_sala INT,
    FOREIGN KEY (id_participante)
		REFERENCES participante (id_participante)
        ON DELETE CASCADE,
	FOREIGN KEY (id_promocao)
		REFERENCES promocao (id_promocao)
        ON DELETE CASCADE,
	FOREIGN KEY (id_pagamento)
		REFERENCES pagamento (id_pagamento)
        ON DELETE CASCADE,
	FOREIGN KEY (id_sala)
		REFERENCES sala (id_sala)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resultado (
    id_resultado INT AUTO_INCREMENT PRIMARY KEY,
    id_registo INT,
    FOREIGN KEY (id_registo)
		REFERENCES registo (id_registo)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS evento (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    id_resultado INT,
    FOREIGN KEY (id_resultado)
		REFERENCES resultado (id_resultado)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS atividade (
    id_atividade INT AUTO_INCREMENT PRIMARY KEY,
    id_evento INT,
    FOREIGN KEY (id_evento)
		REFERENCES evento (id_evento)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sala_atividade (
    id_sala_atividade INT AUTO_INCREMENT PRIMARY KEY,
    id_espaco INT,
    FOREIGN KEY (id_espaco)
		REFERENCES espaco (id_espaco)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS espaco_patrocinador (
    id_espaco_patrocinador INT AUTO_INCREMENT PRIMARY KEY,
    id_espaco INT,
    id_patrocinador INT,
    FOREIGN KEY (id_espaco)
		REFERENCES espaco (id_espaco)
        ON DELETE CASCADE,
    FOREIGN KEY (id_patrocinador)
		REFERENCES patrocinador (id_patrocinador)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS formulario_espaco (
    id_formulario_espaco INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS formulario_patrocinador (
    id_formulario_patrocinador INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS notificacao (
    id_notificacao INT AUTO_INCREMENT PRIMARY KEY
);