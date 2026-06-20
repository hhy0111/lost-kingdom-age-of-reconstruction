# 잃어버린 왕국 : 재건의 시대 - AI 사운드 제작 프롬프트 v1.0

## 문서 목적

이 문서는 모바일 세로형 방치형 RPG `잃어버린 왕국 : 재건의 시대`에 사용할 BGM, 환경음, UI, 전투, 보상, 성장, 상점, 리텐션 사운드를 한 번에 생성하기 위한 사운드 프롬프트 파일이다.

개발자는 아래 `Output` 경로와 파일명을 그대로 사용해 AI 사운드 생성 결과물을 저장하면 된다.

## 공통 제작 규칙

- 전체 스타일: 고전 판타지 RPG, 왕국 재건, 따뜻한 마을 성장, 장비 파밍, 자동 전투, 모바일 캐주얼 RPG.
- 음질: WAV, 48kHz, 24-bit 권장. 모바일 빌드용 최종 변환은 OGG Vorbis 또는 AAC.
- BGM: seamless loop, -16 LUFS 내외, 피크 -1dB 이하, 과도한 저역 제거.
- Ambience: seamless loop, -20 LUFS 내외, BGM과 섞였을 때 방해되지 않게 얇게 제작.
- SFX: one-shot, 빠른 어택, 짧은 잔향, 모바일 스피커에서 명확히 들리는 중고역 중심.
- UI SFX: 0.08초-0.45초 중심, 반복 클릭 시 피로하지 않게 부드럽게 제작.
- 전투 SFX: 타격감은 강하게, 하지만 방치형 자동 전투 특성상 너무 길거나 귀 아프지 않게 제작.
- 금지: vocals, lyrics, spoken words, copyrighted melody, recognizable existing game sound, watermark sound, harsh clipping, long silence, background hiss, distorted mastering, comedy/cartoon sound unless specified.
- 파일명 규칙: 소문자, snake_case, 숫자 2자리.

## 출력 폴더

```text
Assets/Audio/BGM
Assets/Audio/Ambience
Assets/Audio/SFX/UI
Assets/Audio/SFX/Combat
Assets/Audio/SFX/Reward
Assets/Audio/SFX/Village
Assets/Audio/SFX/Hero
Assets/Audio/SFX/Shop
Assets/Audio/SFX/System
```

## 생성 수량 요약

| 구분 | 수량 |
|---|---:|
| BGM | 20 |
| 환경음 | 12 |
| UI SFX | 22 |
| 전투 SFX | 32 |
| 보상/경제 SFX | 20 |
| 마을/건물 SFX | 14 |
| 영웅/장비 SFX | 16 |
| 광고/결제/리텐션 SFX | 12 |
| 시스템/알림 SFX | 8 |
| 합계 | 156 |

## BGM

