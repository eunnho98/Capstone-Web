package com.example.yokhu;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Setter
public class UserDto {
    private String nickname;


    private String username;

    private String email;

}