const BASE_URL = 'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/';

export default function Icon({ type }){
    return (
        <img
            src={`${BASE_URL + type}.svg`}
            alt="icon"
            style={{
                width: 20,
                height: 20,
            }}
        />
    );
}