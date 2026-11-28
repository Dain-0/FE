import { Pressable, ScrollView, Text, View, Image, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

//스타일
const COLORS = {
    bg: "#FFFFFF",
    headerBorder: "#F0F2F5",

    title: "#121217",       // 큰 제목 / 섹션 제목
    body: "#5E5D5D",        // 설명 본문 회색
    bodyStrong: "#121217",  // 값(오른쪽 굵은 텍스트)

    formulaDescription: "#5E5D5D",
    tieBreaker: "#0D0D0D",

    accent: "#155DFC",      // 파란 포인트 (번호 · 체크 · 화살표)
    accentSoft: "#EEF5FF",  // 파란 번호 배경

    navyBox: "#0A1C3F",     // 수익률 공식 다크 박스
    navyText: "#FFFFFF",    // 다크 박스 안 흰 글씨
    navySub: "#A6CCFB",     // 다크 박스 안 연한 글씨

    card: "#FFFFFF",
    cardBorder: "#EEF0F3",  // 시즌 카드 테두리
    rowBorder: "#F0F2F5",
};

const STYLES = {
    // 섹션 제목 (수익률로 순위를 정해요 등)
    sectionTitle: "text-[18px] font-bold",
    // 일반 설명 문단
    paragraph: "text-[14px] leading-[22px]",
    // 하단 다크 박스 그림자
    navyShadow: {
        shadowColor: "#1B2440",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 4,
    },
    {
    title: "제외 기준",
        description: "시즌 중 거래가 없으면 순위에서 빠져요",
            // 카드 그림자
            cardShadow: {
        shadowColor: "#000000",
            shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
            shadowRadius: 8,
                elevation: 2,
    },
};


const FORMULA = {
    expression: "(총자산 − 초기자본) ÷ 초기자본 × 100",
    note: "총자산 = 현금 + 보유 종목 평가금액 · 초기자본 1,000만원",
    description:
        "모두 같은 초기자본에서 출발하니까 얼마를 샀는지가 아니라 얼마나 잘 판단했는지로 겨뤄요.",
};



    function SectionTitle({ children }: { children: string }) {
        return (
            <SafeAreaView className= "flex-1 bg-white" edges = { ["top"]} >
                <View className="h-[59px] flex-row items-center border-b border-[#F0F2F5] px-6 py-4" >
                    <Pressable onPress={ () => router.back() } hitSlop = { 10} >
                        <Image
                        source={ require("../../../assets/back.png") }
        style = {{ width: 24, height: 24 }
    }
    resizeMode = "contain"
        />
        </Pressable>

        < Text className = "ml-2 text-[18px] font-bold text-[#121217]" > 리그 규칙 </Text>
            < Text className = { STYLES.sectionTitle } style = {{ color: COLORS.title }
}>
{ children }
    </Text>
    );
}

// 번호 매긴 줄 (1, 2 …)
function NumberedItem({ index, text }: { index: number; text: string }) {
    return (
        <View className= "flex-row items-start" >
        <View
                className="mr-3 h-[22px] w-[22px] items-center justify-center rounded-full"
    style = {{ backgroundColor: COLORS.accentSoft }
}
            >
    <Text className="text-[12px] font-bold" style = {{ color: COLORS.accent }}>
    { index }
        </Text>
        </View>
        < Text className = {`flex-1 ${STYLES.paragraph}`} style = {{ color: COLORS.tieBreaker }}>
        { text }
            </Text>
            </View>
    );
}

<ScrollView
                className="flex-1"
contentContainerClassName = "gap-6 px-4 pb-10 pt-6"
showsVerticalScrollIndicator = { false}
// 체크 표시 줄 (✓)
function CheckItem({ text }: { text: string }) {
    return (
        <View className= "flex-row items-start" >
        <Text className="mr-3 text-[14px] font-bold" style = {{ color: COLORS.accent }
}>
                ✓
</Text>
    < Text className = {`flex-1 ${STYLES.paragraph}`} style = {{ color: COLORS.tieBreaker }}>
    { text }
        </Text>
        </View>
    );
}

// 시즌 카드 한 줄 (라벨 ---- 값)
function SeasonRow({ label, value }: { label: string; value: string }) {
    return (
        <View
            className= "flex-row items-center justify-between rounded-[16px] border px-5 py-4"
    style = {{ borderColor: COLORS.cardBorder, backgroundColor: COLORS.card }
}
        >
    <Text className="text-[14px]" style = {{ color: COLORS.body }}>
    { label }
        </Text>
        < Text className = "text-[14px] font-bold" style = {{ color: COLORS.bodyStrong }}>
        { value }
            </Text>
            </View>
    );
}

//화면베너
export default function LeagueRulesScreen() {
    const handleRewardsPress = () => {
        if (!REWARDS_LINK) return; // 아직 링크 미연결
        if (REWARDS_LINK.startsWith("http")) {
            Linking.openURL(REWARDS_LINK);
        } else {
            router.push(REWARDS_LINK as any);
        }
    };

    return (
        <SafeAreaView className= "flex-1" edges = { ["top"]} style = {{ backgroundColor: COLORS.bg }
}>
{/* 헤더 */ }
    < View
className = "h-[59px] flex-row items-center border-b px-6 py-4"
style = {{ borderColor: COLORS.headerBorder }}
            >
{
    RULES.map((rule) => (
        <View
                        key= { rule.title }
                        className = "rounded-[24px] border-[0.8px] border-[#F3F3F3] bg-white p-5"
                        style = {{
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    }}
    < Pressable onPress = { () => router.back() } hitSlop = { 10} >
        <Image
                        source={ require("../../../assets/back.png") }
style = {{ width: 24, height: 24 }}
resizeMode = "contain"
    />
    </Pressable>
    < Text className = "ml-2 text-[18px] font-bold" style = {{ color: COLORS.title }}>
        리그 규칙
            </Text>
            </View>

            < ScrollView
className = "flex-1"
contentContainerClassName = "gap-8 px-6 pb-12 pt-6"
showsVerticalScrollIndicator = { false}
    >
{/* 1) 수익률로 순위를 정해요 */ }
    < View className = "gap-4" >
        <SectionTitle>수익률로 순위를 정해요 </SectionTitle>

            < View
className = "rounded-[20px] px-5 py-5"
style = {{ backgroundColor: COLORS.navyBox, ...STYLES.navyShadow }}
                    >
    <Text className="text-[16px] font-bold text-[#1773EB]" >
    { rule.title }
        </Text>

        < Text className = "mt-2 text-[14px] text-[#5E5D5D]" >
        { rule.description }
            </Text>
            </View>
                ))}
</ScrollView>
    </SafeAreaView>
    < Text className = "text-[16px] font-bold" style = {{ color: COLORS.navyText }}>
    { FORMULA.expression }
        </Text>
        < Text className = "mt-2 text-[12px]" style = {{ color: COLORS.navySub }}>
        { FORMULA.note }
            </Text>
            </View>

            < Text className = { STYLES.paragraph } style = {{ color: COLORS.formulaDescription }}>
            { FORMULA.description }
                </Text>
                </View>

{/* 2) 수익률이 같다면 */ }
<View className="gap-4" >
    <SectionTitle>수익률이 같다면 </SectionTitle>
        < View className = "gap-3" >
        {
            TIEBREAKERS.map((text, i) => (
                <NumberedItem key= { text } index = { i + 1} text = { text } />
                        ))}
</View>
    </View>

{/* 3) 참가 자격 */ }
<View className="gap-4" >
    <SectionTitle>참가 자격 </SectionTitle>
        < View className = "gap-3" >
        {
            ELIGIBILITY.map((text) => (
                <CheckItem key= { text } text = { text } />
                        ))
        }
            </View>
            </View>

{/* 4) 시즌 */ }
<View className="gap-4" >
    <SectionTitle>시즌 </SectionTitle>
    < View className = "gap-3" >
    {
        SEASON.map((row) => (
            <SeasonRow key= { row.label } label = { row.label } value = { row.value } />
                        ))
    }
        </View>
        </View>

{/* 5) 순위별 보상 보기 (나중에 링크만 연결) */ }
<Pressable
                    onPress={ handleRewardsPress }
className = "flex-row items-center justify-between rounded-[16px] border px-5 py-4"
style = {{ borderColor: COLORS.cardBorder, ...STYLES.cardShadow }}
                >
    <Text className="text-[15px] font-bold" style = {{ color: COLORS.title }}>
        순위별 보상 보기
            </Text>
            < Text className = "text-[18px]" style = {{ color: COLORS.accent }}>
                        ›
</Text>
    </Pressable>
    </ScrollView>
    </SafeAreaView>
    );
}
