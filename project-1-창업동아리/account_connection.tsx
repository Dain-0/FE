function normalizeProvider(value?: string): string | null {
    const provider = value?.trim().toLowerCase() ?? "";
    if (provider.includes("kakao")) return "kakao";
    if (provider.includes("naver")) return "naver";
    if (provider.includes("google") || provider.includes("firebase")) return "google";
    if (provider.includes("apple")) return "apple";
    return null;
}

export default function AccountConnection() {
    const router = useRouter();
    const { profile, user } = useAuthSession();
    const primaryProvider = normalizeProvider(profile?.provider);
    const accountData: Record<string, AccountInfo> = Object.fromEntries(
        providers.map((provider) => [provider.id, {
            connected: provider.id === primaryProvider,
            email: provider.id === primaryProvider ? (profile?.email || user?.email || "") : "",
            isMain: provider.id === primaryProvider,
        }]),
    );

    return (
        <View className= "flex-1 bg-white" >
        <View className="h-[56px] flex-row items-center justify-center border-b border-[#EEEEEE]" >
            <Pressable onPress={ () => goBackOr(router, "/profile") } accessibilityLabel = "뒤로 가기" className = "absolute left-4 h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6]" >
                <ChevronLeft size={ 21 } color = "#262626" />
                    </Pressable>
                    < Text className = "text-[16px] font-extrabold text-[#171717]" > 계정 연결 </Text>
                        </View>

                        < ScrollView showsVerticalScrollIndicator = { false} contentContainerStyle = {{ flexGrow: 1, paddingBottom: 32 }
}>
    <View className="px-5 pt-6" >
        <Text className="text-[20px] font-extrabold leading-[28px] tracking-[-0.5px] text-[#171717]" > 로그인에 쓸 계정을 연결해요 </Text>
            < Text className = "mt-1 text-[12px] leading-[18px] text-[#777777]" > 어느 계정으로 들어와도 같은 기록을 볼 수 있어요 </Text>
                </View>

                < View className = "gap-3 px-5 pt-5" >
                {
                    providers.map((provider) => {
                        const account = accountData[provider.id];
                        const action = account.isMain ? ACTION_STYLES.main : ACTION_STYLES.unavailable;
                        const subText = account.connected || account.isMain ? account.email : "연결되지 않음";
                        return (
                            <View key= { provider.id } className = "min-h-[72px] flex-row items-center rounded-[16px] border border-[#E5E5E5] bg-white px-4 py-[14px]" >
                                <View className={ `mr-3 h-[44px] w-[44px] items-center justify-center rounded-full ${provider.iconColor}` }>
                                    <Text className={ `text-[17px] font-extrabold ${provider.iconTextColor}` }> { provider.initial } </Text>
                                        </View>
                                        < View className = "min-w-0 flex-1 justify-center" >
                                            <Text className="text-[15px] font-bold leading-[22px] text-[#171717]" > { provider.name } </Text>
                        { !!subText && <Text className="mt-[2px] text-[12px] leading-[17px] text-[#777777]" > { subText } </Text> }
                        </View>
                            < Pressable disabled accessibilityRole = "button" accessibilityLabel = { account.isMain ? `${provider.name} 주 계정` : `${provider.name} 계정 연결 준비 중` } className = {`ml-2 rounded-full px-3 py-[6px] ${action.buttonColor}`
                    }>
                    <Text className={`text-[12px] font-bold ${action.buttonTextColor}`} > { action.label } </Text>
                    </Pressable>
                    </View>
            );
          })}
</View>

    < View className = "flex-row items-start gap-2 px-5 pt-5" >
        <View className="mt-[2px] h-[14px] w-[14px] items-center justify-center rounded-full border border-[#888888]" >
            <Text className="text-[9px] font-bold leading-[11px] text-[#777777]" > i </Text>
                </View>
                < Text className = "flex-1 text-[12px] leading-[18px] text-[#666666]" > 주 계정은 해제할 수 없어요.다른 계정을 주 계정으로 바꾼 뒤 해제해 주세요 </Text>
                    </View>
                    </ScrollView>
                    </View>
  );
}
