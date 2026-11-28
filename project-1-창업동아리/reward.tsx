import { Pressable, ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

//색
    const COLORS = {
        bg: "#FFFFFF",
        headerBorder: "#F0F2F5",

        title: "#121217",       // 제목 / 섹션 제목
        body: "#5E5D5D",        // 회색 설명
        label: "#8A8F99",       // "이번 시즌 내 보상" 같은 작은 라벨

        accent: "#155DFC",      // 파란 포인트 (금액 · 화살표)
        accentSoft: "#EAF2FE",  // 내 순위 강조 행 배경
        badgeBlueBg: "#EAF2FE",
        badgeBlueText: "#1773EB",
        badgeGrayBg: "#F4F5F7",
        badgeGrayText: "#5E5D5D",

        myRankBadgeBg: "#1773EB",
        myRankBadgeText: "#FFFFFF",

        rowBorder: "#F0F2F5",
        infoText: "#8A8F99",

        btnTo: "#429DFF",
        btnFrom: "#1573F5",
        btnText: "#FFFFFF",
    };

    const STYLES = {
        sectionTitle: "text-[17px] font-bold",
        rowText: "text-[18px] font-bold",
        rowValue: "text-[18px] font-bold",
        btnShadow: {
            shadowColor: "#1773EB",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 5,
        },
    };


    // 개인 리그 보상표
    const PERSONAL_REWARDS = [
        { rank: "1위", reward: "10,000P" },
        { rank: "2위", reward: "5,000P" },
        { rank: "3위", reward: "3,000P" },
        { rank: "4 ~ 10위", reward: "1,000P" },
        { rank: "11 ~ 100위", reward: "500P" },
    ];

    // 소속 리그 보상표
    const TEAM_REWARDS = [{ rank: "1위 소속의 구성원", reward: "각 300P" }];

    const INFO_TEXT =
        "보상은 결과가 나온 뒤 30일 안에 받을 수 있고, 지나면 자동으로 지급돼요";


    function Badge({ text, tone }: { text: string; tone: "blue" | "gray" }) {
        const bg = tone === "blue" ? COLORS.badgeBlueBg : COLORS.badgeGrayBg;
        const color = tone === "blue" ? COLORS.badgeBlueText : COLORS.badgeGrayText;
        return (
            <View className= "rounded-full px-3 py-1" style = {{ backgroundColor: bg }
    }>
        <Text className="text-[12px] font-semibold" style = {{ color }
}>
{ text }
    </Text>
    </View>
    );
}

function RewardRow({
    rank,
    reward,
    myRank,
}: {
    rank: string;
    reward: string;
    myRank?: boolean;
}) {
    return (
        <View
            className= "flex-row items-center justify-between rounded-[14px] px-4 py-4"
    style = {{ backgroundColor: myRank ? COLORS.accentSoft : "transparent" }
}
        >
    <View className="flex-row items-center" >
        <Text className={ STYLES.rowText } style = {{ color: COLORS.title }}>
        { rank }
            </Text>
{
    myRank && (
        <View
                        className="ml-2 rounded-full px-2 py-[2px]"
    style = {{ backgroundColor: COLORS.myRankBadgeBg }
}
                    >
    <Text
                            className="text-[11px] font-bold"
style = {{ color: COLORS.myRankBadgeText }}
                        >
    내 순위
        </Text>
        </View>
                )}
</View>
    < Text className = { STYLES.rowValue } style = {{ color: COLORS.accent }}>
    { reward }
        </Text>
        </View>
    );
}

function SectionTitle({ children }: { children: string }) {
    return (
        <Text className= { STYLES.sectionTitle } style = {{ color: COLORS.title }
}>
{ children }
    </Text>
    );
}

export default function LeagueRewardsScreen() {
    const handleClaim = () => {
        // TODO: 보상 받기 API 연결
    };

    return (
        <SafeAreaView className= "flex-1" edges = { ["top"]} style = {{ backgroundColor: COLORS.bg }
}>
{/* 헤더 */ }
    < View
className = "h-[59px] flex-row items-center border-b px-6 py-4"
style = {{ borderColor: COLORS.headerBorder }}
            >
    <Pressable onPress={ () => router.back() } hitSlop = { 10} >
        <Image
                        source={ require("../../../../assets/back.png") }
style = {{ width: 24, height: 24 }}
resizeMode = "contain"
    />
    </Pressable>
    < Text className = "ml-2 text-[18px] font-bold" style = {{ color: COLORS.title }}>
        리그 보상
            </Text>
            </View>

            < ScrollView
className = "flex-1"
contentContainerClassName = "gap-7 px-6 pb-40 pt-6"
showsVerticalScrollIndicator = { false}
    >
{/* 이번 시즌 내 보상 (API 데이터가 없으면 "-" 로 표시) */ }
    < View className = "gap-3" >
        <Text className="text-[13px]" style = {{ color: COLORS.label }}>
        { MY_REWARD.label }
            </Text>
            < View className = "flex-row items-end" >
                <Text className="text-[34px] font-extrabold" style = {{ color: COLORS.title }}>
                { MY_REWARD.point ?? "-" }
                    </Text>
                    < Text
className = "ml-1 pb-[6px] text-[25px] font-bold"
style = {{ color: COLORS.accent }}
                        >
    P
    </Text>
    </View>
    < View className = "flex-row gap-2" >
    {
        MY_REWARD.badges.map((b) => (
            <Badge key= { b.text } text = { b.text } tone = { b.tone } />
                        ))
    }
        </View>
        </View>

{/* 개인 리그 */ }
<View className="gap-1" >
    <SectionTitle>개인 리그 </SectionTitle>
        < View className = "mt-1" >
        {
            PERSONAL_REWARDS.map((r) => (
                <RewardRow key= { r.rank } { ...r } myRank = { r.rank === MY_RANK } />
                        ))
        }
            </View>
            </View>

{/* 소속 리그 */ }
<View className="gap-1" >
    <SectionTitle>소속 리그 </SectionTitle>
        < View className = "mt-1" >
        {
            TEAM_REWARDS.map((r) => (
                <RewardRow key= { r.rank } { ...r } />
                        ))
        }
            </View>
            </View>

{/* 안내 문구 */ }
<View className="flex-row items-start" >
    <Text className="mr-1 text-[13px]" style = {{ color: COLORS.infoText }}>
                        ⓘ
</Text>
    < Text
className = "flex-1 text-[13px] leading-[20px]"
style = {{ color: COLORS.infoText }}
                    >
{ INFO_TEXT }
    </Text>
    </View>
    </ScrollView>

{/* 하단 고정 보상 받기 버튼 */ }
<View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-3" style = {{ backgroundColor: COLORS.bg }}>
    <Pressable
                    onPress={ handleClaim }
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
        보상 받기
            </Text>
            </LinearGradient>
            </Pressable>
            </View>
            </SafeAreaView>
    );
}