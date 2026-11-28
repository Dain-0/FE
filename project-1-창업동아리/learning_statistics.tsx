// 퀴즈 기록 이동 핸들러
const handleWrongNotePress = () => {
    if (onGoToWrongNote) {
        onGoToWrongNote();
    } else {
        // 퀴즈 기록 화면으로 이동
        router.push('/(app)/study/wrong_answer_note');
    }
};

return (
    <View className= "flex-1 bg-white" >
    {/* 상단 헤더 */ }
    < View className = "h-[62px] flex-row items-center justify-center border-b border-[#E5E7EB] px-4 relative" >
        <Pressable
                    onPress={ onBack || (() => goBackOr(router, "/learn")) }
className = "absolute left-4 h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6]"
    >
    <Text className="text-lg font-bold text-[#4A5565]" >←</Text>
        </Pressable>
        < Text className = "text-[18px] font-extrabold text-[#262626]" > 학습 통계 </Text>
            </View>

            < ScrollView showsVerticalScrollIndicator = { false} contentContainerClassName = "p-4 pb-12 gap-6" >
            {/* 기간 선택 탭 (주간 / 월간 / 전체) */ }
                < View className = "flex-row bg-[#F3F4F6] p-1 rounded-2xl" >
                    <Pressable
                        onPress={ () => setPeriod('weekly') }
className = {`flex-1 py-2.5 rounded-xl items-center justify-center ${period === 'weekly' ? 'bg-white shadow-sm' : ''
    }`
}
                    >
    <Text className={ `text-[13px] font-bold ${period === 'weekly' ? 'text-[#111827]' : 'text-[#9CA3AF]'}` }>
        주간
        </Text>
        </Pressable>
        < Pressable
onPress = {() => setPeriod('monthly')}
className = {`flex-1 py-2.5 rounded-xl items-center justify-center ${period === 'monthly' ? 'bg-white shadow-sm' : ''
    }`}
                    >
    <Text className={ `text-[13px] font-bold ${period === 'monthly' ? 'text-[#111827]' : 'text-[#9CA3AF]'}` }>
        월간
        </Text>
        </Pressable>
        < Pressable
onPress = {() => setPeriod('total')}
className = {`flex-1 py-2.5 rounded-xl items-center justify-center ${period === 'total' ? 'bg-white shadow-sm' : ''
    }`}
                    >
    <Text className={ `text-[13px] font-bold ${period === 'total' ? 'text-[#111827]' : 'text-[#9CA3AF]'}` }>
        전체
        </Text>
        </Pressable>
        </View>

{/* 요약 카드 3종 */ }
<View className="flex-row gap-2.5" >
    <View className="flex-1 bg-white border border-[#E5E7EB] p-3.5 rounded-2xl" >
        <Text className="text-[12px] text-[#6B7280] font-medium mb-1" > 완료 사이클 </Text>
            < Text className = "text-[18px] font-black text-[#111827]" >
            { currentStats?.completedCycles !== undefined ? `${currentStats.completedCycles}회` : '-'}
</Text>
    </View>

    < View className = "flex-1 bg-white border border-[#E5E7EB] p-3.5 rounded-2xl" >
        <Text className="text-[12px] text-[#6B7280] font-medium mb-1" > 정답률 </Text>
            < Text className = "text-[18px] font-black text-[#155DFC]" >
            { currentStats?.accuracy !== undefined ? `${currentStats.accuracy}%` : '-'}
</Text>
    </View>

    < View className = "flex-1 bg-white border border-[#E5E7EB] p-3.5 rounded-2xl" >
        <Text className="text-[12px] text-[#6B7280] font-medium mb-1" > 학습 시간 </Text>
            < Text className = "text-[18px] font-black text-[#111827]" >
            { currentStats?.studyTimeMinutes !== undefined ? `${currentStats.studyTimeMinutes}분` : '-'}
</Text>
    </View>
    </View>

{/* 막대 차트 */ }
<View className="mt-2" >
    <Text className="text-[16px] font-extrabold text-[#111827] mb-6" >
    { getChartTitle() }
        </Text>

        < View className = "flex-row items-end justify-between h-36 px-2" >
        { currentStats?.chartData && currentStats.chartData.length > 0 ? (
            currentStats.chartData.map((item, idx) => (
                <View key= { idx } className = "flex-1 items-center gap-2" >
                <Text className="text-[11px] font-bold text-[#9CA3AF]" >
            { item.time }분
            </Text>
            < View className = "w-full px-1.5 justify-end items-center h-24" >
            <View
                                            style={{ height: `${item.height}%` }}
                className = {`w-full max-w-[32px] rounded-xl ${item.highlight ? 'bg-[#155DFC]' : 'bg-[#BFDBFE]'
                    }`}
                                        />
                </View>
                < Text className = "text-[12px] font-semibold text-[#6B7280]" >
                { item.label }
                </Text>
                </View>
            ))
                        ) : (
    <View className= "flex-1 h-full items-center justify-center" >
    <Text className="text-[12px] text-[#9CA3AF]" > 학습 데이터가 없습니다.</Text>
        </View>
                        )}
</View>
    </View>

{/* 영역별 정답률 */ }
<View className="mt-2" >
    <View className="flex-row justify-between items-center mb-4" >
        <Text className="text-[16px] font-extrabold text-[#111827]" > 영역별 정답률 </Text>
            < Pressable onPress = { handleWrongNotePress } >
                <Text className="text-[13px] font-bold text-[#155DFC]" > 퀴즈 기록 </Text>
                    </Pressable>
                    </View>

                    < View className = "gap-3" >
                    {
                        categories.length > 0 ? (
                            categories.map((cat, idx) => (
                                <View key= { idx } className = "flex-row items-center justify-between" >
                                <Text className="w-20 text-[13px] font-bold text-[#374151]" numberOfLines = { 1} >
                                { cat.name }
                                </Text>
                                < View className = "flex-1 mx-3 bg-[#F3F4F6] h-2.5 rounded-full overflow-hidden" >
                                <View
                                            style={{
                                width: `${cat.accuracy}%`,
                                backgroundColor: cat.color || (cat.accuracy < 70 ? '#FF8800' : '#155DFC'),
                            }}
className = "h-full rounded-full"
    />
    </View>
    < Text
className = {`w-10 text-right text-[12px] font-extrabold ${cat.accuracy < 70 ? 'text-[#FF8800]' : 'text-[#155DFC]'
    }`}
                                    >
    { cat.accuracy } %
    </Text>
    </View>
                            ))
                        ) : (
    <View className= "py-4 items-center" >
    <Text className="text-[12px] text-[#9CA3AF]" > 등록된 영역별 정답률 데이터가 없습니다.</Text>
        </View>
                        )}
</View>
    </View>

{/* 하단 리포트 안내 팁 */ }
<View className="mt-2 flex-row items-start p-3.5 bg-[#F9FAFB] rounded-2xl border border-[#F3F4F6] gap-2" >
    <View className="w-4 h-4 rounded-full border border-[#9CA3AF] items-center justify-center mt-0.5" >
        <Text className="text-[10px] font-bold text-[#9CA3AF]" > i </Text>
            </View>
            < Text className = "flex-1 text-[12px] text-[#6B7280] leading-5" >
            { recommendation || '학습 데이터가 수집되면 분석 추천 문구가 표시됩니다.'}
</Text>
    </View>
    </ScrollView>
    </View>
    );
}
