package study.datajpa.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class MemberDto {

    private Long id;
    private String username;
    private String teamname;

    public MemberDto(Long id, String username, String teamname) {
        this.id = id;
        this.username = username;
        this.teamname = teamname;
    }
}
