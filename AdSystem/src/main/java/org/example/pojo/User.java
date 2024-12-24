package org.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Integer id;
    private String cookie;
    private String browserFingerprint;
    private String pre1;
    private String pre2;
    private String pre3;
    private String pre4;
    private Integer interestGames;
    private Integer interestDigitalProducts;
    private Integer interestAutomotive;
    private Integer interestLifestyle;
    private Integer interestTravel;
    private Integer interestEntertainment;
    private Integer interestFood;
    private Integer interestFashion;
    private Integer interestHealth;
    private Integer interestSports;
}