| ID | Output | Length | Loop | Use | Prompt |
|---|---|---:|:---:|---|---|
| BGM_001 | Assets/Audio/BGM/bgm_title_rebuild_kingdom.wav | 75s | Yes | 타이틀/시작 화면 | orchestral fantasy mobile RPG title theme, hopeful ruined kingdom rebuilding mood, warm strings, soft brass, light choir pad without vocals, gentle percussion, memorable but original melody, seamless loop, polished mobile game mix |
| BGM_002 | Assets/Audio/BGM/bgm_opening_ruins_to_hope.wav | 60s | Yes | 오프닝 연출 | cinematic fantasy intro music, starts with lonely ruins and evolves into hopeful reconstruction, harp, low strings, distant horn, subtle timpani, emotional but not dark, no vocals, seamless loop |
| BGM_003 | Assets/Audio/BGM/bgm_village_ruins.wav | 70s | Yes | 폐허 단계 마을 | quiet fantasy village ruins loop, sparse lute, soft wind-like pads, small bell accents, feeling of abandoned stone paths and first restoration, gentle idle RPG background, seamless loop |
| BGM_004 | Assets/Audio/BGM/bgm_village_town.wav | 70s | Yes | 마을 단계 | cozy rebuilding village music, lute, mandolin, light hand drum, wooden flute, optimistic daily life, warm and calm, mobile idle RPG lobby loop |
| BGM_005 | Assets/Audio/BGM/bgm_village_city.wav | 80s | Yes | 도시 단계 | prosperous medieval fantasy city loop, strings, flute, light market rhythm, confident but relaxed, sense of growing population and production, seamless loop |
| BGM_006 | Assets/Audio/BGM/bgm_village_kingdom.wav | 90s | Yes | 왕국 단계 | noble kingdom hall background music, warm brass, strings, harp, slow heroic chord movement, restored castle atmosphere, not too epic, seamless loop |
| BGM_007 | Assets/Audio/BGM/bgm_village_empire.wav | 95s | Yes | 제국 단계 | grand imperial fantasy lobby music, elegant strings, proud horns, subtle choir pad without words, triumphant but calm for idle management screen, seamless loop |
| BGM_008 | Assets/Audio/BGM/bgm_combat_plains.wav | 70s | Yes | 초원 전투 | light fantasy battle loop for grassy plains, rhythmic drums, plucked strings, heroic flute motif, fast but not aggressive, seamless loop for auto combat |
| BGM_009 | Assets/Audio/BGM/bgm_combat_forest.wav | 70s | Yes | 숲 전투 | mysterious forest battle loop, low toms, wooden percussion, breathy flute, pizzicato strings, tense wildlife atmosphere, seamless loop |
| BGM_010 | Assets/Audio/BGM/bgm_combat_mine.wav | 70s | Yes | 폐광 전투 | abandoned mine battle music, metallic percussion, deep drones, low strings, echoing hammer rhythm, dark but readable mobile game mix, seamless loop |
| BGM_011 | Assets/Audio/BGM/bgm_combat_desert.wav | 70s | Yes | 사막 전투 | desert fantasy combat loop, frame drum, oud-like plucks, dry wind texture, minor heroic melody, energetic but clean, seamless loop |
| BGM_012 | Assets/Audio/BGM/bgm_combat_snowfield.wav | 70s | Yes | 설원 전투 | cold snowfield battle loop, icy bells, low strings, soft war drums, distant horn, chilly heroic fantasy tone, seamless loop |
| BGM_013 | Assets/Audio/BGM/bgm_combat_volcano.wav | 75s | Yes | 화산 전투 | volcanic fantasy battle loop, heavy drums, low brass, ember-like metallic hits, urgent rhythm, molten danger mood, seamless loop |
| BGM_014 | Assets/Audio/BGM/bgm_combat_abyss.wav | 75s | Yes | 심연 전투 | abyss dungeon combat loop, dark drones, reversed cymbal swells, deep percussion, eerie magical texture, no horror jumps, seamless loop |
| BGM_015 | Assets/Audio/BGM/bgm_combat_demon_castle.wav | 80s | Yes | 마왕성 전투 | demon castle battle loop, ominous organ, strings, war drums, dark brass, heroic pressure, no vocals, seamless loop |
| BGM_016 | Assets/Audio/BGM/bgm_boss_encounter.wav | 65s | Yes | 일반 보스 | fantasy boss battle loop, intense drums, brass stabs, string ostinato, clean impact, dramatic but short-loop friendly, no copyrighted melody |
| BGM_017 | Assets/Audio/BGM/bgm_final_boss_dark_lord.wav | 85s | Yes | 최종 보스 | final demon lord battle music, epic orchestral fantasy, choir pad without words, heavy drums, dark brass, heroic counter melody, seamless loop |
| BGM_018 | Assets/Audio/BGM/bgm_shop_merchant.wav | 60s | Yes | 상점 | fantasy merchant shop loop, light lute, coin-like percussion, warm playful melody, comfortable purchase screen atmosphere, seamless loop |
| BGM_019 | Assets/Audio/BGM/bgm_hero_hall.wav | 65s | Yes | 영웅/장비 화면 | heroic barracks and equipment hall loop, calm strings, soft drum cadence, subtle metal shimmer, preparation mood, seamless loop |
| BGM_020 | Assets/Audio/BGM/bgm_reward_ceremony.wav | 45s | Yes | 출석/패스/큰 보상 | short ceremonial reward loop, bright horns, harp glissando, warm strings, celebratory fantasy fanfare atmosphere, no vocals, seamless loop |

## 환경음

| ID | Output | Length | Loop | Use | Prompt |
|---|---|---:|:---:|---|---|
| AMB_001 | Assets/Audio/Ambience/amb_village_ruins_wind.wav | 45s | Yes | 폐허 마을 | subtle ruined village ambience, gentle wind through broken stone, distant cloth flutters, very light birds, no music, seamless loop |
| AMB_002 | Assets/Audio/Ambience/amb_village_busy_day.wav | 45s | Yes | 성장한 마을 | medieval fantasy village daytime ambience, distant hammering, soft crowd murmur without words, carts, birds, warm and unobtrusive, seamless loop |
| AMB_003 | Assets/Audio/Ambience/amb_castle_hall.wav | 45s | Yes | 왕궁/로비 | calm castle hall ambience, soft room tone, distant banners, faint armor movement, no speech, seamless loop |
| AMB_004 | Assets/Audio/Ambience/amb_plains_breeze.wav | 40s | Yes | 초원 | grassy plains ambience, soft breeze, distant insects, small birds, no music, seamless loop |
| AMB_005 | Assets/Audio/Ambience/amb_forest_deep.wav | 40s | Yes | 숲 | deep fantasy forest ambience, leaves, distant birds, low insects, occasional branch creak, no jump scares, seamless loop |
| AMB_006 | Assets/Audio/Ambience/amb_abandoned_mine.wav | 40s | Yes | 폐광 | abandoned mine ambience, distant water drip, low cave air, faint chain movement, dark but quiet, seamless loop |
| AMB_007 | Assets/Audio/Ambience/amb_desert_wind.wav | 40s | Yes | 사막 | desert wind ambience, dry sand gusts, distant cloth flap, very subtle, seamless loop |
| AMB_008 | Assets/Audio/Ambience/amb_snowfield.wav | 40s | Yes | 설원 | cold snowfield ambience, soft icy wind, distant snow particles, quiet winter air, seamless loop |
| AMB_009 | Assets/Audio/Ambience/amb_volcano_lava.wav | 40s | Yes | 화산 | volcano ambience, low lava rumble, small ember crackles, distant rock movement, not too loud, seamless loop |
| AMB_010 | Assets/Audio/Ambience/amb_abyss_magic.wav | 40s | Yes | 심연 | abyss magical ambience, low supernatural drone, faint crystal resonance, dark magical air, no horror scream, seamless loop |
| AMB_011 | Assets/Audio/Ambience/amb_demon_castle.wav | 40s | Yes | 마왕성 | demon castle ambience, distant flames, low stone hall rumble, ominous magical pulse, no voices, seamless loop |
| AMB_012 | Assets/Audio/Ambience/amb_shop_interior.wav | 35s | Yes | 상점 내부 | fantasy shop interior ambience, quiet coins, leather bags, soft fireplace, distant page turns, no speech, seamless loop |

