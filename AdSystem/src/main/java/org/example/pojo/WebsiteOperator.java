package org.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WebsiteOperator {
    private Integer id;
    private String username;
    private String password;
    private String websiteUrl;
    private String token;
    private Integer requesttimes;
    private Integer addtimes;
    private Integer clicktimes;
}

