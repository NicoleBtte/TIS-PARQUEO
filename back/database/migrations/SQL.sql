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
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`administrador` (
  `idadministrador` INT NOT NULL,
  `nombre_administrador` VARCHAR(50) NULL,
  `telf_administrador` VARCHAR(12) NULL,
  `email_administrador` VARCHAR(35) NULL,
  `pass_administrador` VARCHAR(12) NULL,
  PRIMARY KEY (`idadministrador`),
  UNIQUE INDEX `idadministrador_UNIQUE` (`idadministrador` ASC)  ,
  UNIQUE INDEX `email_administrador_UNIQUE` (`email_administrador` ASC)  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`parqueo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`parqueo` (
  `idparqueo` INT NOT NULL AUTO_INCREMENT,
  `nombre_parqueo` VARCHAR(15) NULL,
  `administrador_idadministrador` INT NOT NULL,
  `mapa` BLOB NULL,
  PRIMARY KEY (`idparqueo`),
  INDEX `fk_parqueo_administrador1_idx` (`administrador_idadministrador` ASC)  ,
  UNIQUE INDEX `idparqueo_UNIQUE` (`idparqueo` ASC)  ,
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
  `descripcion` VARCHAR(100) NULL,
  `numero_de_sitios` INT NOT NULL,
  PRIMARY KEY (`idzonaEstacionamiento`),
  INDEX `fk_zonaEstacionamiento_parqueo1_idx` (`parqueo_idparqueo` ASC)  ,
  UNIQUE INDEX `idzonaEstacionamiento_UNIQUE` (`idzonaEstacionamiento` ASC)  ,
  CONSTRAINT `fk_zonaEstacionamiento_parqueo1`
    FOREIGN KEY (`parqueo_idparqueo`)
    REFERENCES `mydb`.`parqueo` (`idparqueo`)
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
  `zonaEstacionamiento_idzonaEstacionamiento` INT NOT NULL,
  `pass_guardia` VARCHAR(12) NULL,
  PRIMARY KEY (`idguardia`),
  INDEX `fk_guardia_zonaEstacionamiento1_idx` (`zonaEstacionamiento_idzonaEstacionamiento` ASC)  ,
  UNIQUE INDEX `idguardia_UNIQUE` (`idguardia` ASC)  ,
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
  `estado_convocatoria_pago` TINYINT NULL,
  `monto_a_pagar` DOUBLE NULL,
  `fecha_pagado` DATE NULL,
  `fecha_lim_pago` DATE NULL,
  `telf_cliente` VARCHAR(15) NULL,
  `email_cliente` VARCHAR(35) NULL,
  `password` VARCHAR(12) NULL,
  `apellidos_cliente` VARCHAR(45) NULL,
  `direccion_cliente` VARCHAR(45) NULL,
  `unidad_trabajo` VARCHAR(20) NULL,
  `cargo_cliente` VARCHAR(45) NULL,
  PRIMARY KEY (`idcliente`),
  UNIQUE INDEX `email_cliente_UNIQUE` (`email_cliente` ASC)  ,
  UNIQUE INDEX `id_cliente_UNIQUE` (`idcliente` ASC)  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`historial_entradas_salidas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`historial_entradas_salidas` (
  `idhistorial` INT NOT NULL AUTO_INCREMENT,
  `hora_ingreso_hist` TIME NULL,
  `hora_salida_hist` TIME NULL,
  `cliente_id_cliente` INT NOT NULL,
  `fecha_ingreso` DATE NULL,
  `fecha_salida` DATE NULL,
  PRIMARY KEY (`idhistorial`),
  INDEX `fk_historial_entradas_salidas_cliente1_idx` (`cliente_id_cliente` ASC)  ,
  CONSTRAINT `fk_historial_entradas_salidas_cliente1`
    FOREIGN KEY (`cliente_id_cliente`)
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
  `pass_operador` VARCHAR(12) NULL,
  `parqueo_idparqueo` INT NOT NULL,
  PRIMARY KEY (`idoperador`),
  INDEX `fk_operador_parqueo1_idx` (`parqueo_idparqueo` ASC)  ,
  UNIQUE INDEX `idoperador_UNIQUE` (`idoperador` ASC)  ,
  UNIQUE INDEX `email_operador_UNIQUE` (`email_operador` ASC)  ,
  CONSTRAINT `fk_operador_parqueo1`
    FOREIGN KEY (`parqueo_idparqueo`)
    REFERENCES `mydb`.`parqueo` (`idparqueo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`reporte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`reporte` (
  `idreporte` INT NOT NULL,
  `ingreso_mes` FLOAT NULL,
  `mes` DATE NULL,
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
  `zonaEstacionamiento_idzonaEstacionamiento` INT NOT NULL,
  `numero` INT NULL,
  `cliente_idcliente` INT NULL,
  PRIMARY KEY (`idsitio`),
  INDEX `fk_parqueo_zonaEstacionamiento_idx` (`zonaEstacionamiento_idzonaEstacionamiento` ASC)  ,
  UNIQUE INDEX `idsitio_UNIQUE` (`idsitio` ASC)  ,
  INDEX `fk_sitio_cliente1_idx` (`cliente_idcliente` ASC)  ,
  CONSTRAINT `fk_parqueo_zonaEstacionamiento`
    FOREIGN KEY (`zonaEstacionamiento_idzonaEstacionamiento`)
    REFERENCES `mydb`.`zonaEstacionamiento` (`idzonaEstacionamiento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sitio_cliente1`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `mydb`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`notificaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`notificaciones` (
  `idnotificaciones` INT NOT NULL AUTO_INCREMENT,
  `emisor_notif` VARCHAR(50) NULL,
  `receptor_notif` VARCHAR(50) NULL,
  `mensaje_notif` VARCHAR(145) NULL,
  `administrador_idadministrador` INT   ,
  `cliente_idcliente` INT NOT NULL,
  PRIMARY KEY (`idnotificaciones`),
  INDEX `fk_notificaciones_administrador1_idx` (`administrador_idadministrador` ASC)  ,
  INDEX `fk_notificaciones_cliente1_idx` (`cliente_idcliente` ASC)  ,
  UNIQUE INDEX `idnotificaciones_UNIQUE` (`idnotificaciones` ASC)  ,
  CONSTRAINT `fk_notificaciones_administrador1`
    FOREIGN KEY (`administrador_idadministrador`)
    REFERENCES `mydb`.`administrador` (`idadministrador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_notificaciones_cliente1`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `mydb`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`turno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`turno` (
  `idturno` INT NOT NULL,
  `dia_turno` VARCHAR(9) NOT NULL,
  `hora_inicio_turno` TIME NOT NULL,
  `hora_fin_turno` TIME NOT NULL,
  `nombre_turno` VARCHAR(15) NOT NULL,
  `guardia_idguardia` INT NOT NULL,
  PRIMARY KEY (`idturno`),
  INDEX `fk_turno_guardia1_idx` (`guardia_idguardia` ASC)  ,
  CONSTRAINT `fk_turno_guardia1`
    FOREIGN KEY (`guardia_idguardia`)
    REFERENCES `mydb`.`guardia` (`idguardia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`transaccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`transaccion` (
  `idtransaccion` INT NOT NULL AUTO_INCREMENT,
  `fecha_pago_mes` DATE NULL,
  `fecha_lim_pago` DATE NULL,
  `multa` DOUBLE NULL,
  `estado_convocatoria_pago` TINYINT NULL,
  `monto_a_pagar` DOUBLE NULL,
  `cliente_idcliente` INT NOT NULL,
  `reporte_idreporte` INT NOT NULL,
  `tipo_tran` VARCHAR(25) NULL,
  PRIMARY KEY (`idtransaccion`),
  INDEX `fk_transaccion_cliente1_idx` (`cliente_idcliente` ASC)  ,
  INDEX `fk_transaccion_reporte1_idx` (`reporte_idreporte` ASC)  ,
  UNIQUE INDEX `idtransaccion_UNIQUE` (`idtransaccion` ASC)  ,
  CONSTRAINT `fk_transaccion_cliente1`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `mydb`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaccion_reporte1`
    FOREIGN KEY (`reporte_idreporte`)
    REFERENCES `mydb`.`reporte` (`idreporte`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`convocatoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`convocatoria` (
  `idconvocatoria` INT NOT NULL AUTO_INCREMENT,
  `titulo_convocatoria` VARCHAR(45) NOT NULL,
  `fecha_inicio_convocatoria` DATE NOT NULL,
  `fecha_fin_convocatoria` DATE NULL,
  `descripcion_convocatoria` VARCHAR(1000) NULL,
  `fecha_pago` DATE NULL,
  PRIMARY KEY (`idconvocatoria`),
  UNIQUE INDEX `idconvocatoria_UNIQUE` (`idconvocatoria` ASC)  )
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
    REFERENCES `mydb`.`convocatoria` (`idconvocatoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`auto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`auto` (
  `idauto` INT NOT NULL,
  `placa_auto` VARCHAR(8) NULL,
  `cliente_id_cliente` INT NOT NULL,
  PRIMARY KEY (`idauto`),
  INDEX `fk_auto_cliente1_idx` (`cliente_id_cliente` ASC)  ,
  CONSTRAINT `fk_auto_cliente1`
    FOREIGN KEY (`cliente_id_cliente`)
    REFERENCES `mydb`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