## UI SFX

| ID | Output | Length | Loop | Use | Prompt |
|---|---|---:|:---:|---|---|
| UI_001 | Assets/Audio/SFX/UI/ui_boot_ready.wav | 0.8s | No | 앱 준비 완료 | short fantasy mobile game boot chime, warm bell and soft shimmer, premium but not loud, clean one-shot |
| UI_002 | Assets/Audio/SFX/UI/ui_tap_confirm_01.wav | 0.12s | No | 기본 버튼 탭 | soft wooden fantasy UI tap, tiny leather click and light bell tail, very short, non-fatiguing |
| UI_003 | Assets/Audio/SFX/UI/ui_tap_confirm_02.wav | 0.12s | No | 버튼 탭 변형 | crisp parchment button click, subtle coin-like tick, clean mobile UI one-shot |
| UI_004 | Assets/Audio/SFX/UI/ui_tab_switch.wav | 0.18s | No | 하단 탭 이동 | smooth fantasy tab switch sound, light page flip plus soft bell, quick and clear |
| UI_005 | Assets/Audio/SFX/UI/ui_panel_open.wav | 0.25s | No | 팝업 열림 | fantasy parchment panel open, soft whoosh, wooden frame slide, small chime |
| UI_006 | Assets/Audio/SFX/UI/ui_panel_close.wav | 0.20s | No | 팝업 닫힘 | soft parchment panel close, gentle whoosh downward, short wood tap |
| UI_007 | Assets/Audio/SFX/UI/ui_modal_confirm.wav | 0.32s | No | 확인/수령 | positive confirm chime, tiny harp sparkle, warm bell, mobile RPG reward UI |
| UI_008 | Assets/Audio/SFX/UI/ui_modal_cancel.wav | 0.22s | No | 취소/나중에 | soft cancel tick, muted wood and cloth, neutral non-negative mobile UI |
| UI_009 | Assets/Audio/SFX/UI/ui_button_disabled.wav | 0.18s | No | 비활성 버튼 | gentle denied UI sound, low dull wooden tick, no harsh buzz, very short |
| UI_010 | Assets/Audio/SFX/UI/ui_scroll_drag.wav | 0.20s | No | 터치 스크롤 시작 | subtle parchment scroll drag sound, soft fabric friction, quiet one-shot |
| UI_011 | Assets/Audio/SFX/UI/ui_scroll_stop.wav | 0.16s | No | 스크롤 멈춤 | tiny scroll stop tick, soft leather edge touch, unobtrusive |
| UI_012 | Assets/Audio/SFX/UI/ui_toast_notice.wav | 0.30s | No | 토스트 알림 | small notice chime, light bell and wood tick, readable but calm |
| UI_013 | Assets/Audio/SFX/UI/ui_error_soft.wav | 0.35s | No | 자원 부족/오류 | soft fantasy error tone, low bell dip, no harsh buzzer, short mobile UI warning |
| UI_014 | Assets/Audio/SFX/UI/ui_number_count.wav | 0.20s | No | 숫자 증가 | tiny counting sparkle, fast coin ticks blended with light magic, one-shot loopable feel |
| UI_015 | Assets/Audio/SFX/UI/ui_unlock.wav | 0.55s | No | 기능 해금 | fantasy unlock sound, small lock click, rising magic shimmer, warm final bell |
| UI_016 | Assets/Audio/SFX/UI/ui_transition_wipe.wav | 0.45s | No | 화면 전환 | short fantasy screen transition whoosh, parchment and wind, clean stereo movement |
| UI_017 | Assets/Audio/SFX/UI/ui_checkbox_on.wav | 0.12s | No | 토글 ON | tiny positive toggle click, small bell tick, clean and short |
| UI_018 | Assets/Audio/SFX/UI/ui_checkbox_off.wav | 0.12s | No | 토글 OFF | muted toggle click, soft wood, clean and short |
| UI_019 | Assets/Audio/SFX/UI/ui_slider_step.wav | 0.08s | No | 설정 슬라이더 | tiny tactile slider tick, soft stone bead, quiet UI sound |
| UI_020 | Assets/Audio/SFX/UI/ui_page_next.wav | 0.18s | No | 다음 페이지 | light parchment page turn forward, small sparkle, short |
| UI_021 | Assets/Audio/SFX/UI/ui_page_prev.wav | 0.18s | No | 이전 페이지 | light parchment page turn backward, lower tone, short |
| UI_022 | Assets/Audio/SFX/UI/ui_rare_popup.wav | 0.70s | No | 희귀 팝업 등장 | premium fantasy popup reveal, golden shimmer, harp flourish, soft impact, no vocals |

