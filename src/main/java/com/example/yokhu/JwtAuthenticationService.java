package com.example.yokhu;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Service
public class JwtAuthenticationService {

    private final JwtTokenProvider jwtTokenProvider;


    private final RedisService redisService;

    public ResponseEntity<Void> reissue(String accessToken, String refreshToken, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException, ServletException, ServletException {


        String getAccessToken = jwtTokenProvider.extractAccessToken(accessToken).orElse(null);
        String getRefreshToken = jwtTokenProvider.extractRefreshTokenFromCookie(httpServletRequest);

        //refresh 토큰이 없고, 유요하지 않은 refresh 토큰이 왔다면 요청을 거부한다.
        if (refreshToken != null && !jwtTokenProvider.validateToken(getRefreshToken)) {
            HttpHeaders httpHeaders = new HttpHeaders();
            try {
                String username = jwtTokenProvider.getUsername(accessToken);
            } catch (ExpiredJwtException e) {
                log.info("엑세스 토큰이 만료됨"); //만료 에러.
            } catch (SecurityException | IllegalArgumentException | JwtException e) {
                log.info("유효하지 않은 엑세스 토큰"); //유효하지 않은 예외.
            }
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE); //그냥 반환 4xx
        } else if (getAccessToken != null && jwtTokenProvider.validateToken(getRefreshToken)) {
            //refresh 토큰이 있고, 유효한 토큰이라면 정상적으로 요청을 처리한다.
            String username = jwtTokenProvider.getUsername(getRefreshToken);

            String redisRefreshToken = redisService.getData(username);
            if (!getRefreshToken.equals(redisRefreshToken)) { //Redis에 저장된 Refresh토큰이 존재하지 않을 때.
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE); //4xx
            }
            if (jwtTokenProvider.validateToken(getAccessToken)) { //만일 유효한 엑세스토큰이라면 블랙리스트로 지정.
                Long expiration = jwtTokenProvider.getExpireTime(getAccessToken);
                redisService.setBlackListToken(getAccessToken, "BLACKLIST_ACCESSTOKEN_" + username, expiration); //엑세스 토큰 블랙리스트 저장
            }

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("authorization", jwtTokenProvider.createAccessToken(username)); //새로운 토큰 재발급
            String newRefrsehToken = jwtTokenProvider.createRefreshToken(username);
                Cookie cookie = new Cookie("authorization-refresh", newRefrsehToken);
                cookie.setMaxAge(14 * 24 * 60 * 60); //2주
//                cookie.setHttpOnly(true);
                cookie.setPath("/");
                httpServletResponse.addCookie(cookie);

            redisService.setDataWithExpiration(username, newRefrsehToken, 2 * 604800L);

            return new ResponseEntity<>(httpHeaders, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }


    public void logout(String accessToken, HttpServletResponse httpServletResponse) throws IOException {

        String getAccessToken = jwtTokenProvider.extractAccessToken(accessToken).orElse(null);

        String username = jwtTokenProvider.getUsername(getAccessToken);

        Cookie cookie = new Cookie("authorization-refresh", null);
        //로그아웃 요청에 따라 기존 쿠키에 담겨있던 refresh token의 값을 null로 둔다.
        cookie.setMaxAge(0);
        //나이는 0으로 둠으로써 더이상 유효하지 않도록 설정
//        cookie.setHttpOnly(true);
        cookie.setPath("/");
        httpServletResponse.addCookie(cookie);
        //수정된 쿠키를 삽입


        redisService.deleteValues(username); //레디스에 저장된 refreshToken 삭제

        Long expiration = jwtTokenProvider.getExpireTime(getAccessToken);
        //블랙리스트에 기존에 발급한 access token을 블랙리스트에 넣어서 더이상 사용하지 못하도록 설정
        redisService.setBlackListToken(getAccessToken, "BLACKLIST_ACCESSTOKEN_" + username, expiration); //엑세스 토큰 블랙리스트 저장
    }
}
