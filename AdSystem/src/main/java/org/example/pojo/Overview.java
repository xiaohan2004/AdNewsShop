package org.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Overview {
        private int totalAds;
        private int totalAdRequests;
        private int totalAdClicks;
        private int totalAdvertisers;
        private int totalUsers;
        private int totalOperators;
        private int totalOperatorRequests;
        private int totalOperatorAdds;
        private int totalOperatorClicks;
        private int totalOperations;
        private double avgOperationTime;
        private int uniqueOperators;
        private String mostCommonAdType;
        private String mostPopularInterest;
}