## 전투 SFX

| ID | Output | Length | Loop | Use | Prompt |
|---|---|---:|:---:|---|---|
| CBT_001 | Assets/Audio/SFX/Combat/combat_sword_light_01.wav | 0.22s | No | 기본 검 공격 | light sword slash, clean metal air cut, short fantasy RPG hit timing, no blood, mobile game mix |
| CBT_002 | Assets/Audio/SFX/Combat/combat_sword_light_02.wav | 0.22s | No | 기본 검 공격 변형 | fast sword swipe variation, crisp blade whoosh, subtle cloth movement, short one-shot |
| CBT_003 | Assets/Audio/SFX/Combat/combat_sword_heavy.wav | 0.38s | No | 강공격 | heavy sword swing, deeper whoosh, metal weight, short impact tail, fantasy RPG |
| CBT_004 | Assets/Audio/SFX/Combat/combat_hit_flesh_light.wav | 0.18s | No | 일반 몬스터 피격 | soft monster hit impact, blunt fantasy damage, short punchy body hit, no gore |
| CBT_005 | Assets/Audio/SFX/Combat/combat_hit_armor.wav | 0.24s | No | 갑옷/단단한 몬스터 피격 | metal armor hit, sword impact on plate, bright transient, short tail |
| CBT_006 | Assets/Audio/SFX/Combat/combat_hit_magic.wav | 0.30s | No | 마법 피격 | magical damage impact, blue-white energy crack, short shimmer tail, clean mobile RPG |
| CBT_007 | Assets/Audio/SFX/Combat/combat_critical_hit.wav | 0.45s | No | 치명타 | critical hit fantasy sound, sharp blade impact, golden flash shimmer, strong but not distorted |
| CBT_008 | Assets/Audio/SFX/Combat/combat_skill_cast.wav | 0.55s | No | 스킬 발동 | hero skill cast, rising magical energy, sword charge, bright release, no voice |
| CBT_009 | Assets/Audio/SFX/Combat/combat_skill_impact.wav | 0.60s | No | 스킬 적중 | explosive magical sword impact, layered metal and energy burst, short cinematic tail |
| CBT_010 | Assets/Audio/SFX/Combat/combat_fire_skill.wav | 0.70s | No | 화염 스킬 | fantasy fire skill impact, quick flame burst, ember crackle, warm low punch |
| CBT_011 | Assets/Audio/SFX/Combat/combat_ice_skill.wav | 0.65s | No | 얼음 스킬 | ice magic hit, crystal crack, frosty shimmer, sharp but not harsh |
| CBT_012 | Assets/Audio/SFX/Combat/combat_lightning_skill.wav | 0.55s | No | 번개 스킬 | lightning magic strike, electric crackle, fast impact, controlled high frequencies |
| CBT_013 | Assets/Audio/SFX/Combat/combat_dark_skill.wav | 0.70s | No | 암흑 스킬 | dark magic impact, low void pulse, shadowy reverse swell, no horror scream |
| CBT_014 | Assets/Audio/SFX/Combat/combat_heal_skill.wav | 0.80s | No | 회복 스킬 | healing magic sound, warm chimes, soft upward shimmer, gentle restoration tone |
| CBT_015 | Assets/Audio/SFX/Combat/combat_guard_block.wav | 0.24s | No | 방어/막기 | shield block sound, metal and wood impact, short and clean |
| CBT_016 | Assets/Audio/SFX/Combat/combat_dodge.wav | 0.18s | No | 회피 | quick cloth dodge whoosh, light footstep, short mobile RPG one-shot |
| CBT_017 | Assets/Audio/SFX/Combat/combat_enemy_attack_claw.wav | 0.28s | No | 발톱 공격 | monster claw swipe, dry sharp whoosh, short scratch impact, no gore |
| CBT_018 | Assets/Audio/SFX/Combat/combat_enemy_attack_bite.wav | 0.32s | No | 물기 공격 | beast bite attack, short snap and body impact, stylized fantasy, no gore |
| CBT_019 | Assets/Audio/SFX/Combat/combat_enemy_attack_slime.wav | 0.30s | No | 슬라임 공격 | slime attack sound, wet elastic slap, cute fantasy monster feel, not gross |
| CBT_020 | Assets/Audio/SFX/Combat/combat_enemy_attack_undead.wav | 0.35s | No | 언데드 공격 | undead attack impact, brittle bone rattle, low cloth swing, no voice |
| CBT_021 | Assets/Audio/SFX/Combat/combat_enemy_attack_golem.wav | 0.45s | No | 골렘 공격 | stone golem punch, rock scrape and heavy thud, short powerful impact |
| CBT_022 | Assets/Audio/SFX/Combat/combat_enemy_attack_demon.wav | 0.50s | No | 악마 공격 | demon claw magic attack, dark whoosh, low energy hit, no vocal roar |
| CBT_023 | Assets/Audio/SFX/Combat/combat_monster_death_small.wav | 0.45s | No | 소형 몬스터 처치 | small monster defeat, soft collapse, light smoke puff, satisfying but not violent |
| CBT_024 | Assets/Audio/SFX/Combat/combat_monster_death_large.wav | 0.70s | No | 대형 몬스터 처치 | large monster defeat, heavy fall, dust puff, low impact, short tail |
| CBT_025 | Assets/Audio/SFX/Combat/combat_boss_intro.wav | 1.20s | No | 보스 등장 | fantasy boss intro sting, ominous drum hit, brass swell, dark energy pulse, no vocals |
| CBT_026 | Assets/Audio/SFX/Combat/combat_boss_roar_beast.wav | 1.00s | No | 야수형 보스 | stylized beast boss roar, fantasy creature growl, powerful but not realistic horror, no clipping |
| CBT_027 | Assets/Audio/SFX/Combat/combat_boss_roar_demon.wav | 1.10s | No | 악마형 보스 | dark demon boss roar, layered low growl and magic resonance, no speech, controlled loudness |
| CBT_028 | Assets/Audio/SFX/Combat/combat_boss_skill_charge.wav | 1.00s | No | 보스 스킬 차징 | boss skill charge, rising dark magic, low rumble, warning tone, clear telegraph |
| CBT_029 | Assets/Audio/SFX/Combat/combat_boss_skill_impact.wav | 0.90s | No | 보스 스킬 적중 | heavy boss skill impact, dark explosion, stone shockwave, short cinematic tail |
| CBT_030 | Assets/Audio/SFX/Combat/combat_stage_clear.wav | 0.80s | No | 스테이지 클리어 | stage clear fantasy chime, quick fanfare, gold sparkle, satisfying idle RPG reward |
| CBT_031 | Assets/Audio/SFX/Combat/combat_boss_clear.wav | 1.40s | No | 보스 처치 | boss defeated fanfare, heroic brass hit, sparkle reward burst, short victory cue |
| CBT_032 | Assets/Audio/SFX/Combat/combat_party_defeat.wav | 1.20s | No | 패배/후퇴 | soft defeat cue, low strings, muted drum, not depressing, short mobile RPG retry cue |

