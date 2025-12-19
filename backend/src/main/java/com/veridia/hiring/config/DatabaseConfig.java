package com.veridia.hiring.config;

import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    DataSourceAutoConfiguration.class,
    // HibernateJpaAutoConfiguration.class - Disabled to prevent startup connection
})
public class DatabaseConfig {
    // Custom database configuration will be handled separately
}
