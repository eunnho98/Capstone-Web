package com.example.yokhu;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne
    private User following;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne
    private User followed;

    @Builder
    public Follow(User following, User followed){
        this.following = following;
        this.followed = followed;
    }
}