## 보상/경제 SFX

| ID | Output | Length | Loop | Use | Prompt |
|---|---|---:|:---:|---|---|
| RWD_001 | Assets/Audio/SFX/Reward/reward_gold_small.wav | 0.35s | No | 골드 소량 획득 | small gold coin pickup, bright coin tick, tiny sparkle, short one-shot |
| RWD_002 | Assets/Audio/SFX/Reward/reward_gold_large.wav | 0.70s | No | 골드 대량 획득 | large gold reward burst, many coins, warm sparkle, satisfying but not noisy |
| RWD_003 | Assets/Audio/SFX/Reward/reward_diamond.wav | 0.60s | No | 다이아 획득 | premium diamond pickup, crystal chime, bright magical shimmer, clean mobile reward |
| RWD_004 | Assets/Audio/SFX/Reward/reward_food.wav | 0.32s | No | 식량 획득 | food resource pickup, soft basket rustle, tiny positive chime, fantasy village UI |
| RWD_005 | Assets/Audio/SFX/Reward/reward_wood.wav | 0.32s | No | 목재 획득 | wood resource pickup, small log knock, warm tick, short UI reward |
| RWD_006 | Assets/Audio/SFX/Reward/reward_ore.wav | 0.35s | No | 광석 획득 | ore resource pickup, small stone clink, metal sparkle, short fantasy UI |
| RWD_007 | Assets/Audio/SFX/Reward/reward_magic_stone.wav | 0.55s | No | 마력석 획득 | magic stone pickup, purple crystal shimmer, soft arcane pulse, premium fantasy resource |
| RWD_008 | Assets/Audio/SFX/Reward/reward_offline_claim.wav | 0.90s | No | 오프라인 보상 수령 | offline reward claim, chest-like coin burst, warm harp shimmer, satisfying idle RPG cue |
| RWD_009 | Assets/Audio/SFX/Reward/reward_double_ad.wav | 0.80s | No | 광고 2배 보상 | reward doubled sound, upward sparkle, two bright chime hits, premium but short |
| RWD_010 | Assets/Audio/SFX/Reward/reward_daily_claim.wav | 1.00s | No | 일일 보상 수령 | daily reward claim fanfare, gentle brass, coin sparkle, warm return bonus feeling |
| RWD_011 | Assets/Audio/SFX/Reward/reward_weekly_special.wav | 1.30s | No | 7일 특수 아이템 | weekly special reward reveal, golden harp flourish, noble bell, magical sparkle, no vocals |
| RWD_012 | Assets/Audio/SFX/Reward/reward_monthly_relic.wav | 1.60s | No | 30일 특수 아이템 | monthly relic reward reveal, grand magical chest opening, deep bell, bright crown shimmer |
| RWD_013 | Assets/Audio/SFX/Reward/chest_open_common.wav | 0.80s | No | 일반 상자 개봉 | common chest open, wooden lid, small coin sprinkle, light reward chime |
| RWD_014 | Assets/Audio/SFX/Reward/chest_open_rare.wav | 1.00s | No | 희귀 상자 개봉 | rare chest open, brighter magic burst, crystal sparkle, satisfying reveal |
| RWD_015 | Assets/Audio/SFX/Reward/chest_open_epic.wav | 1.25s | No | 영웅 상자 개봉 | epic chest open, deep whoosh, purple magic sparkle, strong reveal impact |
| RWD_016 | Assets/Audio/SFX/Reward/chest_open_legendary.wav | 1.60s | No | 전설 상자 개봉 | legendary chest open, golden explosion, harp glissando, heroic bell, premium reward cue |
| RWD_017 | Assets/Audio/SFX/Reward/loot_drop_common.wav | 0.35s | No | 일반 장비 드롭 | common loot drop, small item clink, subtle sparkle, quick |
| RWD_018 | Assets/Audio/SFX/Reward/loot_drop_rare.wav | 0.55s | No | 희귀 장비 드롭 | rare item drop, crystal clink, blue sparkle, short reward one-shot |
| RWD_019 | Assets/Audio/SFX/Reward/loot_drop_epic.wav | 0.75s | No | 영웅 장비 드롭 | epic item drop, purple magic shimmer, heavier item impact, satisfying |
| RWD_020 | Assets/Audio/SFX/Reward/loot_drop_legendary.wav | 1.00s | No | 전설 장비 드롭 | legendary item drop, golden sparkle burst, bell ring, premium fantasy reward sound |

