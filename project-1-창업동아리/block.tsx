import { useState } from "react";
import { Image, ImageSourcePropType, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Info } from "lucide-react-native";

//색
const COLORS = {
    bg: "#FFFFFF",
    headerBorder: "#F0F2F5",

    title: "#121217",         // 제목 / 사용자 이름
    body: "#6B6B6B",          // 회색 설명 (차단한 날)
    label: "#8A8F99",         // 하단 안내 문구, 아이콘
    emptySub: "#5E5D5D",      // 빈 상태 설명 글자색

    cardBorder: "#E5E7EB",    // 사용자 카드 테두리

    avatarFrom: "#1573F5",    // 동그란 프로필 색 (그라데이션 시작)
    avatarTo: "#429DFF",      // 동그란 프로필 색 (그라데이션 끝)
    avatarText: "#FFFFFF",    // 동그란 프로필 안 글자색

    unblockBg: "#F2F2F2",     // "차단 해제" 버튼 배경
    unblockText: "#4B5563",   // "차단 해제" 버튼 글자
};


const EMPTY_IMAGE: ImageSourcePropType | null = require("../../../../assets/logo-front.png");


type BlockedUser = {
    id: string;
    name: string;       // 예: "리딩방홍보"
    blockedAt: string;  // 예: "9. 12"
};

// 목록 아래 안내 문구 (차단한 사용자가 있을 때만)
const NOTICE = "차단하면 서로의 글과 댓글이 보이지 않아요. 신고와 달리 운영팀에 전달되지는 않아요";


function BlockedUserCard({
    user,
    onUnblock,
}: {
    user: BlockedUser;
    onUnblock: () => void;
}) {
    return (
        <View
            className= "flex-row items-center rounded-[20px] border px-4 py-4"
    style = {{ borderColor: COLORS.cardBorder }
}
        >
{/* 동그란 프로필 (이름 첫 글자) */ }
    < LinearGradient
colors = { [COLORS.avatarFrom, COLORS.avatarTo]}
start = {{ x: 0, y: 0 }}
end = {{ x: 1, y: 1 }}
style = {{
    width: 48,
        height: 48,
            borderRadius: 24,
                alignItems: "center",
                    justifyContent: "center",
                }}
            >
    <Text className="text-[18px] font-extrabold" style = {{ color: COLORS.avatarText }}>
    { user.name.charAt(0) }
        </Text>
        </LinearGradient>

{/* 이름 + 차단한 날 */ }
<View className="ml-3 flex-1" >
    <Text className="text-[16px] font-extrabold" style = {{ color: COLORS.title }}>
    { user.name }
        </Text>
        < Text className = "mt-[2px] text-[12px]" style = {{ color: COLORS.body }}>
            차단한 날 { user.blockedAt }
</Text>
    </View>

{/* 차단 해제 버튼 */ }
<Pressable
                onPress={ onUnblock }
accessibilityRole = "button"
className = "rounded-full px-3 py-[7px]"
style = {{ backgroundColor: COLORS.unblockBg }}
            >
    <Text className="text-[12px] font-bold" style = {{ color: COLORS.unblockText }}>
        차단 해제
            </Text>
            </Pressable>
            </View>
    );
}

//화면
export default function BlockedUsers() {
    // 차단한 사용자 목록 — API 연결 전이라 비어 있음
    // 나중에 API 응답을 setBlockedUsers(...)로 넣으면 카드가 자동으로 만들어짐
    // 목록이 비었거나, 불러오기에 실패했을 때(setBlockedUsers([]))는
    // "차단한 사용자가 없어요" 안내 화면이 보임
    const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);

    const isEmpty = blockedUsers.length === 0;

    // 차단 해제 버튼
    const handleUnblock = (id: string) => {
        // TODO: 차단 해제 API 연결
        //       성공하면 목록에서 빼기: setBlockedUsers((prev) => prev.filter((u) => u.id !== id));
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
                        source={ require("../../../../assets/back.png") }
style = {{ width: 24, height: 24 }}
resizeMode = "contain"
    />
  );
</Pressable>
    < Text className = "ml-2 text-[18px] font-bold" style = {{ color: COLORS.title }}>
        차단 관리
            </Text>
            </View>

{
    isEmpty ? (
        /* 차단한 사용자가 없거나 불러오지 못했을 때 */
        <View className= "flex-1 items-center px-4 pt-[80px]" >
        {
            EMPTY_IMAGE?(
                        <Image
                            source = { EMPTY_IMAGE }
                            style = {{ width: 96, height: 96 }}
                            resizeMode = "contain"
        />
                    ) : null
}
<Text className="mt-4 text-[18px] font-extrabold" style = {{ color: COLORS.title }}>
    차단한 사용자가 없어요
        </Text>
        < Text className = "mt-2 text-center text-[13px]" style = {{ color: COLORS.emptySub }}>
            게시글 더보기에서 사용자를 차단할 수 있어요
                </Text>
                </View>
            ) : (
    /* 차단한 사용자가 있을 때 */
    <ScrollView
                    className= "flex-1"
contentContainerClassName = "gap-3 px-4 pb-10 pt-5"
showsVerticalScrollIndicator = { false}
    >
    <Text className="mb-1 text-[18px] font-extrabold" style = {{ color: COLORS.title }}>
        차단한 사용자 { blockedUsers.length } 명
            </Text>

{
    blockedUsers.map((user) => (
        <BlockedUserCard
                            key= { user.id }
                            user = { user }
                            onUnblock = {() => handleUnblock(user.id)}
                        />
                    ))}

{/* 안내 문구 */ }
<View className="mt-2 flex-row items-start px-1" >
    <Info size={ 14 } color = { COLORS.label } strokeWidth = { 2} style = {{ marginTop: 3 }} />
        < Text
className = "ml-2 flex-1 text-[12px] leading-[18px]"
style = {{ color: COLORS.label }}
                        >
{ NOTICE }
    </Text>
    </View>
    </ScrollView>
            )}
</SafeAreaView>
    );
}