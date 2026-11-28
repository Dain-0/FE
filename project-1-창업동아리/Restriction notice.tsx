import { Image, ImageSourcePropType, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Info } from "lucide-react-native";

/* ──────────────────────────────────────────────
 * 1. 색 / 스타일 (여기 값만 바꾸면 화면 색이 바뀌어요)
 * ────────────────────────────────────────────── */
const COLORS = {
    bg: "#FFFFFF",
    headerBorder: "#F0F2F5",

    title: "#121217",       // 제목 / 카드 안 값(오른쪽 글자)
    body: "#5E5D5D",        // 회색 설명 / "커뮤니티 운영 정책 보기" 글자
    label: "#8A8F99",       // 카드 안 항목 이름(왼쪽 글자), 안내 문구

    accent: "#1773EB",      // "풀리는 날" 파란 글자색

    cardBorder: "#E5E7EB",  // 정보 카드 테두리
    divider: "#F0F2F5",     // 정보 카드 안 구분선

    btnFrom: "#1573F5",     // 하단 버튼 위쪽 색
    btnTo: "#429DFF",       // 하단 버튼 아래쪽 색
    btnText: "#FFFFFF",     // 하단 버튼 글자색
};

const STYLES = {
    btnShadow: {
        shadowColor: "#1773EB",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 5,
    },
};

/* ──────────────────────────────────────────────
 * 2. 열쇠 이미지 (왼쪽 위 아이콘)
 * ────────────────────────────────────────────── */
// 이미지 경로를 넣으면 나타나요. (지금은 비어 있어요)
const LOCK_IMAGE: ImageSourcePropType | null = require("../../assets/row.png");


/* ──────────────────────────────────────────────
 * 3. 내용 데이터 — 전부 API 연결 전이라 비어 있어요
 *    나중에 API 응답을 아래 값에 넣으면 화면에 나타납니다
 *    (null 이면 그 부분은 "-" 로 보이거나 안 보여요)
 * ────────────────────────────────────────────── */
const RESTRICTION: {
    title: string | "커뮤니티 글쓰기가\n7일 동안 제한됐어요";
    subtitle: string | "학습과 모의투자, 리그는 그대로 쓸 수 있어요";
    reason: string | null;      // 사유.  예: "특정 종목 매수 권유"
    period: string | null;      // 기간.  예: "9. 21 ~ 9. 28"
    releaseAt: string | null;   // 풀리는 날.  예: "9. 28 오후 3:00"
    totalCount: string | null;  // 누적.  예: "1회 · 3회면 영구 제한"
    notice: string | "잘못된 조치라고 생각하면 7일 안에 이의를 신청할 수 있어요. 결과는 알림으로 알려드려요"
} = {
    title: "커뮤니티 글쓰기가\n7일 동안 제한됐어요",       // TODO: API
    subtitle: "학습과 모의투자, 리그는 그대로 쓸 수 있어요",    // TODO: API
    reason: null,      // TODO: API
    period: null,      // TODO: API
    releaseAt: null,   // TODO: API
    totalCount: null,  // TODO: API
    notice: "잘못된 조치라고 생각하면 7일 안에 이의를 신청할 수 있어요. 결과는 알림으로 알려드려요",      // TODO: API
};

/* ──────────────────────────────────────────────
 * 4. 작은 조립 블록
 * ────────────────────────────────────────────── */
function InfoRow({
    label,
    value,
    valueColor,
}: {
    label: string;
    value: string;
    valueColor?: string;
}) {
    return (
        <View className= "h-[52px] flex-row items-center justify-between" >
        <Text className="text-[14px]" style = {{ color: COLORS.label }
}>
{ label }
    </Text>
    < Text className = "text-[15px] font-extrabold" style = {{ color: valueColor ?? COLORS.title }}>
    { value }
        </Text>
        </View>
    );
}

/* ──────────────────────────────────────────────
 * 5. 화면
 * ────────────────────────────────────────────── */