## 마을/건물 SFX

| ID | Output | Length | Loop | Use | Prompt |
|---|---|---:|:---:|---|---|
| VIL_001 | Assets/Audio/SFX/Village/village_build_start.wav | 0.65s | No | 건설 시작 | construction start sound, wooden hammer taps, stone placement, warm village tone |
| VIL_002 | Assets/Audio/SFX/Village/village_build_complete.wav | 1.00s | No | 건설 완료 | building complete fanfare, hammer final hit, cheerful bell, small crowd-free sparkle |
| VIL_003 | Assets/Audio/SFX/Village/village_upgrade.wav | 0.90s | No | 건물 강화 | building upgrade sound, hammer strike, golden shimmer, rising success chime |
| VIL_004 | Assets/Audio/SFX/Village/village_tier_up.wav | 1.80s | No | 왕국 단계 상승 | kingdom tier up fanfare, noble brass, construction sparkle, big but mobile friendly |
| VIL_005 | Assets/Audio/SFX/Village/village_palace_upgrade.wav | 1.30s | No | 왕궁 강화 | palace upgrade, stone gate resonance, royal bell, warm heroic shimmer |
| VIL_006 | Assets/Audio/SFX/Village/village_barracks_upgrade.wav | 0.90s | No | 병영 강화 | barracks upgrade, armor clink, drum tap, confident training tone |
| VIL_007 | Assets/Audio/SFX/Village/village_farm_collect.wav | 0.35s | No | 농장 생산 | farm collect sound, basket rustle, grain pour, soft chime |
| VIL_008 | Assets/Audio/SFX/Village/village_lumber_collect.wav | 0.35s | No | 벌목장 생산 | lumber collect sound, wood knock, small log drop, short chime |
| VIL_009 | Assets/Audio/SFX/Village/village_mine_collect.wav | 0.40s | No | 광산 생산 | mine collect sound, stone and metal clink, short sparkle |
| VIL_010 | Assets/Audio/SFX/Village/village_magic_lab_collect.wav | 0.50s | No | 마법 연구소 생산 | magic lab collect, arcane crystal pulse, small bell shimmer |
| VIL_011 | Assets/Audio/SFX/Village/village_resident_join.wav | 0.75s | No | 주민 합류 | resident joins village, warm welcome chime, soft footstep and bell, no voices |
| VIL_012 | Assets/Audio/SFX/Village/village_research_start.wav | 0.55s | No | 연구 시작 | research start, page turn, quill scratch, magical spark, short |
| VIL_013 | Assets/Audio/SFX/Village/village_research_complete.wav | 0.90s | No | 연구 완료 | research complete, book close, bright magic chime, knowledge unlock feeling |
| VIL_014 | Assets/Audio/SFX/Village/village_expedition_return.wav | 1.00s | No | 탐험 복귀 | expedition return reward, boots on stone, pouch jingle, positive discovery chime |

