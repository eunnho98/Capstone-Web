package com.example.yokhu;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {


        String exceptionInfo = (String) request.getAttribute("exception");

        //JwtAuthenticationFilter에서 전달받은 예외 내용
        if (exceptionInfo != null) {
            log.info(exceptionInfo.toString());
            setException(response, exceptionInfo);
        }
        //PreAuthorize 어노테이션에 의한 예외
        else if (authException instanceof InsufficientAuthenticationException) {
            exceptionInfo = "InsufficientAuthenticationException";
            setException(response, exceptionInfo);
        }
    }

    private void setException(HttpServletResponse response, String exceptionInfo) throws IOException {
        if (exceptionInfo.equals("UsernameNotFoundException")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        } else if (exceptionInfo.equals("ExpiredJwtException")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        } else if (exceptionInfo.equals("AccessJwtException")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        } else if( exceptionInfo.equals("InsufficientAuthenticationException")){
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }
    }



}