export default function RestrictionNoticeScreen() {
    // 이의 신청
    const handleAppeal = () => {
        // TODO: 이의 신청 API 연결 (또는 이의 신청 화면으로 이동)
    };

    // 커뮤니티 운영 정책 보기 → 이용정책 페이지로 이동
    // (약관 및 정책 페이지 주소 /my/terms 로 연결해 뒀어요. 다른 페이지라면 이 주소만 바꾸세요)
    const handleViewPolicy = () => {
        router.push("/my/terms" as never);
    };

    return (
        <SafeAreaView className= "flex-1" edges = { ["top"]} style = {{ backgroundColor: COLORS.bg }
}>
{/* 헤더 */ }
    < View
className = "h-[59px] flex-row items-center border-b px-6 py-4"
style = {{ borderColor: COLORS.headerBorder }}
            >
    <Pressable accessibilityLabel="뒤로 가기" onPress = {() => router.back()} hitSlop = { 10} >
        <Image
                        source={ require("../../assets/back.png") }
style = {{ width: 24, height: 24 }}
resizeMode = "contain"
    />
    </Pressable>
    < Text className = "ml-2 text-[18px] font-bold" style = {{ color: COLORS.title }}>
        이용 제한 안내
            </Text>
            </View>

            < ScrollView
className = "flex-1"
contentContainerClassName = "px-5 pb-52 pt-6"
showsVerticalScrollIndicator = { false}
    >
{/* 열쇠 이미지 */ }
{
    LOCK_IMAGE ? (
        <Image
                        source= { LOCK_IMAGE }
                        style = {{ width: 64, height: 64 }
}
resizeMode = "contain"
    />
                ) : null}

{/* 제목 + 설명 */ }
{
    RESTRICTION.title ? (
        <Text
                        className= "mt-6 text-[24px] font-extrabold leading-[32px]"
                        style = {{ color: COLORS.title }
}
                    >
{ RESTRICTION.title }
    </Text>
                ) : null}
{
    RESTRICTION.subtitle ? (
        <Text className= "mt-2 text-[13px]" style = {{ color: COLORS.body }
}>
{ RESTRICTION.subtitle }
    </Text>
                ) : null}

{/* 정보 카드 */ }
<View
                    className="mt-6 rounded-[24px] border px-5"
style = {{ borderColor: COLORS.cardBorder }}
                >
    <InfoRow label="사유" value = { RESTRICTION.reason ?? "-" } />
        <View style={ { height: 1, backgroundColor: COLORS.divider } } />
            < InfoRow label = "기간" value = { RESTRICTION.period ?? "-" } />
                <View style={ { height: 1, backgroundColor: COLORS.divider } } />
                    < InfoRow
label = "풀리는 날"
value = { RESTRICTION.releaseAt ?? "-" }
valueColor = { RESTRICTION.releaseAt ? COLORS.accent : undefined }
    />
    <View style={ { height: 1, backgroundColor: COLORS.divider } } />
        < InfoRow label = "누적" value = { RESTRICTION.totalCount ?? "-" } />
            </View>

{/* 안내 문구 (API 데이터가 있을 때만 표시) */ }
{
    RESTRICTION.notice ? (
        <View className= "mt-5 flex-row items-start px-1" >
        <Info size={ 14 } color = { COLORS.label } strokeWidth = { 2} style = {{ marginTop: 3 }
} />
    < Text
className = "ml-2 flex-1 text-[12px] leading-[18px]"
style = {{ color: COLORS.label }}
                        >
{ RESTRICTION.notice }
    </Text>
    </View>
                ) : null}
</ScrollView>

{/* 하단 고정 버튼 */ }
<View
                className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-3"
style = {{ backgroundColor: COLORS.bg }}
            >
    <Pressable
                    onPress={ handleAppeal }
className = "rounded-[16px]"
style = {{ backgroundColor: COLORS.btnTo, ...STYLES.btnShadow }}
                >
    <LinearGradient
                        colors={ [COLORS.btnFrom, COLORS.btnTo] }   // 위 → 아래 색
start = {{ x: 0, y: 0 }}                    // 시작 위치 (왼쪽 위)
end = {{ x: 0, y: 1 }}                      // 끝 위치 (아래). 대각선이면 x: 1, y: 1
style = {{
    height: 54,
        alignItems: "center",
            justifyContent: "center",
                borderRadius: 16,
                        }}
                    >
    <Text className="text-[16px] font-bold" style = {{ color: COLORS.btnText }}>
        이의 신청
            </Text>
            </LinearGradient>
            </Pressable>

            < Pressable onPress = { handleViewPolicy } hitSlop = { 8} className = "mt-4 items-center" >
                <Text className="text-[14px] font-bold" style = {{ color: COLORS.body }}>
                    커뮤니티 운영 정책 보기
                        </Text>
                        </Pressable>
                        </View>
                        </SafeAreaView>
    );
}