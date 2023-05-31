package com.example.yokhu;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {



    boolean existsFollowsByFollowedAndFollowing(User followed, User following); //나와 이친구가 존재하는지 확인

//    void deleteByFollowedAndFollowing(User followed, User following);
//
//    boolean existsFollowsByFollowedIdAndFollowingId(Long followed, Long following);
//
//    void deleteAllByFollowing(User user);
//
//    void deleteAllByFollowed(User user);
//
//    boolean existsFollowsByFollowingIdAndFollowedId(Long followed, Long following);
    List<Follow> findAllByFollowingId(Long followed);





}
