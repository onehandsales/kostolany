import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { StatsChart } from './StatsChart';
import { StatsChoice, StatsChoiceModal, StatsMonthChoices } from './StatsChoiceModal';
import { formatStatsDate, statsDateRange } from './statsDates';
import { useStoryStats } from './useStoryStats';
import type { StatsDay, StatsSort, StoryStatsRow, StoryStatsSource } from './types';

type StoryStatsScreenProps = {
  source: StoryStatsSource;
  userId: string;
  sessionRevision: number;
  active: boolean;
  onBack: () => void;
  onOpenStory: (storyId: string) => void;
};
const sortLabels: Record<StatsSort, string> = { latest: 'Latest', views: 'Views', reads: 'Reads' };
type StatsMenu = 'month' | 'sort' | 'more' | 'dates';

export function StoryStatsScreen({ source, userId, sessionRevision, active, onBack, onOpenStory }: StoryStatsScreenProps) {
  const styles = useThemeStyles(createStyles);
  const [month, setMonth] = useState(source.getCurrentMonth);
  const [sort, setSort] = useState<StatsSort>('latest');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [menu, setMenu] = useState<StatsMenu | null>(null);
  const monthButton = useRef<View>(null);
  const sortButton = useRef<View>(null);
  const moreButton = useRef<View>(null);
  const graphButton = useRef<View>(null);
  const returnFocus = useRef<StatsMenu>('month');
  const wasOpen = useRef(false);
  const { monthly, lifetime } = useStoryStats(source, userId, sessionRevision, month, sort, active);
  const selectedDay = monthly.data?.days.find(day => day.date === selectedDate);
  useEffect(() => {
    if (menu) { wasOpen.current = true; return; }
    if (!wasOpen.current || !active) return;
    wasOpen.current = false;
    const frame = requestAnimationFrame(() => {
      const target = returnFocus.current === 'month' ? monthButton : returnFocus.current === 'sort' ? sortButton : returnFocus.current === 'dates' ? graphButton : moreButton;
      target.current?.focus(); restoreModalFocus();
    });
    return () => cancelAnimationFrame(frame);
  }, [menu, active]);
  if (!active && menu) setMenu(null);
  const openMenu = (next: StatsMenu) => { returnFocus.current = next; setMenu(next); };
  const header = <>
    <View style={styles.monthly}>
      <Text role="heading" style={styles.sectionTitle}>{selectedDay ? formatStatsDate(selectedDay.date) : 'Monthly'}</Text>
      <Text style={styles.caption}>{monthly.data ? `${statsDateRange(monthly.data.period.start, monthly.data.period.endExclusive)} · Updated daily` : `${formatStatsDate(month, true)} (UTC)`}</Text>
      <Pressable ref={monthButton} role="button" accessibilityLabel={`통계 월 선택, ${formatStatsDate(month, true)}`}
        accessibilityState={{ expanded: menu === 'month' }} onPress={() => openMenu('month')} style={styles.select}>
        <View pointerEvents="none" style={styles.selectSurface} />
        <Text style={styles.selectText}>{formatStatsDate(month, true)}</Text><View style={styles.down}><AppIcon name="chevron" size={16} /></View>
      </Pressable>
      {monthly.status === 'loading' ? <StatsLoading label="월간 통계 불러오는 중" /> : monthly.status === 'error'
        ? <StatsError label="월간 통계" onRetry={monthly.retry} /> : monthly.data && <>
          <StatsNumbers counts={selectedDay ?? (monthly.data.days.every(day => day.views === null)
            ? { views: null, reads: null } : monthly.data)} total />
          {!selectedDay && monthly.data.days.some(day => day.views === null) &&
            <Text style={styles.caption}>일부 날짜는 아직 집계되지 않았어요. 합계는 집계된 날짜 기준이에요.</Text>}
          {selectedDay?.views === null && <Text style={styles.caption}>이 날짜는 아직 집계되지 않았어요.</Text>}
          <View style={styles.chart}>
            <StatsChart buttonRef={graphButton} days={monthly.data.days} selectedDate={selectedDay?.date ?? null} onSelectDate={setSelectedDate} onOpenDates={() => openMenu('dates')} />
          </View>
        </>}
    </View>
    <View style={styles.lifetime}>
      <Text role="heading" style={styles.sectionTitle}>Lifetime</Text>
      <Text style={styles.caption}>{lifetime.data?.firstPublishedAt
        ? `${formatStatsDate(lifetime.data.firstPublishedAt)} – Today · Updated daily`
        : 'Published stories · Updated daily'}</Text>
      <Pressable ref={sortButton} role="button" accessibilityLabel={`통계 정렬 선택, ${sortLabels[sort]}`}
        accessibilityState={{ expanded: menu === 'sort' }} onPress={() => openMenu('sort')} style={styles.select}>
        <View pointerEvents="none" style={styles.selectSurface} />
        <Text style={styles.selectText}>{sortLabels[sort]}</Text><View style={styles.down}><AppIcon name="chevron" size={16} /></View>
      </Pressable>
      {lifetime.status === 'loading' && <StatsLoading label="누적 통계 불러오는 중" />}
      {lifetime.status === 'error' && <StatsError label="누적 통계" onRetry={lifetime.retry} />}
      {lifetime.status === 'ready' && !lifetime.data?.stories.length && <Text style={styles.empty}>아직 발행한 글이 없어요.</Text>}
    </View>
  </>;
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
    <View style={styles.header}>
      <IconButton icon="back" label="통계에서 프로필로 돌아가기" onPress={onBack} />
      <Text role="heading" style={styles.title}>Your story stats</Text>
      <Pressable ref={moreButton} role="button" accessibilityLabel="통계 더보기" onPress={() => openMenu('more')} style={styles.more}><AppIcon name="more" size={22} /></Pressable>
    </View>
    <FlatList data={lifetime.data?.stories ?? []} keyExtractor={row => row.storyId} ListHeaderComponent={header}
      contentContainerStyle={styles.content} renderItem={({ item }) => <StatsStoryRow story={item} asOf={lifetime.data?.asOf ?? ''} onPress={() => onOpenStory(item.storyId)} />} />
    {active && menu && <StatsChoiceModal title={menu === 'month' ? '통계 월 선택' : menu === 'sort' ? '통계 정렬' : menu === 'dates' ? '날짜별 수치' : '통계 더보기'} onClose={() => setMenu(null)}>
      {menu === 'month' && <StatsMonthChoices month={month} latestMonth={source.getCurrentMonth()} onSelect={value => {
        if (value !== month) { setMonth(value); setSelectedDate(null); }
        setMenu(null);
      }} />}
      {menu === 'sort' && (['latest', 'views', 'reads'] as const).map(value => <StatsChoice key={value} label={sortLabels[value]} selected={sort === value} onPress={() => { setSort(value); setMenu(null); }} />)}
      {menu === 'dates' && <>
        <StatsChoice label="Monthly · 월 전체" selected={!selectedDay} onPress={() => { setSelectedDate(null); setMenu(null); }} />
        {monthly.data?.days.map(day => <StatsChoice key={day.date} label={`${formatStatsDate(day.date)} · Views ${day.views ?? '—'} · Reads ${day.reads ?? '—'}`}
          selected={selectedDay?.date === day.date} onPress={() => { setSelectedDate(day.date); setMenu(null); }} />)}
      </>}
      {menu === 'more' && <>
        <Pressable role="button" accessibilityLabel="통계 새로고침" style={styles.menuRow} onPress={() => { monthly.retry(); lifetime.retry(); setMenu(null); }}><Text style={styles.selectText}>Refresh</Text></Pressable>
        <Pressable role="button" accessibilityLabel="날짜별 수치 보기" disabled={!monthly.data} accessibilityState={{ disabled: !monthly.data }} style={styles.menuRow} onPress={() => setMenu('dates')}><Text style={styles.selectText}>날짜별 수치</Text></Pressable>
      </>}
    </StatsChoiceModal>}
  </SafeAreaView>;
}