## 영웅/장비 SFX

| ID | Output | Length | Loop | Use | Prompt |
|---|---|---:|:---:|---|---|
| HERO_001 | Assets/Audio/SFX/Hero/hero_summon_common.wav | 1.10s | No | 일반 영웅 소환 | hero summon common, magical circle whoosh, soft blue sparkle, short reveal |
| HERO_002 | Assets/Audio/SFX/Hero/hero_summon_rare.wav | 1.30s | No | 희귀 영웅 소환 | rare hero summon, brighter portal shimmer, heroic bell, clean reveal impact |
| HERO_003 | Assets/Audio/SFX/Hero/hero_summon_epic.wav | 1.60s | No | 영웅 등급 소환 | epic hero summon, purple magic portal, strong brass accent, premium fantasy reveal |
| HERO_004 | Assets/Audio/SFX/Hero/hero_summon_legendary.wav | 2.00s | No | 전설 영웅 소환 | legendary hero summon, golden magic portal, grand harp sweep, heroic bell, no voice |
| HERO_005 | Assets/Audio/SFX/Hero/hero_level_up.wav | 0.90s | No | 영웅 레벨업 | hero level up sound, rising chime, sword sparkle, confident success cue |
| HERO_006 | Assets/Audio/SFX/Hero/hero_train.wav | 0.65s | No | 영웅 훈련 | hero training sound, quick sword practice swipe, armor clink, positive tick |
| HERO_007 | Assets/Audio/SFX/Hero/hero_rank_up.wav | 1.40s | No | 영웅 승급 | hero rank up, noble brass flourish, magic sparkle, strong success impact |
| HERO_008 | Assets/Audio/SFX/Hero/hero_detail_open.wav | 0.35s | No | 영웅 상세 팝업 | hero detail panel open, soft armor shimmer, parchment slide, short |
| HERO_009 | Assets/Audio/SFX/Hero/equipment_equip.wav | 0.40s | No | 장비 장착 | equipment equip sound, metal clasp, small sparkle, satisfying gear snap |
| HERO_010 | Assets/Audio/SFX/Hero/equipment_unequip.wav | 0.30s | No | 장비 해제 | equipment unequip sound, soft metal release, leather movement, neutral |
| HERO_011 | Assets/Audio/SFX/Hero/equipment_auto_equip.wav | 0.80s | No | 장비 정리/자동 장착 | auto equip best, multiple quick gear clicks, golden confirmation chime |
| HERO_012 | Assets/Audio/SFX/Hero/equipment_enhance_success.wav | 0.95s | No | 장비 강화 성공 | equipment enhancement success, hammer on anvil, magic sparkle, rising bell |
| HERO_013 | Assets/Audio/SFX/Hero/equipment_enhance_fail.wav | 0.55s | No | 장비 강화 실패 | equipment enhancement fail, muted anvil tap, low soft tone, not harsh |
| HERO_014 | Assets/Audio/SFX/Hero/equipment_reforge.wav | 1.00s | No | 장비 재련 | equipment reforge, forge flame whoosh, hammer strike, magical metal ring |
| HERO_015 | Assets/Audio/SFX/Hero/artifact_activate.wav | 1.20s | No | 유물 활성화 | ancient artifact activation, deep crystal resonance, magical glyph shimmer, premium |
| HERO_016 | Assets/Audio/SFX/Hero/set_bonus_unlock.wav | 1.00s | No | 세트 효과 활성화 | equipment set bonus unlock, layered gear clicks, golden aura chime, heroic success |

## 광고/결제/리텐션 SFX

| ID | Output | Length | Loop | Use | Prompt |
|---|---|---:|:---:|---|---|
| SHOP_001 | Assets/Audio/SFX/Shop/ad_reward_ready.wav | 0.45s | No | 선택형 광고 보상 가능 | optional ad reward ready, small sparkle and bell, inviting but not pushy |
| SHOP_002 | Assets/Audio/SFX/Shop/ad_reward_claim.wav | 0.85s | No | 광고 보상 수령 | rewarded ad claim, bright reward chime, coin sparkle, short and satisfying |
| SHOP_003 | Assets/Audio/SFX/Shop/ad_skip_entitlement.wav | 1.00s | No | 광고 제거 혜택 적용 | remove ads entitlement unlock, clean premium chime, golden sparkle, calm success |
| SHOP_004 | Assets/Audio/SFX/Shop/purchase_open.wav | 0.35s | No | 상품 카드 열림 | shop product card open, soft pouch rustle, coin tick, premium UI |
| SHOP_005 | Assets/Audio/SFX/Shop/purchase_success.wav | 1.10s | No | 결제 성공 | purchase success sound, premium fantasy chime, gold and crystal sparkle, respectful mobile store cue |
| SHOP_006 | Assets/Audio/SFX/Shop/purchase_cancel.wav | 0.35s | No | 결제 취소 | purchase canceled, soft neutral tick, no negative buzz, short |
| SHOP_007 | Assets/Audio/SFX/Shop/purchase_restore.wav | 0.80s | No | 구매 복원 | purchase restored, clean bell, gentle upward shimmer, trustworthy UI cue |
| SHOP_008 | Assets/Audio/SFX/Shop/pass_reward_unlock.wav | 1.00s | No | 왕국 패스 보상 해금 | kingdom pass reward unlock, stamp-like hit, gold sparkle, celebratory short cue |
| SHOP_009 | Assets/Audio/SFX/Shop/monthly_reward_claim.wav | 0.90s | No | 월정액 일일 보상 | monthly membership reward claim, crystal chime, warm coin sparkle, premium but calm |
| SHOP_010 | Assets/Audio/SFX/Shop/growth_pack_claim.wav | 1.00s | No | 성장 패키지 지급 | growth pack claim, chest pop, resource sparkle cascade, energetic reward cue |
| SHOP_011 | Assets/Audio/SFX/Shop/free_summon_ready.wav | 0.70s | No | 무료 소환 가능 | free summon ready, magical portal twinkle, light bell, inviting fantasy UI |
| SHOP_012 | Assets/Audio/SFX/Shop/legendary_rate_up.wav | 1.20s | No | 전설 확률 증가 | legendary rate up activation, golden magic surge, crystal bell, premium event cue |

