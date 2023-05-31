package com.example.yokhu;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="USER_ID")
    private Long id;


    @OneToMany(mappedBy = "following")
    private List<Follow> followingList = new ArrayList<Follow>();

    //유저를 팔로우하는 유저리스트
    @OneToMany(mappedBy = "followed")
    private List<Follow> followList = new ArrayList<Follow>();
    @Builder
    public User(String username, String password){
        this.username = username;
        this.password = password;
    }

    private String nickname;
    private String username;

    private String password;


    private String email;

    public void setRequestFields (String email,
                                  String nickname, String username) {
        this.nickname = nickname;
        this.email = email;
        this.username = username;
        this.password = UUID.randomUUID().toString();
    }

    public void removeUserInformation () {
        this.nickname = null;
        this.password = "탈퇴한 유저";
        this.email = null;
        this.username = null;
    }




}