function StatsNumbers({ counts, total = false }: { counts: Pick<StatsDay, 'views' | 'reads'>; total?: boolean }) {
  const styles = useThemeStyles(createStyles);
  return <View style={[styles.numbers, !total && styles.rowNumbers]}>
    <View style={[styles.metric, !total && styles.rowMetric]}><Text accessibilityLabel={`${total ? '선택 기간 ' : ''}Views ${counts.views ?? '미집계'}`} style={total ? styles.number : styles.rowNumber}>{counts.views?.toLocaleString('en-US') ?? '—'}</Text><Text style={total ? styles.metricLabel : styles.rowCaption}>{total ? 'Total views' : 'Views'}</Text></View>
    <View style={[styles.metric, !total && styles.rowMetric]}><Text accessibilityLabel={`${total ? '선택 기간 ' : ''}Reads ${counts.reads ?? '미집계'}`} style={total ? styles.number : styles.rowNumber}>{counts.reads?.toLocaleString('en-US') ?? '—'}</Text><Text style={total ? styles.metricLabel : styles.rowCaption}>{total ? 'Total reads' : 'Reads'}</Text></View>
  </View>;
}

function StatsStoryRow({ story, asOf, onPress }: { story: StoryStatsRow; asOf: string; onPress: () => void }) {
  const styles = useThemeStyles(createStyles);
  const elapsedHours = Math.floor((Date.parse(asOf) - Date.parse(story.publishedAt)) / 3_600_000);
  const date = elapsedHours < 1 ? 'Just published' : elapsedHours < 24 ? `${elapsedHours} ${elapsedHours === 1 ? 'hour' : 'hours'} ago` : formatStatsDate(story.publishedAt);
  return <View style={styles.story}>
    <Text style={styles.caption}>{date}{story.unlisted ? ' · Unlisted' : ''}</Text>
    <Pressable role="button" accessibilityLabel={`${story.title} 통계에서 글 열기`} onPress={onPress} style={styles.storyLink}><Text style={styles.storyTitle}>{story.title}</Text></Pressable>
    <StatsNumbers counts={story} />
  </View>;
}

