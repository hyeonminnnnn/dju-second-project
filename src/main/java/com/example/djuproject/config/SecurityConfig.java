package com.example.djuproject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()  // React에서는 이거 꺼야 POST 작동
                .authorizeRequests()
                .antMatchers("/api/**").permitAll()  // API는 인증 없이 허용
                .anyRequest().permitAll()
                .and()
                .httpBasic().disable()     // ✅ 이거 안 끄면 브라우저에서 로그인 팝업 뜸
                .formLogin().disable();    // ✅ 이거도 같이 꺼야 form login 창 안 뜸
    }
}