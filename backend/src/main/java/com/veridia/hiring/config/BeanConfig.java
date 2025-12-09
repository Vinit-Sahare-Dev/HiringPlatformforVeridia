package com.veridia.hiring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Properties;

@Configuration
public class BeanConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(System.getenv().getOrDefault("MAIL_HOST", "localhost"));
        mailSender.setPort(Integer.parseInt(System.getenv().getOrDefault("MAIL_PORT", "587")));
        mailSender.setUsername(System.getenv().getOrDefault("MAIL_USERNAME", "test@example.com"));
        mailSender.setPassword(System.getenv().getOrDefault("MAIL_PASSWORD", "test"));
        
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", System.getenv().getOrDefault("MAIL_DEBUG", "false"));
        
        return mailSender;
    }
}
