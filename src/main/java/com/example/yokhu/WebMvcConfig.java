package com.example.yokhu;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry) { //CORS 정책 추가.
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") //김은호 주소
                .allowedHeaders("authorization", "authorization-refresh", "User-Agent", "Cache-Control", "Content-Type")
                .exposedHeaders("authorization", "authorization-refresh", "User-Agent", "Cache-Control", "Content-Type")
                .allowedMethods("*");
//                .allowCredentials(true);
    }

}
