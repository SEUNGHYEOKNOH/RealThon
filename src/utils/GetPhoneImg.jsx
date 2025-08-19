
import IPhone14Image from '@/assets/phone/I14.png';
import IPhone13Image from '@/assets/phone/I13.png';
import SamsungS10Image from '@/assets/phone/S10.png';
import SamsungS20Image from '@/assets/phone/S20.png';
import GPixel8ProImage from '@/assets/phone/G8WB.png';
import GPixel8ProClayImage from '@/assets/phone/G8W.png';

import PhoneFrame from '@/assets/PhoneFrame.png';

export default function GetPhoneImg({ phoneModel }) {
    if (!phoneModel || phoneModel === undefined) {
        console.log(phoneModel)
        return PhoneFrame; // 기본 프레임 이미지 반환
    }
    let phoneModelSplit = phoneModel.split(" ");
    if (phoneModelSplit[0] === 'iPhone') {
        if (parseInt(phoneModelSplit[1] >= 14)) {
            return IPhone14Image
        } else {
            return IPhone13Image
        }
    } else if (phoneModelSplit[0] === 'Galaxy') {
        // 숫자만 추출
        if (parseInt(phoneModelSplit[1].match(/\d+/g)?.join('')) >= 24) {
            return SamsungS20Image
        } else {
            return SamsungS10Image
        }
    }
}
