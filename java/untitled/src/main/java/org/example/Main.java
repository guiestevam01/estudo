package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        System.out.println("Iniciando aplicação e tentando conectar de forma segura...");

        // O bloco try-with-resources garante o fechamento automático da conexão
        try (Connection conexao = ConnectionFactory.getConnection()) {
            if (conexao != null && !conexao.isClosed()) {
                System.out.println("Conexão profissional realizada com sucesso!");
            }
        } catch (SQLException e) {
            System.err.println("Falha crítica na conexão com o banco de dados: " + e.getMessage());
            // Em produção, aqui usaríamos um Logger (como Log4j ou Logback) em vez de printStackTrace
        }
    }
}

