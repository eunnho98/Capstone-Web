package com.example.yokhu;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.text.ParseException;
import java.util.List;


@RequiredArgsConstructor
@RestController
@Slf4j
public class Controller {
    private final Oauth2LoginService oauth2LoginService;

    private final UserService userService;

    private final JwtAuthenticationService jwtAuthenticationService;
    private final FollowService followService;


    //엑세스 토큰을 가지고 있고, 현재 디비에 이사람이 저장되어 있고, 유요한 사용자라면 => 정상적인 요청을 받아드린다,
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/hellorest")
    public ResponseEntity<?> hello() {
        System.out.println("hello");
        return ResponseEntity.ok().body("hello");
    }


    @GetMapping("/login/oauth2/code/google")
    public ResponseEntity<?> googleCode(@RequestParam String code, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ParseException, org.json.simple.parser.ParseException, ServletException, IOException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders accessTokenHeaders = new HttpHeaders();
        accessTokenHeaders.add("Content-type", "application/x-www-form-urlencoded");

        MultiValueMap<String, String> accessTokenParams = new LinkedMultiValueMap<>();
        accessTokenParams.add("client_id", "759416534029-0idv1eac509hpu7h66na8bn4pug1k9ou.apps.googleusercontent.com");
        accessTokenParams.add("client_secret", "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");
        accessTokenParams.add("code", code);
        accessTokenParams.add("grant_type", "authorization_code");
        accessTokenParams.add("redirect_uri", "https://yokhuroute.store/login/oauth2/code/google");
        //accessTokenParams.add("redirect_uri", "http://localhost:8080/login/oauth2/code/google");

        HttpEntity<MultiValueMap<String, String>> accessTokenRequest = new HttpEntity<>(accessTokenParams, accessTokenHeaders);

        ResponseEntity<String> accessTokenResponse = restTemplate.exchange(
                "https://www.googleapis.com/oauth2/v4/token",
                HttpMethod.POST,
                accessTokenRequest,
                String.class
        );

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(accessTokenResponse.getBody());
        log.info(jsonObject.toJSONString());
        String accessToken = (String) jsonObject.get("access_token");
        String idToken = (String) jsonObject.get("id_token");
        ResponseEntity<String> GoogleUserinfo = oauth2LoginService.googleUserInfo(accessToken, idToken);
        return oauth2LoginService.googleLogin(GoogleUserinfo, httpServletRequest, httpServletResponse);
    }

    //회원탈퇴
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/oauth2/withdraw")
    public ResponseEntity<?> signOut(Principal principal) throws Exception {
        userService.withdraw(principal.getName());
        return ResponseEntity.ok().build();
    }

    //로그아웃
    @PreAuthorize("isAuthenticated()") //토큰을 가지고 있는 사용자인가? 즉, 인증된 사용자 인가를 판별
    @GetMapping("/oauth2/sign-out")
    public ResponseEntity<Void> logout(@RequestHeader(value = "authorization") String accessToken, HttpServletResponse httpServletResponse) throws IOException {
        jwtAuthenticationService.logout(accessToken, httpServletResponse);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/reissue") //토큰 재발행 부분.
    public ResponseEntity<Void> refreshTokenReissue(
            @RequestHeader(value = "authorization") String accessToken,
            @RequestHeader(value = "authorization-refresh", required = false) String refreshToken,
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse
    ) throws IOException, ServletException {

        ResponseEntity<Void> responseEntity = jwtAuthenticationService.reissue(accessToken, refreshToken, httpServletRequest, httpServletResponse);
        return responseEntity;
    }


    @PreAuthorize("isAuthenticated()")
    @PostMapping("/follow/{userId}")
    public ResponseEntity<?> followUser(Principal principal, @PathVariable Long userId) {
        return followService.follow(principal.getName(),userId);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/follow/following")
    public ResponseEntity<List<FollowResponseDto>> followingUserList (
            Principal principal) {
        return ResponseEntity.ok().body(followService.followingList(principal));
    }

}
