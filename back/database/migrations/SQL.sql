-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`administrador` (
  `idadministrador` INT NOT NULL,
  `nombre_administrador` VARCHAR(50) NULL,
  `telf_administrador` VARCHAR(12) NULL,
  `email_administrador` VARCHAR(35) NULL,
  `pass_administrador` VARCHAR(500) NULL,
  PRIMARY KEY (`idadministrador`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`parqueo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`parqueo` (
  `idParqueo` INT NOT NULL AUTO_INCREMENT,
  `nombre_parqueo` VARCHAR(15) NOT NULL,
  `administrador_idadministrador` INT NULL,
  `mapa_parqueo` VARCHAR(100) NULL,
  `numero_de_zonas` INT NULL,
  PRIMARY KEY (`idParqueo`),
  INDEX `fk_parqueo_administrador1_idx` (`administrador_idadministrador` ASC)  ,
  CONSTRAINT `fk_parqueo_administrador1`
    FOREIGN KEY (`administrador_idadministrador`)
    REFERENCES `mydb`.`administrador` (`idadministrador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`zonaEstacionamiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`zonaEstacionamiento` (
  `idzonaEstacionamiento` INT NOT NULL AUTO_INCREMENT,
  `nombre_zona_estacionamiento` VARCHAR(25) NOT NULL,
  `parqueo_idparqueo` INT NOT NULL,
  `techo` TINYINT NULL,
  `arboles_cerca` TINYINT NULL,
  `tipo_de_piso` VARCHAR(15) NULL,
  `descripcion` VARCHAR(45) NULL,
  `numero_de_sitios` INT NOT NULL,
  PRIMARY KEY (`idzonaEstacionamiento`),
  INDEX `fk_zonaEstacionamiento_parqueo1_idx` (`parqueo_idparqueo` ASC)  ,
  CONSTRAINT `fk_zonaEstacionamiento_parqueo1`
    FOREIGN KEY (`parqueo_idparqueo`)
    REFERENCES `mydb`.`parqueo` (`idParqueo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`guardia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`guardia` (
  `idguardia` INT NOT NULL AUTO_INCREMENT,
  `nombre_guardia` VARCHAR(45) NULL,
  `telefono_guardia` VARCHAR(45) NULL,
  `zonaEstacionamiento_idzonaEstacionamiento` INT NULL,
  `pass_guardia` VARCHAR(500) NULL,
  PRIMARY KEY (`idguardia`),
  INDEX `fk_guardia_zonaEstacionamiento1_idx` (`zonaEstacionamiento_idzonaEstacionamiento` ASC)  ,
  CONSTRAINT `fk_guardia_zonaEstacionamiento1`
    FOREIGN KEY (`zonaEstacionamiento_idzonaEstacionamiento`)
    REFERENCES `mydb`.`zonaEstacionamiento` (`idzonaEstacionamiento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cliente` (
  `idcliente` INT NOT NULL,
  `nombre_cliente` VARCHAR(50) NOT NULL,
  `estado_pago` TINYINT NULL,
  `multa` INT NULL,
  `monto_a_pagar` INT NULL,
  `saldo` INT NULL,
  `fecha_pagado` DATE NULL,
  `mesAdelantado` INT NULL,
  `meses_cancelados` VARCHAR(100) NULL,
  `fecha_lim_pago` DATE NULL,
  `telf_cliente` VARCHAR(15) NULL,
  `email_cliente` VARCHAR(35) NULL,
  `password` VARCHAR(500) NULL,
  `apellidos_cliente` VARCHAR(60) NULL,
  `direccion_cliente` VARCHAR(60) NULL,
  `unidad_trabajo` VARCHAR(60) NULL,
  `cargo_cliente` VARCHAR(60) NULL,
  PRIMARY KEY (`idcliente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`historial_entradas_salidas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`historial_entradas_salidas` (
  `idhistorial` INT NOT NULL AUTO_INCREMENT,
  `fecha_ingreso` DATETIME NULL,
  `fecha_salida` DATETIME NULL,
  `cliente_idcliente` INT NOT NULL,
  PRIMARY KEY (`idhistorial`),
  INDEX `fk_historial_entradas_salidas_cliente1_idx` (`cliente_idcliente` ASC)  ,
  CONSTRAINT `fk_historial_entradas_salidas_cliente1`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `mydb`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`operador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`operador` (
  `idoperador` INT NOT NULL,
  `nombre_operador` VARCHAR(50) NULL,
  `telf_operador` VARCHAR(12) NULL,
  `email_operador` VARCHAR(35) NULL,
  `pass_operador` VARCHAR(500) NULL,
  `parqueo_idparqueo` INT NULL,
  PRIMARY KEY (`idoperador`),
  INDEX `fk_operador_parqueo1_idx` (`parqueo_idparqueo` ASC)  ,
  CONSTRAINT `fk_operador_parqueo1`
    FOREIGN KEY (`parqueo_idparqueo`)
    REFERENCES `mydb`.`parqueo` (`idParqueo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`reporte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`reporte` (
  `idreporte` INT NOT NULL AUTO_INCREMENT,
  `titulo_reporte` VARCHAR(45) NULL,
  `ingreso_reporte` INT NULL,
  `datos` JSON NULL,
  `operador_idoperador` INT NOT NULL,
  PRIMARY KEY (`idreporte`),
  INDEX `fk_reporte_operador1_idx` (`operador_idoperador` ASC)  ,
  CONSTRAINT `fk_reporte_operador1`
    FOREIGN KEY (`operador_idoperador`)
    REFERENCES `mydb`.`operador` (`idoperador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`sitio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`sitio` (
  `idsitio` INT NOT NULL AUTO_INCREMENT,
  `zonaEstacionamiento_idzonaEstacionamiento` INT NULL,
  `cliente_idcliente` INT NULL,
  `numero` INT NULL,
  PRIMARY KEY (`idsitio`),
  INDEX `fk_parqueo_zonaEstacionamiento_idx` (`zonaEstacionamiento_idzonaEstacionamiento` ASC)  ,
  INDEX `fk_parqueo_cliente1_idx` (`cliente_idcliente` ASC)  ,
  CONSTRAINT `fk_parqueo_zonaEstacionamiento`
    FOREIGN KEY (`zonaEstacionamiento_idzonaEstacionamiento`)
    REFERENCES `mydb`.`zonaEstacionamiento` (`idzonaEstacionamiento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_parqueo_cliente1`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `mydb`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`notificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`notificacion` (
  `idnotificaciones` INT NOT NULL AUTO_INCREMENT,
  `emisor_notif` VARCHAR(50) NULL,
  `receptor_notif` VARCHAR(50) NULL,
  `titulo_notif` VARCHAR(80) NULL,
  `mensaje_notif` VARCHAR(500) NULL,
  `idemisor` INT NULL,
  `idreceptor` INT NULL,
  `fecha_notif` DATE NULL,
  PRIMARY KEY (`idnotificaciones`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`turno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`turno` (
  `idturno` INT NOT NULL AUTO_INCREMENT,
  `dia_turno` VARCHAR(60) NULL,
  `hora_inicio_turno` TIME NULL,
  `hora_fin_turno` TIME NULL,
  `nombre_turno` VARCHAR(50) NULL,
  PRIMARY KEY (`idturno`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`transaccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`transaccion` (
  `idtransaccion` INT NOT NULL AUTO_INCREMENT,
  `fechaPago` DATE NULL,
  `monto` INT NULL,
  `descuento` VARCHAR(5) NULL,
  `devolucion` INT NULL,
  `meses_pagados` VARCHAR(100) NULL,
  `comprobante` VARCHAR(100) NULL,
  `tipo_de_pago` INT NULL,
  `cliente_idcliente` INT NOT NULL,
  `operador` INT NULL,
  PRIMARY KEY (`idtransaccion`),
  INDEX `fk_transaccion_cliente1_idx` (`cliente_idcliente` ASC)  ,
  CONSTRAINT `fk_transaccion_cliente1`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `mydb`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`convocatoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`convocatoria` (
  `idConvocatoria` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NOT NULL,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  `descripcion_convocatoria` VARCHAR(100) NULL,
  `pago_mensual` INT NOT NULL,
  `multa_mensual` INT NOT NULL,
  `numero_cupos` INT NOT NULL,
  `estado_convocatoria` INT NULL,
  `pdf_convocatoria` VARCHAR(100) NULL,
  `fecha_inicio_gestion` DATE NULL,
  `fecha_fin_gestion` DATE NULL,
  PRIMARY KEY (`idConvocatoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`zonaEstacionamiento_has_convocatoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`zonaEstacionamiento_has_convocatoria` (
  `zonaEstacionamiento_idzonaEstacionamiento` INT NOT NULL,
  `convocatoria_idconvocatoria` INT NOT NULL,
  PRIMARY KEY (`zonaEstacionamiento_idzonaEstacionamiento`, `convocatoria_idconvocatoria`),
  INDEX `fk_zonaEstacionamiento_has_convocatoria_convocatoria1_idx` (`convocatoria_idconvocatoria` ASC)  ,
  INDEX `fk_zonaEstacionamiento_has_convocatoria_zonaEstacionamiento_idx` (`zonaEstacionamiento_idzonaEstacionamiento` ASC)  ,
  CONSTRAINT `fk_zonaEstacionamiento_has_convocatoria_zonaEstacionamiento1`
    FOREIGN KEY (`zonaEstacionamiento_idzonaEstacionamiento`)
    REFERENCES `mydb`.`zonaEstacionamiento` (`idzonaEstacionamiento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_zonaEstacionamiento_has_convocatoria_convocatoria1`
    FOREIGN KEY (`convocatoria_idconvocatoria`)
    REFERENCES `mydb`.`convocatoria` (`idConvocatoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`auto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`auto` (
  `idauto` INT NOT NULL AUTO_INCREMENT,
  `placa_auto` VARCHAR(8) NULL,
  `cliente_idcliente` INT NOT NULL,
  PRIMARY KEY (`idauto`),
  INDEX `fk_auto_cliente1_idx` (`cliente_idcliente` ASC)  ,
  CONSTRAINT `fk_auto_cliente1`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `mydb`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`turno_has_guardia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`turno_has_guardia` (
  `turno_idturno` INT NOT NULL,
  `guardia_idguardia` INT NOT NULL,
  PRIMARY KEY (`turno_idturno`, `guardia_idguardia`),
  INDEX `fk_turno_has_guardia_guardia1_idx` (`guardia_idguardia` ASC)  ,
  INDEX `fk_turno_has_guardia_turno1_idx` (`turno_idturno` ASC)  ,
  CONSTRAINT `fk_turno_has_guardia_turno1`
    FOREIGN KEY (`turno_idturno`)
    REFERENCES `mydb`.`turno` (`idturno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_turno_has_guardia_guardia1`
    FOREIGN KEY (`guardia_idguardia`)
    REFERENCES `mydb`.`guardia` (`idguardia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`gestion_deudas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`gestion_deudas` (
  `fecha_calculo` DATE NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`gestion_deudas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`bitacora` (
  `idbitacora` INT NOT NULL AUTO_INCREMENT,
  `tipo_operacion` varchar(20) DEFAULT NULL,
  `nombre_tabla` text DEFAULT NULL,
  `valores_antiguos` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `valores_nuevos` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idbitacora`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `mydb`.`administrador` (`idadministrador`, `nombre_administrador`, `telf_administrador`, `email_administrador`, `pass_administrador`) 
VALUES ('1111', 'Roberto Martinez', '7658978', 'robertito@gmail.com', '$2a$12$wvkeI37Moob1BsaQgZFK8.c0hUqKrdktSTraygTNz2hDI1SfeMdJ6');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
