package org.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Advertisement {
    private Integer id;
    private String content;
    private String adType;
    private String imageUrl;
    private Integer advertiserId;
}
