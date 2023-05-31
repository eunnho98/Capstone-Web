package com.example.yokhu;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class FollowService {
    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    public ResponseEntity<?> follow(String username, Long userId){

        User me = userRepository.findByUsername(username).get(); //나
        User followedUser = userRepository.findById(userId).get(); //상대

        if(followRepository.existsFollowsByFollowedAndFollowing(me, followedUser) && followRepository.existsFollowsByFollowedAndFollowing(followedUser, me)){
            return ResponseEntity.badRequest().build();
        }else{
            Follow follow = new Follow(me,followedUser);
            Follow follow1 = new Follow(followedUser, me); //양방향이다.
            followRepository.save(follow); //우선 내가 그 친구를 저장하고
            followRepository.save(follow1); //그 친구도 나를 추가해야한다.
        }
        return ResponseEntity.ok().build(); //ok

    }


    public List<FollowResponseDto> followingList(Principal principal){

        User me = null;
        if(principal != null){
            me = userRepository.findByUsername(principal.getName()).get();
        }
        List<Follow> lists = followRepository.findAllByFollowingId(me.getId());
        List<FollowResponseDto>  followResponseDtos = new ArrayList<>();

        for(Follow i : lists){
            FollowResponseDto followResponseDto = new FollowResponseDto(userRepository.findById(i.getFollowed().getId()).get().getId() , userRepository.findById(i.getFollowed().getId()).get().getNickname());
            followResponseDtos.add(followResponseDto);
        }
        return followResponseDtos;

    }

}
