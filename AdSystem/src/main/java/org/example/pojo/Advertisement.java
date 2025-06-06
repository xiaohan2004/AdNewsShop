package org.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Advertisement {
    private Integer id;
    private String title;
    private String content;
    private String adType;
    private String imageUrl;
    private Integer advertiserId;
    private Integer requesttimes;
    private Integer clicktimes;
}
