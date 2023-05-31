package com.example.yokhu;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Service
public class Oauth2LoginService {

    private final UserService userService;
    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;


    private final RedisService redisService;


    public ResponseEntity<String> googleUserInfo(String accessToken, String idToken) {
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        headers.add("Authorization", "Bearer " + accessToken);
        ResponseEntity<String> GoogleUserinfo = null;
        try {
            HttpEntity profileRequest = new HttpEntity(headers);
            GoogleUserinfo = restTemplate.exchange(
                    "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken,
                    HttpMethod.GET,
                    profileRequest,
                    String.class
            );
        } catch (Exception e) {
            log.info(e.toString());
        }
        return GoogleUserinfo;
    }


    public ResponseEntity<?> googleLogin(ResponseEntity<String> GoogleUserinfo, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ParseException, ServletException, IOException {

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(GoogleUserinfo.getBody());
        log.info(jsonObject.toJSONString());
        UserDto dto = new UserDto();
        dto.setUsername(jsonObject.get("sub").toString() + "g");

        if (jsonObject.containsKey("email")) {
            dto.setEmail(jsonObject.get("email").toString());
        } else {
            log.info("유저 이메일을 불러올 수 없음");
            dto.setEmail(null);
        }
        if (jsonObject.containsKey("given_name")) {
            dto.setNickname(jsonObject.get("given_name").toString());
        } else {
            log.info("유저 이름을 불러올 수 없음");
            dto.setNickname(null);
        }
        if (!userRepository.existsByUsername(dto.getUsername())) {
            log.info("유저 정보가 없음");
            userService.signup(dto); //디비 저장
        } else {
            log.info("유저 정보가 있다.");
        }
        String accessToken = jwtTokenProvider.createAccessToken(dto.getUsername());
        String refreshToken = jwtTokenProvider.createRefreshToken(dto.getUsername());
        HttpHeaders httpHeaders = new HttpHeaders();


        httpHeaders.set("authorization", accessToken);
        Cookie cookie = new Cookie("authorization-refresh", refreshToken);
        cookie.setMaxAge(14 * 24 * 60 * 60); //2주
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        httpServletResponse.addCookie(cookie);


        redisService.setDataWithExpiration(dto.getUsername(), refreshToken, 2 * 604800L);

        return new ResponseEntity<UserDto>(dto, httpHeaders, HttpStatus.OK);
    }

}
