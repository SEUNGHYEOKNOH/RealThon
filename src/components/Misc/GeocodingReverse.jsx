const fullAreasData = [
    {
        name: "서울특별시",
        lat_center: 37.5665, lng_center: 126.9780,
        lat_min: 37.42, lat_max: 37.71, lng_min: 126.73, lng_max: 127.27,
        cities: [
            { name: "종로구", lat_center: 37.5730, lng_center: 126.9794 },
            { name: "중구", lat_center: 37.5638, lng_center: 126.9975 },
            { name: "용산구", lat_center: 37.5325, lng_center: 126.9900 },
            { name: "성동구", lat_center: 37.5635, lng_center: 127.0364 },
            { name: "광진구", lat_center: 37.5385, lng_center: 127.0823 },
            { name: "동대문구", lat_center: 37.5744, lng_center: 127.0397 },
            { name: "중랑구", lat_center: 37.6063, lng_center: 127.0925 },
            { name: "성북구", lat_center: 37.5894, lng_center: 127.0167 },
            { name: "강북구", lat_center: 37.6396, lng_center: 127.0257 },
            { name: "도봉구", lat_center: 37.6688, lng_center: 127.0471 },
            { name: "노원구", lat_center: 37.6542, lng_center: 127.0568 },
            { name: "은평구", lat_center: 37.6027, lng_center: 126.9291 },
            { name: "서대문구", lat_center: 37.5791, lng_center: 126.9368 },
            { name: "마포구", lat_center: 37.5662, lng_center: 126.9015 },
            { name: "양천구", lat_center: 37.5170, lng_center: 126.8665 },
            { name: "강서구", lat_center: 37.5509, lng_center: 126.8495 },
            { name: "구로구", lat_center: 37.4954, lng_center: 126.8874 },
            { name: "금천구", lat_center: 37.4519, lng_center: 126.9020 },
            { name: "영등포구", lat_center: 37.5264, lng_center: 126.8963 },
            { name: "동작구", lat_center: 37.5124, lng_center: 126.9393 },
            { name: "관악구", lat_center: 37.4784, lng_center: 126.9515 },
            { name: "서초구", lat_center: 37.4837, lng_center: 127.0324 },
            { name: "강남구", lat_center: 37.5172, lng_center: 127.0473 },
            { name: "송파구", lat_center: 37.5145, lng_center: 127.1058 },
            { name: "강동구", lat_center: 37.5301, lng_center: 127.1238 },
        ],
    },
    {
        name: "부산광역시",
        lat_center: 35.1796, lng_center: 129.0756,
        lat_min: 34.8, lat_max: 35.4, lng_min: 128.7, lng_max: 129.3,
        cities: [
            { name: "중구", lat_center: 35.1064, lng_center: 129.0323 },
            { name: "서구", lat_center: 35.0979, lng_center: 129.0243 },
            { name: "동구", lat_center: 35.1293, lng_center: 129.0438 },
            { name: "영도구", lat_center: 35.0911, lng_center: 129.0683 },
            { name: "부산진구", lat_center: 35.1632, lng_center: 129.0529 },
            { name: "동래구", lat_center: 35.1968, lng_center: 129.0931 },
            { name: "남구", lat_center: 35.1365, lng_center: 129.0821 },
            { name: "북구", lat_center: 35.1983, lng_center: 128.9903 },
            { name: "해운대구", lat_center: 35.1631, lng_center: 129.1633 },
            { name: "사하구", lat_center: 35.1044, lng_center: 128.9749 },
            { name: "금정구", lat_center: 35.2432, lng_center: 129.0921 },
            { name: "강서구", lat_center: 35.2120, lng_center: 128.9802 },
            { name: "연제구", lat_center: 35.1762, lng_center: 129.0797 },
            { name: "수영구", lat_center: 35.1553, lng_center: 129.1129 },
            { name: "사상구", lat_center: 35.1524, lng_center: 128.9882 },
            { name: "기장군", lat_center: 35.2449, lng_center: 129.2223 },
        ]
    },
    {
        name: "대구광역시",
        lat_center: 35.8714, lng_center: 128.6014,
        lat_min: 35.6, lat_max: 36.1, lng_min: 128.3, lng_max: 128.8,
        cities: [
            { name: "중구", lat_center: 35.8693, lng_center: 128.6061 },
            { name: "동구", lat_center: 35.8869, lng_center: 128.6348 },
            { name: "서구", lat_center: 35.8719, lng_center: 128.5606 },
            { name: "남구", lat_center: 35.8459, lng_center: 128.5977 },
            { name: "북구", lat_center: 35.8859, lng_center: 128.5829 },
            { name: "수성구", lat_center: 35.8582, lng_center: 128.6307 },
            { name: "달서구", lat_center: 35.8294, lng_center: 128.5329 },
            { name: "달성군", lat_center: 35.7744, lng_center: 128.4314 },
        ]
    },
    {
        name: "인천광역시",
        lat_center: 37.4563, lng_center: 126.7052,
        lat_min: 37.0, lat_max: 37.9, lng_min: 126.0, lng_max: 127.0,
        cities: [
            { name: "중구", lat_center: 37.4737, lng_center: 126.6219 },
            { name: "동구", lat_center: 37.4735, lng_center: 126.6495 },
            { name: "미추홀구", lat_center: 37.4642, lng_center: 126.6545 },
            { name: "연수구", lat_center: 37.4098, lng_center: 126.6773 },
            { name: "남동구", lat_center: 37.4473, lng_center: 126.7303 },
            { name: "부평구", lat_center: 37.5091, lng_center: 126.7218 },
            { name: "계양구", lat_center: 37.5371, lng_center: 126.7377 },
            { name: "서구", lat_center: 37.5452, lng_center: 126.6402 },
            { name: "강화군", lat_center: 37.7471, lng_center: 126.4913 },
            { name: "옹진군", lat_center: 37.4443, lng_center: 126.3905 },
        ]
    },
    {
        name: "광주광역시",
        lat_center: 35.1595, lng_center: 126.8526,
        lat_min: 35.0, lat_max: 35.3, lng_min: 126.6, lng_max: 127.0,
        cities: [
            { name: "동구", lat_center: 35.1458, lng_center: 126.9234 },
            { name: "서구", lat_center: 35.1522, lng_center: 126.8903 },
            { name: "남구", lat_center: 35.1328, lng_center: 126.9031 },
            { name: "북구", lat_center: 35.1746, lng_center: 126.9131 },
            { name: "광산구", lat_center: 35.1396, lng_center: 126.7932 },
        ]
    },
    {
        name: "대전광역시",
        lat_center: 36.3504, lng_center: 127.3845,
        lat_min: 36.2, lat_max: 36.5, lng_min: 127.2, lng_max: 127.6,
        cities: [
            { name: "동구", lat_center: 36.3325, lng_center: 127.4442 },
            { name: "중구", lat_center: 36.3253, lng_center: 127.4223 },
            { name: "서구", lat_center: 36.3563, lng_center: 127.3848 },
            { name: "유성구", lat_center: 36.3614, lng_center: 127.3559 },
            { name: "대덕구", lat_center: 36.3761, lng_center: 127.4172 },
        ]
    },
    {
        name: "울산광역시",
        lat_center: 35.5396, lng_center: 129.3114,
        lat_min: 35.3, lat_max: 35.7, lng_min: 129.0, lng_max: 129.5,
        cities: [
            { name: "중구", lat_center: 35.5519, lng_center: 129.3369 },
            { name: "남구", lat_center: 35.5446, lng_center: 129.3142 },
            { name: "동구", lat_center: 35.5082, lng_center: 129.4241 },
            { name: "북구", lat_center: 35.5843, lng_center: 129.3491 },
            { name: "울주군", lat_center: 35.5212, lng_center: 129.2559 },
        ]
    },
    {
        name: "세종특별자치시",
        lat_center: 36.4801, lng_center: 127.2891,
        lat_min: 36.4, lat_max: 36.7, lng_min: 127.1, lng_max: 127.5,
    },
    {
        name: "경기도",
        lat_center: 37.4138, lng_center: 127.5183,
        lat_min: 36.9, lat_max: 38.3, lng_min: 126.6, lng_max: 128.0,
        cities: [
            { name: "수원시", lat_center: 37.2636, lng_center: 127.0286 },
            { name: "성남시", lat_center: 37.4200, lng_center: 127.1269 },
            { name: "의정부시", lat_center: 37.7384, lng_center: 127.0338 },
            { name: "안양시", lat_center: 37.3943, lng_center: 126.9568 },
            { name: "부천시", lat_center: 37.5034, lng_center: 126.7660 },
            { name: "광명시", lat_center: 37.4786, lng_center: 126.8646 },
            { name: "평택시", lat_center: 36.9924, lng_center: 127.1129 },
            { name: "동두천시", lat_center: 37.9036, lng_center: 127.0576 },
            { name: "안산시", lat_center: 37.3219, lng_center: 126.8309 },
            { name: "고양시", lat_center: 37.6584, lng_center: 126.8320 },
            { name: "과천시", lat_center: 37.4292, lng_center: 126.9875 },
            { name: "구리시", lat_center: 37.5943, lng_center: 127.1466 },
            { name: "남양주시", lat_center: 37.6360, lng_center: 127.2165 },
            { name: "오산시", lat_center: 37.1499, lng_center: 127.0775 },
            { name: "시흥시", lat_center: 37.3802, lng_center: 126.8028 },
            { name: "군포시", lat_center: 37.3616, lng_center: 126.9352 },
            { name: "의왕시", lat_center: 37.3449, lng_center: 126.9683 },
            { name: "하남시", lat_center: 37.5393, lng_center: 127.2152 },
            { name: "용인시", lat_center: 37.2411, lng_center: 127.1775 },
            { name: "파주시", lat_center: 37.7600, lng_center: 126.7799 },
            { name: "이천시", lat_center: 37.2796, lng_center: 127.4398 },
            { name: "안성시", lat_center: 37.0083, lng_center: 127.2797 },
            { name: "김포시", lat_center: 37.6153, lng_center: 126.7156 },
            { name: "화성시", lat_center: 37.1995, lng_center: 126.8315 },
            { name: "광주시", lat_center: 37.4296, lng_center: 127.2553 },
            { name: "양주시", lat_center: 37.7853, lng_center: 127.0458 },
            { name: "포천시", lat_center: 37.8949, lng_center: 127.2003 },
            { name: "여주시", lat_center: 37.2984, lng_center: 127.6372 },
            { name: "연천군", lat_center: 38.0964, lng_center: 127.0744 },
            { name: "가평군", lat_center: 37.8313, lng_center: 127.5096 },
            { name: "양평군", lat_center: 37.4916, lng_center: 127.4878 },
        ],
    },
    {
        name: "강원특별자치도",
        lat_center: 37.8228, lng_center: 128.1555,
        lat_min: 37.0, lat_max: 38.7, lng_min: 127.4, lng_max: 129.4,
        cities: [
            { name: "춘천시", lat_center: 37.8813, lng_center: 127.7298 },
            { name: "원주시", lat_center: 37.3422, lng_center: 127.9202 },
            { name: "강릉시", lat_center: 37.7519, lng_center: 128.8761 },
            { name: "동해시", lat_center: 37.5249, lng_center: 129.1143 },
            { name: "태백시", lat_center: 37.1633, lng_center: 128.9856 },
            { name: "속초시", lat_center: 38.2070, lng_center: 128.5912 },
            { name: "삼척시", lat_center: 37.4498, lng_center: 129.1653 },
            { name: "홍천군", lat_center: 37.6900, lng_center: 127.8850 },
            { name: "횡성군", lat_center: 37.4900, lng_center: 127.9861 },
            { name: "영월군", lat_center: 37.1843, lng_center: 128.4618 },
            { name: "평창군", lat_center: 37.3705, lng_center: 128.3914 },
            { name: "정선군", lat_center: 37.3822, lng_center: 128.6607 },
            { name: "철원군", lat_center: 38.1468, lng_center: 127.3134 },
            { name: "화천군", lat_center: 38.1065, lng_center: 127.7088 },
            { name: "양구군", lat_center: 38.1098, lng_center: 127.9902 },
            { name: "인제군", lat_center: 38.0699, lng_center: 128.1703 },
            { name: "고성군", lat_center: 38.3806, lng_center: 128.4678 },
            { name: "양양군", lat_center: 38.0754, lng_center: 128.6216 },
        ],
    },
    {
        name: "충청북도",
        lat_center: 36.6357, lng_center: 127.4913,
        lat_min: 36.0, lat_max: 37.2, lng_min: 127.2, lng_max: 128.4,
        cities: [
            { name: "청주시", lat_center: 36.6425, lng_center: 127.4891 },
            { name: "충주시", lat_center: 36.9712, lng_center: 127.9299 },
            { name: "제천시", lat_center: 37.1328, lng_center: 128.1922 },
            { name: "보은군", lat_center: 36.4883, lng_center: 127.7294 },
            { name: "옥천군", lat_center: 36.3059, lng_center: 127.5721 },
            { name: "영동군", lat_center: 36.1755, lng_center: 127.7836 },
            { name: "증평군", lat_center: 36.7849, lng_center: 127.5852 },
            { name: "진천군", lat_center: 36.8561, lng_center: 127.4428 },
            { name: "괴산군", lat_center: 36.8152, lng_center: 127.7865 },
            { name: "음성군", lat_center: 36.9361, lng_center: 127.6896 },
            { name: "단양군", lat_center: 36.9845, lng_center: 128.3667 },
        ],
    },
    {
        name: "충청남도",
        lat_center: 36.6587, lng_center: 126.6728,
        lat_min: 35.9, lat_max: 37.1, lng_min: 126.2, lng_max: 127.6,
        cities: [
            { name: "천안시", lat_center: 36.8151, lng_center: 127.1139 },
            { name: "공주시", lat_center: 36.4515, lng_center: 127.1294 },
            { name: "보령시", lat_center: 36.3342, lng_center: 126.6101 },
            { name: "아산시", lat_center: 36.7898, lng_center: 126.9996 },
            { name: "서산시", lat_center: 36.7800, lng_center: 126.4500 },
            { name: "논산시", lat_center: 36.2048, lng_center: 127.0858 },
            { name: "계룡시", lat_center: 36.2730, lng_center: 127.2492 },
            { name: "당진시", lat_center: 36.8932, lng_center: 126.6260 },
            { name: "금산군", lat_center: 36.1039, lng_center: 127.4892 },
            { name: "부여군", lat_center: 36.2793, lng_center: 126.9182 },
            { name: "서천군", lat_center: 36.0822, lng_center: 126.6908 },
            { name: "청양군", lat_center: 36.4593, lng_center: 126.8028 },
            { name: "홍성군", lat_center: 36.6001, lng_center: 126.6625 },
            { name: "예산군", lat_center: 36.6802, lng_center: 126.8450 },
            { name: "태안군", lat_center: 36.7451, lng_center: 126.2995 },
        ],
    },
    {
        name: "전라북도",
        lat_center: 35.8203, lng_center: 127.1088,
        lat_min: 35.3, lat_max: 36.3, lng_min: 126.5, lng_max: 128.0,
        cities: [
            { name: "전주시", lat_center: 35.8242, lng_center: 127.1480 },
            { name: "군산시", lat_center: 35.9676, lng_center: 126.7371 },
            { name: "익산시", lat_center: 35.9477, lng_center: 126.9576 },
            { name: "정읍시", lat_center: 35.5701, lng_center: 126.8562 },
            { name: "남원시", lat_center: 35.4093, lng_center: 127.3881 },
            { name: "김제시", lat_center: 35.8016, lng_center: 126.8836 },
            { name: "완주군", lat_center: 35.9184, lng_center: 127.1517 },
            { name: "진안군", lat_center: 35.7922, lng_center: 127.4288 },
            { name: "무주군", lat_center: 36.0076, lng_center: 127.6606 },
            { name: "장수군", lat_center: 35.6483, lng_center: 127.5213 },
            { name: "임실군", lat_center: 35.6173, lng_center: 127.2847 },
            { name: "순창군", lat_center: 35.3740, lng_center: 127.1381 },
            { name: "고창군", lat_center: 35.4348, lng_center: 126.7029 },
            { name: "부안군", lat_center: 35.7297, lng_center: 126.7320 },
        ],
    },
    {
        name: "전라남도",
        lat_center: 34.8660, lng_center: 126.9910,
        lat_min: 34.2, lat_max: 35.6, lng_min: 125.4, lng_max: 128.0,
        cities: [
            { name: "목포시", lat_center: 34.8118, lng_center: 126.3916 },
            { name: "여수시", lat_center: 34.7604, lng_center: 127.6622 },
            { name: "순천시", lat_center: 34.9507, lng_center: 127.4875 },
            { name: "나주시", lat_center: 35.0322, lng_center: 126.7145 },
            { name: "광양시", lat_center: 34.9405, lng_center: 127.6958 },
            { name: "담양군", lat_center: 35.3218, lng_center: 126.9858 },
            { name: "곡성군", lat_center: 35.2842, lng_center: 127.2922 },
            { name: "구례군", lat_center: 35.2071, lng_center: 127.4628 },
            { name: "고흥군", lat_center: 34.6053, lng_center: 127.2762 },
            { name: "보성군", lat_center: 34.7709, lng_center: 127.0805 },
            { name: "화순군", lat_center: 35.0605, lng_center: 126.9852 },
            { name: "장흥군", lat_center: 34.6815, lng_center: 126.9042 },
            { name: "강진군", lat_center: 34.6420, lng_center: 126.7702 },
            { name: "해남군", lat_center: 34.5731, lng_center: 126.5995 },
            { name: "영암군", lat_center: 34.8000, lng_center: 126.6946 },
            { name: "무안군", lat_center: 34.9902, lng_center: 126.4817 },
            { name: "함평군", lat_center: 35.0655, lng_center: 126.5165 },
            { name: "영광군", lat_center: 35.2774, lng_center: 126.5121 },
            { name: "장성군", lat_center: 35.3015, lng_center: 126.7820 },
            { name: "완도군", lat_center: 34.3082, lng_center: 126.7554 },
            { name: "진도군", lat_center: 34.4862, lng_center: 126.2635 },
            { name: "신안군", lat_center: 34.8322, lng_center: 126.1119 },
        ],
    },
    {
        name: "경상북도",
        lat_center: 36.4919, lng_center: 128.8889,
        lat_min: 35.5, lat_max: 37.1, lng_min: 127.8, lng_max: 131.0,
        cities: [
            { name: "포항시", lat_center: 36.0191, lng_center: 129.3434 },
            { name: "경주시", lat_center: 35.8562, lng_center: 129.2242 },
            { name: "김천시", lat_center: 36.1396, lng_center: 128.1136 },
            { name: "안동시", lat_center: 36.5653, lng_center: 128.7294 },
            { name: "구미시", lat_center: 36.1193, lng_center: 128.3445 },
            { name: "영주시", lat_center: 36.8063, lng_center: 128.6231 },
            { name: "영천시", lat_center: 35.9723, lng_center: 128.9386 },
            { name: "상주시", lat_center: 36.4100, lng_center: 128.1593 },
            { name: "문경시", lat_center: 36.5937, lng_center: 128.1994 },
            { name: "경산시", lat_center: 35.8242, lng_center: 128.7424 },
            { name: "군위군", lat_center: 36.2425, lng_center: 128.5728 },
            { name: "의성군", lat_center: 36.3534, lng_center: 128.6974 },
            { name: "청송군", lat_center: 36.4344, lng_center: 129.0583 },
            { name: "영양군", lat_center: 36.6693, lng_center: 129.1136 },
            { name: "영덕군", lat_center: 36.4153, lng_center: 129.3653 },
            { name: "청도군", lat_center: 35.6473, lng_center: 128.7340 },
            { name: "고령군", lat_center: 35.7327, lng_center: 128.2612 },
            { name: "성주군", lat_center: 35.9189, lng_center: 128.2818 },
            { name: "칠곡군", lat_center: 35.9947, lng_center: 128.4023 },
            { name: "예천군", lat_center: 36.6543, lng_center: 128.4522 },
            { name: "봉화군", lat_center: 36.8933, lng_center: 128.7360 },
            { name: "울진군", lat_center: 36.9932, lng_center: 129.4005 },
            { name: "울릉군", lat_center: 37.4851, lng_center: 130.9056 },
        ],
    },
    {
        name: "경상남도",
        lat_center: 35.4606, lng_center: 128.2132,
        lat_min: 34.6, lat_max: 35.8, lng_min: 127.5, lng_max: 129.3,
        cities: [
            { name: "창원시", lat_center: 35.2283, lng_center: 128.6811 },
            { name: "진주시", lat_center: 35.1803, lng_center: 128.1075 },
            { name: "통영시", lat_center: 34.8553, lng_center: 128.4332 },
            { name: "사천시", lat_center: 35.0933, lng_center: 128.0642 },
            { name: "김해시", lat_center: 35.2341, lng_center: 128.8814 },
            { name: "밀양시", lat_center: 35.5034, lng_center: 128.7441 },
            { name: "거제시", lat_center: 34.8803, lng_center: 128.6215 },
            { name: "양산시", lat_center: 35.3371, lng_center: 129.0411 },
            { name: "의령군", lat_center: 35.3217, lng_center: 128.2589 },
            { name: "함안군", lat_center: 35.2753, lng_center: 128.4065 },
            { name: "창녕군", lat_center: 35.5447, lng_center: 128.4916 },
            { name: "고성군", lat_center: 34.9757, lng_center: 128.3228 },
            { name: "남해군", lat_center: 34.8364, lng_center: 127.8926 },
            { name: "하동군", lat_center: 35.0674, lng_center: 127.7516 },
            { name: "산청군", lat_center: 35.4147, lng_center: 127.8741 },
            { name: "함양군", lat_center: 35.5205, lng_center: 127.7252 },
            { name: "거창군", lat_center: 35.6874, lng_center: 127.9096 },
            { name: "합천군", lat_center: 35.5661, lng_center: 128.1698 },
        ],
    },
    {
        name: "제주특별자치도",
        lat_center: 33.4996, lng_center: 126.5312,
        lat_min: 33.1, lat_max: 33.6, lng_min: 126.1, lng_max: 127.0,
        cities: [
            { name: "제주시", lat_center: 33.4996, lng_center: 126.5312 },
            { name: "서귀포시", lat_center: 33.2543, lng_center: 126.5601 },
        ],
    },
];