function StatsLoading({ label }: { label: string }) {
  const styles = useThemeStyles(createStyles);
  return <View style={styles.status}><ActivityIndicator accessibilityLabel={label} /><Text style={styles.caption}>{label}…</Text></View>;
}

function StatsError({ label, onRetry }: { label: string; onRetry: () => void }) {
  const styles = useThemeStyles(createStyles);
  return <View style={styles.status}><Text role="alert" style={styles.caption}>{label}를 불러오지 못했어요.</Text>
    <Pressable role="button" accessibilityLabel={`${label} 다시 시도`} onPress={onRetry} style={styles.menuRow}><Text style={styles.selectText}>Try again</Text></Pressable>
  </View>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { minHeight: 54, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  title: { flex: 1, textAlign: 'center', fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, fontWeight: '600', color: colors.text },
  more: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  content: { paddingBottom: 40 },
  monthly: { padding: 24, paddingTop: 36, paddingBottom: 38, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  sectionTitle: { fontFamily: fonts.sans, fontSize: 24, lineHeight: 30, fontWeight: '700', letterSpacing: -0.6, color: colors.text },
  caption: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText },
  select: { minHeight: 48, marginTop: 24, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 16 },
  selectSurface: { position: 'absolute', left: 0, right: 0, top: 3, bottom: 3, borderWidth: 1, borderColor: colors.border, borderRadius: 24 },
  selectText: { position: 'relative', flex: 1, fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.text },
  down: { transform: [{ rotate: '90deg' }] },
  numbers: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 28, rowGap: 12, marginTop: 20 },
  metric: { minWidth: 76, maxWidth: '100%', gap: 2 },
  rowNumbers: { marginTop: 4 },
  rowMetric: { minWidth: 68, gap: 7 },
  rowCaption: { fontFamily: fonts.sans, fontSize: 11, lineHeight: 18, color: colors.secondaryText },
  number: { fontFamily: fonts.sans, fontSize: 20, lineHeight: 26, fontWeight: '700', color: colors.text },
  rowNumber: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.text },
  metricLabel: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, color: colors.text },
  chart: { marginTop: 13 },
  lifetime: { paddingHorizontal: 24, paddingTop: 32 },
  story: { padding: 24, paddingTop: 20, paddingBottom: 30, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  storyLink: { minHeight: 48, justifyContent: 'center' },
  storyTitle: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, fontWeight: '700', color: colors.text },
  status: { paddingVertical: 24, gap: 12 },
  menuRow: { minHeight: 48, padding: 16, justifyContent: 'center' },
  empty: { paddingVertical: 32, fontSize: 15, lineHeight: 24, color: colors.secondaryText },
});
