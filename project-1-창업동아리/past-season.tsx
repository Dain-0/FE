import { Image, ImageSourcePropType, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";

export default function PastSeasons() {
    return <PendingFeatureScreen capability="league-past-seasons" />;
    //색
    const COLORS = {
        bg: "#FFFFFF",
        headerBorder: "#F0F2F5",

        title: "#121217",       // 제목 / 큰 글자 / 시즌 이름
        body: "#5E5D5D",        // 시즌 카드 안 회색 설명 (수익률 · 인원)
        label: "#8A8F99",       // "최고 기록" "참가 시즌" 같은 작은 라벨, 안내 문구

        accent: "#155DFC",      // 순위 숫자 파란색 (예: 3위)
        noRank: "#9A9A9A",      // "순위 없음" 회색 글자
        cardBorder: "#E5E7EB",  // 카드 테두리
        chevron: "#9E9E9E",     // 오른쪽 화살표

        tagBg: "#FFF1E3",       // "최고 기록" 태그 배경
        tagText: "#F97316",     // "최고 기록" 태그 글자
    };
    function StatCard({ label, value }: { label: string; value: string }) {
        return (
            <View
            className= "flex-1 rounded-[16px] border px-4 py-4"
        style = {{ borderColor: COLORS.cardBorder }
    }
        >
        <Text className="text-[12px]" style = {{ color: COLORS.label }
}>
{ label }
    </Text>
    < Text className = "mt-2 text-[20px] font-extrabold" style = {{ color: COLORS.title }}>
    { value }
        </Text>
        </View>
    );
}

function SeasonCard({ item, onPress }: { item: SeasonRecord; onPress: () => void }) {
    const hasRank = item.rank !== null;

    return (
        <Pressable
            onPress= { onPress }
    className = "flex-row items-center rounded-[20px] border px-5 py-4"
    style = {{ borderColor: COLORS.cardBorder }
}
        >
{/* 왼쪽: 시즌 이름 + 설명 */ }
    < View className = "flex-1" >
        <View className="flex-row items-center" >
            <Text className="text-[16px] font-extrabold" style = {{ color: COLORS.title }}>
            { item.title }
                </Text>
{
    item.isBest && (
        <View
                            className="ml-2 rounded-[6px] px-2 py-[2px]"
    style = {{ backgroundColor: COLORS.tagBg }
}
                        >
    <Text className="text-[10px] font-bold" style = {{ color: COLORS.tagText }}>
        최고 기록
            </Text>
            </View>
                    )}
</View>
    < Text className = "mt-1 text-[12px]" style = {{ color: COLORS.body }}>
    { item.summary }
        </Text>
        </View>

{/* 오른쪽: 순위 + 보상 */ }
<View className="items-end" >
    <Text
                    className="text-[17px] font-extrabold"
style = {{ color: hasRank ? COLORS.accent : COLORS.noRank }}
                >
    { hasRank? `${item.rank}위` : "순위 없음"}
</Text>
    < Text className = "mt-1 text-[12px]" style = {{ color: hasRank ? COLORS.body : COLORS.noRank }}>
    { item.reward ? `${item.reward}P` : "보상 없음" }
        </Text>
        </View>

        < ChevronRight size = { 16} color = { COLORS.chevron } strokeWidth = { 1.8} style = {{ marginLeft: 8 }} />
            </Pressable>
    );
}

//화면
export default function PastSeasonsScreen() {
    // 시즌 카드를 눌렀을 때
    const handleSeasonPress = (id: string) => {
        // TODO: 그 시즌의 결과 화면으로 이동 (예: router.push(`/league/season/${id}`))
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
        지난 시즌
            </Text>
            </View>

            < ScrollView
className = "flex-1"
contentContainerClassName = "gap-6 px-6 pb-10 pt-6"
showsVerticalScrollIndicator = { false}
    >
{/* 최고 기록 + 마스코트 */ }
    < View className = "flex-row items-center justify-between" >
        <View>
        <Text className="text-[13px] font-semibold" style = {{ color: COLORS.label }}>
            최고 기록
                </Text>
                < View className = "mt-1 flex-row items-end" >
                    <Text className="text-[40px] font-extrabold" style = {{ color: COLORS.title }}>
                    { BEST_RECORD.rank !== null ? `${BEST_RECORD.rank}위` : "-" }
                        </Text>
{
    BEST_RECORD.season ? (
        <Text
                                    className= "ml-2 pb-[8px] text-[13px]"
                                    style = {{ color: COLORS.body }
}
                                >
{ BEST_RECORD.season }
    </Text>
                            ) : null}
</View>
    </View>

{
    MASCOT_IMAGE ? (
        <Image
                            source= { MASCOT_IMAGE }
                            style = {{ width: 100, height: 100 }
}
resizeMode = "contain"
    />
                    ) : null}
</View>

{/* 요약 카드 */ }
<View className="flex-row gap-3" >
    <StatCard
                        label="참가 시즌"
value = { SUMMARY.joinedCount !== null ? `${SUMMARY.joinedCount}회` : "-" }
    />
    <StatCard
                        label="누적 보상"
value = { SUMMARY.totalReward ? `${SUMMARY.totalReward}P` : "-" }
    />
    </View>

{/* 시즌별 기록 */ }
<View className="gap-3" >
    <Text className="text-[17px] font-bold" style = {{ color: COLORS.title }}>
        시즌별 기록
            </Text>
{
    SEASONS.map((item) => (
        <SeasonCard
                            key= { item.id }
                            item = { item }
                            onPress = {() => handleSeasonPress(item.id)}
                        />
                    ))}
</View>

{/* 안내 문구 */ }
<View className="flex-row items-start" >
    <Text className="mr-1 text-[13px]" style = {{ color: COLORS.label }}>
                        ⓘ
</Text>
    < Text className = "flex-1 text-[13px] leading-[20px]" style = {{ color: COLORS.label }}>
    { INFO_TEXT }
        </Text>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}