// 유클리드 거리 계산 함수 (동일)
function getDistance(lat1, lng1, lat2, lng2) {
  // 간단한 휴리스틱에선 경도에 따른 거리 왜곡 무시하고 유클리드 거리를 사용
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2));
}

// 메인 휴리스틱 함수 (시/군 단위까지 탐색)
function GeocodingReverse(lat, lng) {
    let foundProvince = null;

    // lat lng 둘 다 0 일 경우 선택된 지역이 없습니다 리턴
    if (lat === 0 && lng === 0) {
        return "선택된 지역이 없습니다";
    }

    // 1단계: '도' 또는 '광역시' 찾기
    // 1-1. 경계값 기준으로 먼저 검사
    for (const area of fullAreasData) {
        if (
            lat >= area.lat_min &&
            lat <= area.lat_max &&
            lng >= area.lng_min &&
            lng <= area.lng_max
        ) {
            foundProvince = area;
            break;
        }
    }

    // 1-2. 경계에 포함되지 않을 경우, 중심 좌표가 가장 가까운 지역 선택
    if (!foundProvince) {
        let minDist = Infinity;
        for (const area of fullAreasData) {
            const dist = getDistance(lat, lng, area.lat_center, area.lng_center);
            if (dist < minDist) {
                minDist = dist;
                foundProvince = area;
            }
        }
    }
    
    // 광역시/특별자치시이거나, '도'에 속한 city 정보가 없으면 '도/광역시' 이름만 반환할 수도 있지만,
    // 하위 구/군을 찾기 위해 계속 진행
    if (!foundProvince.cities || foundProvince.cities.length === 0) {
        return foundProvince.name; // 하위 지역 데이터가 없으면 상위 지역명만 반환
    }

    // 2단계: 찾은 지역 내에서 '시/군/구' 찾기
    let foundCity = null;
    let minCityDist = Infinity;

    for (const city of foundProvince.cities) {
        // 경계값 데이터가 모든 시/군/구에 있지는 않으므로 중심점 거리 계산만 사용
        const dist = getDistance(lat, lng, city.lat_center, city.lng_center);
        if (dist < minCityDist) {
            minCityDist = dist;
            foundCity = city;
        }
    }

    // '도/광역시' 이름과 '시/군/구' 이름을 조합하여 반환
    return `${foundProvince.name} ${foundCity.name}`;
}

export default GeocodingReverse;
export { fullAreasData }; // 전체 지역 데이터도 내보내기