## 시스템/알림 SFX

| ID | Output | Length | Loop | Use | Prompt |
|---|---|---:|:---:|---|---|
| SYS_001 | Assets/Audio/SFX/System/notification_daily.wav | 0.70s | No | 일일 알림 | daily notification chime, warm bell, short fantasy sparkle, not intrusive |
| SYS_002 | Assets/Audio/SFX/System/notification_offline_reward.wav | 0.85s | No | 오프라인 보상 알림 | offline reward notification, coin pouch and bell, satisfying return cue |
| SYS_003 | Assets/Audio/SFX/System/notification_build_complete.wav | 0.75s | No | 건설 완료 알림 | build complete notification, hammer tap and cheerful bell, short |
| SYS_004 | Assets/Audio/SFX/System/notification_expedition_done.wav | 0.80s | No | 탐험 완료 알림 | expedition done notification, small horn, pouch jingle, discovery chime |
| SYS_005 | Assets/Audio/SFX/System/save_complete.wav | 0.35s | No | 저장 완료 | save complete, soft magic seal stamp, tiny bell, clean |
| SYS_006 | Assets/Audio/SFX/System/network_soft_warning.wav | 0.45s | No | 네트워크/스토어 경고 | soft network warning, muted bell dip, no harsh alarm, short |
| SYS_007 | Assets/Audio/SFX/System/settings_open.wav | 0.25s | No | 설정 열림 | settings open, small gear click, parchment slide, quiet |
| SYS_008 | Assets/Audio/SFX/System/settings_apply.wav | 0.35s | No | 설정 적용 | settings apply, clean tick and small sparkle, positive confirmation |

## 믹싱 우선순위

1. UI 탭/결정음은 항상 명확해야 한다.
2. 전투 자동 반복음은 BGM보다 작게 유지한다.
3. 보상/상자/전설 획득음은 짧지만 가장 만족스럽게 만든다.
4. 마을 BGM은 장시간 방치 플레이에도 피곤하지 않게 제작한다.
5. 보스/최종 보스 음악은 일반 전투보다 강하지만 모바일 스피커에서 뭉개지지 않게 저역을 절제한다.

## Unity 적용 권장 AudioMixer 그룹

| Group | 대상 |
|---|---|
| Master | 전체 |
| BGM | 모든 BGM |
| Ambience | 환경음 |
| UI | UI, 설정, 토스트 |
| Combat | 공격, 피격, 스킬, 보스 |
| Reward | 재화, 상자, 출석, 패스 보상 |
| Village | 건설, 생산, 연구 |
| Shop | 광고, 결제, 상품 |

## 최소 출시 적용 세트

출시 직전 빌드에서 우선 적용해야 할 최소 사운드는 아래 35개다.

```text
bgm_title_rebuild_kingdom.wav
bgm_village_ruins.wav
bgm_village_town.wav
bgm_village_kingdom.wav
bgm_combat_plains.wav
bgm_combat_forest.wav
bgm_combat_mine.wav
bgm_combat_demon_castle.wav
bgm_boss_encounter.wav
bgm_shop_merchant.wav
ui_tap_confirm_01.wav
ui_tab_switch.wav
ui_panel_open.wav
ui_panel_close.wav
ui_modal_confirm.wav
ui_error_soft.wav
combat_sword_light_01.wav
combat_hit_flesh_light.wav
combat_hit_armor.wav
combat_critical_hit.wav
combat_skill_cast.wav
combat_skill_impact.wav
combat_monster_death_small.wav
combat_boss_intro.wav
combat_stage_clear.wav
combat_boss_clear.wav
reward_gold_small.wav
reward_gold_large.wav
reward_diamond.wav
reward_daily_claim.wav
chest_open_rare.wav
loot_drop_epic.wav
village_upgrade.wav
hero_level_up.wav
purchase_success.wav
```
