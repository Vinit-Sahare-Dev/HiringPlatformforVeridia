package com.veridia.hiring.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.lang.NonNull;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Configuration
public class RetryDatabaseConfig {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        
        // Connection pool settings
        dataSource.setConnectionTimeout(60000);
        dataSource.setMaximumPoolSize(5);
        dataSource.setMinimumIdle(2);
        dataSource.setIdleTimeout(300000);
        dataSource.setMaxLifetime(1200000);
        dataSource.setValidationTimeout(5000);
        dataSource.setConnectionTestQuery("SELECT 1");
        dataSource.setAutoCommit(false);
        
        // Allow initialization to fail if database is not ready
        dataSource.setInitializationFailTimeout(-1);
        
        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(@NonNull DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean
    public DatabaseConnectionChecker databaseConnectionChecker(@NonNull DataSource dataSource) {
        return new DatabaseConnectionChecker(dataSource);
    }
}

class DatabaseConnectionChecker {
    private final DataSource dataSource;

    public DatabaseConnectionChecker(@NonNull DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public boolean isDatabaseAvailable() {
        try (Connection connection = dataSource.getConnection()) {
            return connection.isValid(5);
        } catch (SQLException e) {
            return false;
        }
    }

    public void waitForDatabase(int maxRetries, long delayMillis) throws InterruptedException {
        int attempts = 0;
        while (attempts < maxRetries) {
            if (isDatabaseAvailable()) {
                return;
            }
            attempts++;
            Thread.sleep(delayMillis);
        }
        throw new RuntimeException("Database not available after " + maxRetries + " attempts");
    }
}
