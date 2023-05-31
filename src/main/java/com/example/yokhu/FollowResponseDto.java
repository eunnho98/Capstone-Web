package com.example.yokhu;


import lombok.*;

@NoArgsConstructor
@Getter
@ToString
@Setter
public class FollowResponseDto {
    private Long userId;
    private String nickname;

    public FollowResponseDto( Long userId, String nickname) {
        this.userId = userId;
        this.nickname = nickname;
    }

}
